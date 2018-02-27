const fs = require("fs");

function run(input) {
    const layers = parseLayers(input);

    let delay = 0;
    while (!isSafeTravel(layers, delay)) {
        delay++;
    }

    return delay;
}

class Layer {
    constructor(depth, range) {
        this.depth = depth;
        this.range = range;
    }
}

function parseLayers(input) {
    return input
        .split("\n")
        .map(e => e.split(": ").map(Number))
        .map(e => new Layer(...e));
}

function isSafeTravel(layers, delay) {
    return layers.every(layer => !isCaught(layer, delay));
}

function isCaught(layer, delay) {
    const distanceFromScanner = delay + layer.depth;
    const scannerPeriod = (layer.range - 1) * 2;
    return Number.isInteger(distanceFromScanner / scannerPeriod);
}

(function test() {
    const testInput = `0: 3
1: 2
4: 4
6: 4`;

    console.log("Test severity:");
    console.log(run(testInput));
})();

(function day13() {
    const input = fs.readFileSync("Data/Day13.txt", "utf8");

    console.log("Actual severity:");
    console.log(run(input));
})();
