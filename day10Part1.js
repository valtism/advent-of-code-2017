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

const tests = [3, 4, 1, 5];

function run(lengths) {
    let list = Array.from(Array(256).keys());
    let currentPosition = 0;
    let skipSize = 0;
    lengths.forEach(length => {
        const reversedSection = getReversedSection(
            currentPosition,
            list,
            length
        );
        list = applySection(currentPosition, list, reversedSection);
        currentPosition = wrappedIndex(
            list,
            currentPosition + length + skipSize
        );
        skipSize++;
    });
    return list[0] * list[1];
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
    if (index - listLength >= 0) {
        return index - listLength;
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

console.log(run(lengths));
