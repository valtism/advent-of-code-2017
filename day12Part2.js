const fs = require("fs");

function run(input, target) {
    const pipes = input.split("\n");
    const linksArray = pipes
        .map(links => links.match(/\d+/g))
        .map(nodes => nodes.slice(1, nodes.length))
        .map(arr => arr.map(Number));

    const groups = [];
    while (getNumberOfGroupedNodes(groups) < linksArray.length) {
        target = getNextUngroupedNode(linksArray, groups);
        groups.push(getGroup(target, linksArray));
    }

    return groups.length;
}

function getNumberOfGroupedNodes(groups) {
    return groups.reduce((size, set) => (size += set.size), 0);
}

function getNextUngroupedNode(linksArray, groups) {
    const isNotInAnySet = (value, i) => !groups.some(set => set.has(i));

    return linksArray.findIndex(isNotInAnySet);
}

function getGroup(target, linksArray) {
    let group = new Set();
    let newGroup = new Set([target]);
    while (newGroup.size > group.size) {
        group = newGroup;
        linksArray.forEach((links, i) => {
            if (newGroup.has(i)) {
                newGroup = new Set([...newGroup, ...links]);
            }
        });
    }
    return group;
}

(function test() {
    const target = 0;
    const input = `0 <-> 2
1 <-> 1
2 <-> 0, 3, 4
3 <-> 2, 4
4 <-> 2, 3, 6
5 <-> 6
6 <-> 4, 5`;

    console.log(run(input, target));
})();

(function day12() {
    const target = 0;
    const input = fs.readFileSync("Data/Day12.txt", "utf8");

    console.log(run(input, target));
})();
