module.exports = { getKnotHash };

const lengths = [
    102,
    255,
    99,
    252,
    200,
    24,
    219,
    57,
    103,
    2,
    226,
    254,
    1,
    0,
    69,
    216
];

const tests = ["", "AoC 2017", [1, 2, 3], [1, 2, 4]];

function getKnotHash(input) {
    const knotSize = 256;
    const numberOfRounds = 64;
    let sparseHash = Array.from(Array(256).keys());
    let currentPosition = 0;
    let skipSize = 0;

    let lengths = convertToByteString(input);

    for (let i = 0; i < numberOfRounds; i++) {
        lengths.forEach(length => {
            const reversedSection = getReversedSection(
                currentPosition,
                sparseHash,
                length
            );
            sparseHash = applySection(
                currentPosition,
                sparseHash,
                reversedSection
            );
            currentPosition = wrappedIndex(
                sparseHash,
                currentPosition + length + skipSize
            );
            skipSize++;
        });
    }

    const denseHashes = toDenseHashes(sparseHash);

    return getHexHash(denseHashes);
}

function convertToByteString(array) {
    const bytes = array
        .toString()
        .split("")
        .map(c => c.charCodeAt());
    const suffix = [17, 31, 73, 47, 23];
    return bytes.concat(suffix);
}

function toDenseHashes(sparseHashes) {
    const chunkSize = 16;
    const bitwiseXor = (acc, curr) => acc ^ curr;

    const chunks = chunk(sparseHashes, chunkSize);
    return chunks.map(chunk => chunk.reduce(bitwiseXor));
}

function getHexHash(denseHashes) {
    return denseHashes.map(e => toHex(e)).join("");
}

function toHex(decimal) {
    let hex = decimal.toString(16);
    if (hex.length < 2) {
        hex = "0".concat(hex);
    }
    return hex;
}

function chunk(arr, len) {
    var chunks = [],
        i = 0,
        n = arr.length;

    while (i < n) {
        chunks.push(arr.slice(i, (i += len)));
    }

    return chunks;
}

function getReversedSection(currentPosition, list, length) {
    const lengthToReverse = [];
    for (let i = currentPosition; i < length + currentPosition; i++) {
        lengthToReverse.push(list[wrappedIndex(list, i)]);
    }
    return lengthToReverse.reverse();
}

function wrappedIndex(list, index) {
    const listLength = list.length;
    if (index >= listLength) {
        return index % listLength;
    } else {
        return index;
    }
}

function applySection(currentPosition, list, section) {
    const newList = list.slice(0);

    let i = currentPosition;
    section.forEach(num => {
        let index = wrappedIndex(newList, i);
        newList.splice(index, 1, num);
        i++;
    });

    return newList;
}

// Tests
// tests.forEach(test => console.log(run(test)));

// Actual
// console.log(run(lengths));
