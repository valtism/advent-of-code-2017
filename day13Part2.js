const fs = require("fs");

function run(input) {
    let layers = parseLayers(input);
    let severity = -1;
    let waitTime = 0;

    while (!isSafeTravel(layers, waitTime)) {
        waitTime++;
        layers = parseLayers(input);
    }

    // for (waitTime; severity !== 0; waitTime++) {
    //     severity = isCaught(layers, waitTime);
    // }

    return waitTime;
}

function isSafeTravel(layers, waitTime) {
    let severity = 0;
    const lowestDepth = getLowestDepth(layers);
    for (
        let currentDepth = 0 - waitTime;
        currentDepth <= lowestDepth;
        currentDepth++
    ) {
        if (isCaught(currentDepth, layers) && currentDepth >= 0) {
            return false;
        }
        layers = moveScanners(layers);
    }
    return true;
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
    return layers.map(layer => {
        const movement = getLayerMovement(layer);
        const scannerPosition = (layer.scannerPosition += movement);
        const isScannerIncrement = movement > 0;
        return new Layer(
            layer.depth,
            layer.range,
            scannerPosition,
            isScannerIncrement
        );
    });

    // layers.forEach(layer => {
    //     if (
    //         (layer.scannerPosition === 0 && !layer.isScannerIncrement) ||
    //         (layer.scannerPosition === layer.range - 1 &&
    //             layer.isScannerIncrement)
    //     ) {
    //         layer.isScannerIncrement = !layer.isScannerIncrement;
    //     }
    //     layer.scannerPosition += layer.isScannerIncrement ? 1 : -1;
    // });
}

function getLayerMovement(layer) {
    const reverse = willScannerReverse(layer);
    const increment = layer.isScannerIncrement;
    return increment !== reverse ? 1 : -1;
}

function willScannerReverse(layer) {
    return (
        (layer.scannerPosition === 0 && !layer.isScannerIncrement) ||
        (layer.scannerPosition === layer.range - 1 && layer.isScannerIncrement)
    );
}

class Layer {
    constructor(depth, range, scannerPosition = 0, isScannerIncrement = true) {
        this.depth = depth;
        this.range = range;
        this.scannerPosition = scannerPosition;
        this.isScannerIncrement = isScannerIncrement;
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
