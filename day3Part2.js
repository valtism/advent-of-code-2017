function run(input) {
    let grid = [];
    let pos = {
        x: 0,
        y: 0
    };
    let n = 1;
    let direction = 'E';
    while (n < input) {
        if(shouldTurn(pos)) {
            turn(direction);
        }
        pos = step(pos, direction);
        n = sumSurrounds(pos);
        writeToGrid(grid);
    }
    return n;
}

function shouldTurn(pos) {
    // Special case for spiral enlargment at bottom right
    if (pos.x - 1 === -pos.y) {
        
    }
    pos.x ==
}