const input = [11, 11, 13, 7, 0, 15, 5, 5, 4, 4, 1, 1, 7, 1, 15, 11];

function run(banks) {
    let cycles = 0;
    let states = [];
    debugger;
    while (!haveSeenState(banks, states)) {
        states.push(banks);
        banks = redistribute(banks);
        cycles++;
    }
    const firstStateOccurance = indexOfState(banks, states);
    return cycles - firstStateOccurance;
}

function indexOfState(targetState, states) {
    return states.findIndex(state => isEqual(targetState, state));
}

function haveSeenState(banks, states) {
    return states.some(state => isEqual(banks, state));
}

function isEqual(targetState, state) {
    for (let i = 0; i < targetState.length; i++) {
        if (targetState[i] !== state[i]) {
            return false;
        }
    }
    return true;
}

function redistribute(banks) {
    const highestIndex = getIndexOfHighest(banks);
    const blocksToRedistribute = banks[highestIndex];

    const redistributed = [...banks]; // Clone array
    redistributed[highestIndex] = 0;
    let i = highestIndex;
    for (let blocks = blocksToRedistribute; blocks > 0; blocks--) {
        i = getNextIndex(i, redistributed);
        redistributed[i]++;
    }
    return redistributed;
}

function getIndexOfHighest(array) {
    const highestNumber = array.reduce((highest, blocks) => {
        if (blocks > highest) {
            return blocks;
        } else {
            return highest;
        }
    }, 0);
    return array.indexOf(highestNumber);
}

function getNextIndex(i, array) {
    if (i >= array.length - 1) {
        i = 0;
    } else {
        i++;
    }
    return i;
}

run(input);
