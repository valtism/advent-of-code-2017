function run(input) {
    debugger;
    let grid = [[1]];
    let pos = {
        x: 0,
        y: 0
    };
    let n = 1;
    let direction = 'E';
    while (n < input) {
        if (shouldTurn(pos)) {
            direction = turn(direction);
        }
        pos = step(pos, direction);
        n = sumSurrounds(pos, grid);
        grid = updatedGrid(pos, grid, n);
    }
    return n;
}

function shouldTurn(pos) {
    // Special case for spiral enlargment at bottom right
    if (pos.x - 1 === -pos.y) {
        return true;
    } else if (pos.x === -pos.y) {
        return false;
    }
    // Turn at the other corners where x == y
    return Math.abs(pos.x) === Math.abs(pos.y)
}

function turn(direction) {
    // Turn 90deg left
    switch (direction) {
        case 'N':
            return 'W';
        case 'E':
            return 'N';
        case 'S':
            return 'E';
        case 'W':
            return 'S';
    }
}

function step(pos, direction) {
    switch (direction) {
        case 'N':
            pos.y++;
            break;
        case 'E':
            pos.x++;
            break;
        case 'S':
            pos.y--;
            break;
        case 'W':
            pos.x--;
            break;
    }
    return pos;
}

function sumSurrounds(pos, grid) {
    sum = 0;
    // Sum all surrounding squares. Pos should be empty
    for (let x = pos.x - 1; x <= pos.x + 1; x++) {
        if (grid[x]) {
            for (let y = pos.y - 1; y <= pos.y + 1; y++) {
                if (grid[x][y]) {
                    sum += grid[x][y];
                }
            }
        }
    }
    return sum;
}

function updatedGrid(pos, grid, sum) {
    if (!grid[pos.x]) {
        grid[pos.x] = [];
    }
    grid[pos.x][pos.y] = sum;
    return grid;
}

run(1000);