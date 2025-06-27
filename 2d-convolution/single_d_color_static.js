const sizex = 512;
const sizey = 512;
const pad=0;
let iterations = 9;
let gridSize = Math.pow(2, iterations);

let core = [];
const range=1;

function activation(t) {
	return t; // no clamping, no rounding
}

function convolution(array, core) {
	const l2 = array.length;
	const temp = [];
	for (let x = 0; x < l2; x++) {
		const xm = (x - 1 + l2) % l2;
		const xp = (x + 1) % l2;
		temp[x] = [];
		for (let y = 0; y < l2; y++) {
			const ym = (y - 1 + l2) % l2;
			const yp = (y + 1) % l2;
			temp[x][y] = activation(
				array[xm][ym]*core[0] + array[x][ym]*core[1] + array[xp][ym]*core[2] +
				array[xm][y]*core[3] + array[x][y]*core[4] + array[xp][y]*core[5] +
				array[xm][yp]*core[6] + array[x][yp]*core[7] + array[xp][yp]*core[8]
			);
		}
	}
	return temp;
}

function padding(array, k) {
	if (array.length == 1) return [[1, 0], [0, 0]];
	const l2 = array.length;
	const temp = [];
	for (let x = 0; x < l2; x++) {
		temp[x*2] = [];
		temp[x*2+1] = [];
		for (let y = 0; y < l2; y++) {
			const v = k * array[x][y];
			temp[x*2][y*2] = array[x][y];
			temp[x*2][y*2+1] = v;
			temp[x*2+1][y*2] = v;
			temp[x*2+1][y*2+1] = v;
		}
	}
	return temp;
}

function hsvToRgb(h, s, v) {
	let r, g, b;
	let i = Math.floor(h * 6);
	let f = h * 6 - i;
	let p = v * (1 - s);
	let q = v * (1 - f * s);
	let t = v * (1 - (1 - f) * s);

	switch (i % 6) {
		case 0: r = v, g = t, b = p; break;
		case 1: r = q, g = v, b = p; break;
		case 2: r = p, g = v, b = t; break;
		case 3: r = p, g = q, b = v; break;
		case 4: r = t, g = p, b = v; break;
		case 5: r = v, g = p, b = q; break;
	}
	return [
		Math.floor(r * 255),
		Math.floor(g * 255),
		Math.floor(b * 255)
	];
}

function getPercentileCutoffs(flat, lowPct = 0.01, highPct = 0.99) {
	flat.sort((a, b) => a - b);
	const low = flat[Math.floor(flat.length * lowPct)];
	const high = flat[Math.floor(flat.length * highPct)];
	return [low, high];
}
function normalizeContrast(array) {
	const flat = array.flat();
	const [low, high] = getPercentileCutoffs(flat, 0.01, 0.99);
	const range = high - low || 1;

	const result = [];
	for (let x = 0; x < array.length; x++) {
		result[x] = [];
		for (let y = 0; y < array[0].length; y++) {
			let v = (array[x][y] - low) / range;
			v = Math.max(0, Math.min(1, v)); // clamp
			result[x][y] = v;
		}
	}
	return result;
}

let norm = []; // Global

function refreshFractal() {
	const input = document.getElementById("iterations");
	const iterations = Math.max(6, Math.min(10, parseInt(input.value || "9")));

	// new core
	for (let i = 0; i < 5; i++) {
		core[i] = (Math.random() - 0.5) * 2;
		core[8 - i] = core[i];
	}

	let array = [[1]];
	for (let i = 0; i < iterations; i++) {
		array = padding(array, pad);
		array = convolution(array, core);
	}

	norm = normalizeContrast(array); // save normalized data
	drawFractal(); // draw initial frame
}

function drawFractal() {
	const hueShift = parseFloat(document.getElementById("hueShift").value || "0");
	document.getElementById('console-log0').innerHTML = `convolution core=${JSON.stringify(core)}`;
	const canvas = document.getElementById("myCanvas");
	const ctx = canvas.getContext("2d");
	const gridSize = norm.length;

	canvas.width = gridSize;
	canvas.height = gridSize;

	for (let x = 0; x < gridSize; x++) {
		for (let y = 0; y < gridSize; y++) {
			const raw = (norm[x][y] + hueShift) % 1;
			const [r, g, b] = hsvToRgb(raw, 1, 1);
			ctx.fillStyle = `rgb(${r},${g},${b})`;
			ctx.fillRect(x, y, 1, 1);
		}
	}
}