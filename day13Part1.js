const fs = require("fs");

function run(input) {
    const layers = parseLayers(input);
    const severity = getSeverity(layers);

    return severity;
}

function getSeverity(layers) {
    let severity = 0;
    const lowestDepth = getLowestDepth(layers);
    for (let currentDepth = 0; currentDepth <= lowestDepth; currentDepth++) {
        if (isCaught(currentDepth, layers)) {
            severity += getSeverityOfCapture(currentDepth, layers);
        }
        moveScanners(layers);
    }
    return severity;
}

function parseLayers(input) {
    return input
        .split("\n")
        .map(e => e.split(": ").map(Number))
        .map(e => new Layer(...e));
}

function getLowestDepth(layers) {
    return layers[layers.length - 1].depth;
}

function isCaught(currentDepth, layers) {
    const layer = getLayer(layers, currentDepth);
    if (!layer) {
        return false;
    }
    return layer.scannerPosition === 0;
}

function getSeverityOfCapture(currentDepth, layers) {
    const layer = getLayer(layers, currentDepth);
    return layer.depth * layer.range;
}

function getLayer(layers, currentDepth) {
    return layers.find(layer => layer.depth === currentDepth);
}

function moveScanners(layers) {
    layers.forEach(layer => {
        if (
            (layer.scannerPosition === 0 && !layer.isScannerIncrement) ||
            (layer.scannerPosition === layer.range - 1 &&
                layer.isScannerIncrement)
        ) {
            layer.isScannerIncrement = !layer.isScannerIncrement;
        }
        layer.scannerPosition += layer.isScannerIncrement ? 1 : -1;
    });
}

class Layer {
    constructor(depth, range) {
        this.depth = depth;
        this.range = range;
        this.scannerPosition = 0;
        this.isScannerIncrement = true;
    }
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
