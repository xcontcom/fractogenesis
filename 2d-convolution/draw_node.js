const fs = require('fs').promises;
const path = require('path');
const { PNG } = require('pngjs');

// Configuration constants
const targetCount = 32; // Set to 1 to recreate a single pattern (from q1), or higher to generate new ones (random)
const paddingIterations = 9; // Number of padding iterations (9 = 512x512, 10 = 1024x1024)
const q1 = parseInt("001010100001010111", 2); // Rule string from filename, converted to integer
const r1 = numberTo18BitArray(q1); // Convert to 18-bit rule array

// Function to convert a number to an 18-bit array
function numberTo18BitArray(number) {
    if (number < 0 || number >= 2 ** 18) {
        throw new Error("Number must be between 0 and 262143 (2^18 - 1).");
    }
    const bitArray = new Array(18);
    for (let i = 0; i < 18; i++) {
        bitArray[i] = (number >> (17 - i)) & 1;
    }
    return bitArray;
}

// Ensure the /cells/ directory exists
const cellsFolder = './cells/';
async function ensureCellsFolder() {
    try {
        await fs.mkdir(cellsFolder, { recursive: true });
    } catch (err) {
        console.error(`Error creating directory ${cellsFolder}:`, err);
        throw err;
    }
}

// Function to pad the array
function padding(array, kk) {
    if (array.length === 1) return [[1, 0], [0, 0]];
    const temp = [];
    const l2 = array.length;
    for (let x = 0; x < l2; x++) {
        temp[x * 2 + 0] = [];
        temp[x * 2 + 1] = [];
        for (let y = 0; y < l2; y++) {
            temp[x * 2 + 0][y * 2 + 0] = array[x][y];
            temp[x * 2 + 0][y * 2 + 1] = kk * array[x][y];
            temp[x * 2 + 1][y * 2 + 0] = kk * array[x][y];
            temp[x * 2 + 1][y * 2 + 1] = kk * array[x][y];
        }
    }
    return temp;
}

// Function to apply cellular automata rules
function cellular(array, rule) {
    const l2 = array.length;
    const temp = new Array(l2);

    for (let x = 0; x < l2; x++) {
        temp[x] = new Int8Array(l2);
        const xm = (x - 1 + l2) % l2;
        const xp = (x + 1) % l2;

        for (let y = 0; y < l2; y++) {
            const ym = (y - 1 + l2) % l2;
            const yp = (y + 1) % l2;

            const q =
                (array[xm][ym] << 8) |
                (array[x][ym] << 7) |
                (array[xp][ym] << 6) |
                (array[xm][y] << 5) |
                (array[x][y] << 4) |
                (array[xp][y] << 3) |
                (array[xm][yp] << 2) |
                (array[x][yp] << 1) |
                array[xp][yp];

            temp[x][y] = rule[q];
        }
    }

    return temp;
}

// Function to generate a rule set
function getRule(rBase) {
    const r = rBase || [];
    if (r.length === 0) {
        for (let i = 0; i < 18; i++) {
            r[i] = Math.round(Math.random());
        }
    }

    const r2 = [];
    for (let i = 0; i < 512; i++) {
        let q = ((i >> 4) & 1) * 8;
        for (let j = 0; j < 9; j++) {
            q += (i >> j) & 1;
        }
        r2[i] = r[q];
    }
    return { r, r2 };
}

// Function to compute a simple hash of the array
function arrayHash(array) {
    let hash = 0;
    for (let x = 0; x < array.length; x++) {
        for (let y = 0; y < array.length; y++) {
            hash = (hash * 31 + array[x][y]) & 0xFFFFFFFF;
        }
    }
    return hash;
}

// Function to load hashes from a JSON file
async function loadHashes() {
    const hashFile = './hashes.json';
    try {
        const data = await fs.readFile(hashFile, 'utf8');
        return new Set(JSON.parse(data));
    } catch (err) {
        if (err.code === 'ENOENT') {
            // File doesn't exist, start with an empty set
            return new Set();
        }
        console.error(`Error loading hashes from ${hashFile}:`, err);
        throw err;
    }
}

// Function to save hashes to a JSON file
async function saveHashes(hashes) {
    const hashFile = './hashes.json';
    try {
        await fs.writeFile(hashFile, JSON.stringify([...hashes], null, 2));
    } catch (err) {
        console.error(`Error saving hashes to ${hashFile}:`, err);
        throw err;
    }
}

// Function to generate a fractal array
function generateFractalArray(ruleBase) {
    let array = [[1]];
    const { r, r2 } = getRule(ruleBase);
    for (let ii = 0; ii < paddingIterations; ii++) {
        array = padding(array, 1);
        array = cellular(array, r2);
		
    }

    return { array, r };
}

// Precompute hashes for all-black and all-white patterns
const allBlackRule = Array(18).fill(0);
const allWhiteRule = Array(18).fill(1);
const allBlackFractal = generateFractalArray(allBlackRule);
const allWhiteFractal = generateFractalArray(allWhiteRule);
const allBlackHash = arrayHash(allBlackFractal.array);
const allWhiteHash = arrayHash(allWhiteFractal.array);

// Function to draw the array as a PNG and save it
async function draw(array, ruleArray, index) {
    const size = array.length;

    const png = new PNG({
        width: size,
        height: size,
        filterType: -1,
    });

    for (let x = 0; x < size; x++) {
        for (let y = 0; y < size; y++) {
            const c = array[x][y] * 255;
            const idx = (y * size + x) << 2;
            png.data[idx] = c;
            png.data[idx + 1] = c;
            png.data[idx + 2] = c;
            png.data[idx + 3] = 255;
        }
    }

    const filename = `${ruleArray.join('')}.png`;
    const filePath = path.join(cellsFolder, filename);

    return new Promise((resolve, reject) => {
        png.pack().pipe(
            require('fs').createWriteStream(filePath)
                .on('finish', resolve)
                .on('error', reject)
        );
    });
}

// Main function
async function init() {
    const t0 = performance.now();

    // Ensure the cells folder exists
    await ensureCellsFolder();

    // Load existing hashes
    const hashes = await loadHashes();
    const initialHashCount = hashes.size;

    // Add all-black and all-white hashes to the set
    hashes.add(allBlackHash);
    hashes.add(allWhiteHash);

    const promises = [];
    let savedCount = 0;
    let totalAttempts = 0;

	let whilebreaker=0;
    while ((savedCount < targetCount)&&(whilebreaker < 15000)) {
		whilebreaker++;
        totalAttempts++;

        // Use the predefined rule if targetCount is 1, otherwise generate a random rule
        const ruleBase = targetCount === 1 ? r1 : undefined;
        const { array, r } = generateFractalArray(ruleBase);
		//const { array, r } = generateFractalArray(numberTo18BitArray(q1+whilebreaker));

        // Compute the hash
        const hash = arrayHash(array);

        // Skip hash check if we're regenerating a specific pattern (targetCount = 1)
        if (targetCount !== 1 && hashes.has(hash)) {
            if (totalAttempts % 100 === 0) {
                console.log(`Attempt ${totalAttempts}: Skipped a uniform or duplicate pattern. Saved ${savedCount}/${targetCount} fractals.`);
            }
            continue;
        }

        // If we're not skipping the hash check, add the hash to the set
        if (targetCount !== 1) {
            hashes.add(hash);
        }

        // Save the fractal
        promises.push(draw(array, r, savedCount));
        savedCount++;

        // Log progress
        if (savedCount % 100 === 0) {
            console.log(`Saved ${savedCount}/${targetCount} fractals after ${totalAttempts} attempts. Unique patterns: ${hashes.size - 2}`);
        }
    }

    // Wait for all PNGs to be written
    try {
        await Promise.all(promises);
    } catch (err) {
        console.error('Error writing PNGs:', err);
    }

    // Save the updated hashes
    await saveHashes(hashes);

    const t1 = performance.now();
    console.log(`Call to init took ${t1 - t0} milliseconds. Generated ${savedCount} fractals after ${totalAttempts} attempts. Unique patterns: ${hashes.size - initialHashCount - 2}`);
}

// Run the program
init().catch(err => {
    console.error('Error in init:', err);
});