const fs = require("fs");

function run(input, target) {
    const linksStrings = input.split("\n");
    const linksArray = getLinksArray(linksStrings);

    const groups = [];
    while (groups.length < linksArray.length) {
        const newGroup = getGroup(target, linksArray);
        groups.push(newGroup);
        target = getNewTarget(groupedNodes, linksArray);
    }

    return numberOfGroups;
}

function getLinksArray(linksStrings) {
    return linksStrings
        .map(links => links.match(/\d+/g))
        .map(nodes => nodes.slice(1, nodes.length))
        .map(arr => arr.map(Number));
}

function getGroup(target, linksHashMap) {
    let linked = new Set();
    let newLinked = new Set([target]);

    while (newLinked.size > linked.size) {
        linked = newLinked;
        linksHashMap.forEach((links, i) => {
            if (newLinked.has(i)) {
                newLinked = new Set([...newLinked, ...links]);
            }
        });
    }
    return linked;
}

function getNewTarget(groups, linksArray) {}

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
