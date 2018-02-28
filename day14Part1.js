var knotHash = require("./day10Part2");

function run() {
    const input = "nbysizxe";
    let binaryGrid = "";
    for (let i = 0; i < 128; i++) {
        const rowSeed = input.concat("-", i);
        const hexHash = knotHash.getKnotHash(rowSeed);
        const binaryRow = hexToBinary(hexHash);
        binaryGrid = binaryGrid.concat(binaryRow);
    }
    const squaresUsed = binaryGrid.match(/1/g).length;
    console.log(squaresUsed);
}

function hexToBinary(hex) {
    return hex
        .split("")
        .map(hex => parseInt(hex, 16))
        .map(dec => dec.toString(2))
        .map(bin => leftpad(bin, 4, "0"))
        .join("");
}

function leftpad(str, len, ch) {
    str = String(str);
    var i = -1;
    if (!ch && ch !== 0) ch = " ";
    len = len - str.length;
    while (++i < len) {
        str = ch + str;
    }
    return str;
}

run();
