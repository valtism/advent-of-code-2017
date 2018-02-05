const fs = require("fs");

const contents = fs.readFileSync("Data/Day11.txt", "utf8");

function run(input) {
    const directions = input.split(",");
    const path = getPath(directions);
    return furthestDistance(path);
}

function getPath(directions) {
    let position = new Hex(0, 0, 0);
    const path = directions
        .map(direction => hexDirection(direction))
        .map(hexDirection => (position = hexAdd(position, hexDirection)));
    return path;
}

function furthestDistance(path) {
    const distances = path.map(hexLength);
    return Math.max(...distances);
}

function Hex(x, y, z) {
    return { x: x, y: y, z: z };
}

function hexAdd(a, b) {
    return Hex(a.x + b.x, a.y + b.y, a.z + b.z);
}

function hexSubtract(a, b) {
    return Hex(a.x - b.x, a.y - b.y, a.z - b.z);
}

function hexNeighbor(hex, direction) {
    return hexAdd(hex, hexDirections[direction]);
}

const hexDirections = {
    //  ^
    //   \
    //    +--+
    //   / y  \
    //  +    x + ->
    //   \ z  /
    //    +--+
    //   /
    //  v
    n: Hex(0, 1, -1),
    ne: Hex(1, 0, -1),
    se: Hex(1, -1, 0),
    s: Hex(0, -1, 1),
    sw: Hex(-1, 0, 1),
    nw: Hex(-1, 1, 0)
};

function hexDirection(direction) {
    return hexDirections[direction];
}

function hexLength(hex) {
    return Math.trunc(
        (Math.abs(hex.x) + Math.abs(hex.y) + Math.abs(hex.z)) / 2
    );
}

function hexDistance(a, b) {
    return hexLength(hexSubtract(a, b));
}

(function test() {
    const tests = ["ne,ne,ne", "ne,ne,sw,sw", "ne,ne,s,s", "se,sw,se,sw,sw"];
    tests.forEach(test => {
        console.log(run(test));
    });
})();

(function puzzle() {
    console.log(run(contents));
})();
