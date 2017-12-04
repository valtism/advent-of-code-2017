// const target = 347991;


function run(target) {
    debugger;
    let pos = {
        x: 0,
        y: 0
    }
    let direction = 'E';
    let length = 1;

    for (let i = 0; i < target; i++) {
        move(direction, Math.floor(length), pos);
        direction = turn(direction);
        length = incrementLength(length);
    }
    console.log(x, y);
}

function move(direction, length, pos) {
    switch (direction) {
        case 'N':
            pos.y += length;
            break;
        case 'E':
            pos.x += length;
            break;
        case 'S':
            pos.y -= length;
            break;
        case 'W':
            pos.x -= length;
            break;
    }
}

function turn(direction) {
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

function incrementLength(length) {
    return length += 0.5;
}

run(12);