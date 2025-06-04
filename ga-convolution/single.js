let index = 0;
let population = [];
let canvas, ctx;
const sizex = 1024;
const sizey = 1024;

function supportsLocalStorage() {
    return ('localStorage' in window) && window['localStorage'] !== null;
}

function loadPopulation() {
    if (!supportsLocalStorage()) return false;
    const stored = localStorage.getItem("cell.population");
    if (!stored) return false;
    population = JSON.parse(stored);
    return true;
}

function activation(t) {
    if (t < -16) return -16;
    if (t > 16) return 16;
    return Math.round(t);
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

function draw() {
    if (!population.length || !ctx) return;
    const core = population[index];
    let array = [[1]];
    const iterations = Math.min(16, Math.max(1, parseInt(document.getElementById('iterations').value)));
    const zoom = Math.min(16, Math.max(1, parseInt(document.getElementById('zoom').value)));
    const gridSize = Math.pow(2, iterations);

    canvas.width = gridSize * zoom;
    canvas.height = gridSize * zoom;

    for (let i = 0; i < iterations; i++) {
        array = padding(array, 1);
        array = convolution(array, core);
    }

    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let x = 0; x < gridSize; x++) {
        for (let y = 0; y < gridSize; y++) {
            const v = array[x][y] < 0 ? 0 : 255;
            ctx.fillStyle = `rgb(${v},${v},${v})`;
            ctx.fillRect(x * zoom, y * zoom, zoom, zoom);
        }
    }
    document.getElementById('indexInput').value = index;
}

function prev() {
    index = (index - 1 + population.length) % population.length;
    draw();
}
function next() {
    index = (index + 1) % population.length;
    draw();
}
function goToIndex() {
    const input = parseInt(document.getElementById('indexInput').value);
    if (!isNaN(input) && input >= 0 && input < population.length) {
        index = input;
        draw();
    }
}

window.onload = function () {
    canvas = document.getElementById('mainCanvas');
    ctx = canvas.getContext('2d');
    if (loadPopulation()) draw();
    else alert("No population found in localStorage.");
};
