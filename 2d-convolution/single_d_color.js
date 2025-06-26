const sizex = 512;
const sizey = 512;
pad=0;

let core = [];
for (let i = 0; i < 5; i++) {
	core[i] = (Math.random() - 0.5) * 2; // [-1,1] floats
	core[8 - i] = core[i];
}

core=[-0.06670371141006037,0.49633672968257536,-0.8552127233935909,0.6207638704034322,0.9127033140331935,0.6207638704034322,-0.8552127233935909,0.49633672968257536,-0.06670371141006037];
const range=2;

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

function droveLines(ax, ay) {
	const iterations = 9;
	const gridSize = Math.pow(2, iterations);

	pad=((ax/gridSize)*2-1)*range;
	const slice=Math.floor(256*ay/gridSize);

	document.getElementById('console-log0').innerHTML = `${JSON.stringify(core)}, ${pad}`;

	let array = [[1]];

	let canvas = document.getElementById('myCanvas');
	let ctx = canvas.getContext('2d');
	canvas.width = gridSize;
	canvas.height = gridSize;

	for (let i = 0; i < iterations; i++) {
		array = padding(array, pad);         // use 0.5 for smooth expansion
		array = convolution(array, core);
	}

	const norm = normalizeContrast(array);

	// draw
	for (let x = 0; x < gridSize; x++) {
		for (let y = 0; y < gridSize; y++) {
			
			let raw = norm[x][y];
			const [r, g, b] = hsvToRgb(raw, 1, 1); // hue=v, full sat+val
			ctx.fillStyle = `rgb(${r},${g},${b})`;
			

			
			ctx.fillRect(x, y, 1, 1);
		}
	}
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
function weirdMap(v) {
	let r = Math.floor(255 * Math.sin(10 * v));
	let g = Math.floor(255 * Math.cos(15 * v));
	let b = Math.floor(255 * Math.sin(30 * v));
	return [Math.abs(r), Math.abs(g), Math.abs(b)];
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



function getMousePos(canvas, evt){
	var obj=canvas;
	var top=0;
	var left=0;
	while (obj && obj.tagName != 'BODY') {
		top+=obj.offsetTop;
		left+=obj.offsetLeft;
		obj=obj.offsetParent;
	}
 
	var mouseX=evt.clientX-left+window.pageXOffset;
	var mouseY=evt.clientY-top+window.pageYOffset;
	return {
		x: mouseX,
		y: mouseY
	};
}

window.onload=function(){
var canvas=document.getElementById('myCanvas');
var context=canvas.getContext('2d');
canvas.width=sizex;
canvas.height=sizey;
canvas.addEventListener('mousemove', function(evt){
		var mousePos=getMousePos(canvas, evt);
		droveLines(mousePos.x, mousePos.y);
	}, false);
};

function refreshFractal() {
	// Generate new core
	for (let i = 0; i < 5; i++) {
		core[i] = (Math.random() - 0.5) * 2;
		core[8 - i] = core[i];
	}

	// Redraw with default position (center of canvas)
	droveLines(sizex / 2, sizey / 2);
}