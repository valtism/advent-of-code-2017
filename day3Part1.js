function run(input) {
    const roots = {
        lower: Math.floor(Math.sqrt(input)),
        upper: Math.ceil(Math.sqrt(input))
    };

    const coordinates = getInputCoordinates(input, roots);
    const distance = Math.abs(coordinates.x) + Math.abs(coordinates.y);
    return { coordinates, distance };
}

function getInputCoordinates(input, roots) {
    const isUpperRight = roots.upper % 2 === 0;
    const isCloserToLower = getIsCloserToLower(input, roots);
    const distance = distanceToClosestSquare(input, roots);

    const delta = getDeltaFromClosestSquare(isUpperRight, isCloserToLower, distance);
    const closestRoot = isCloserToLower ? roots.lower : roots.upper;
    const squareCoordinates = getSquareCoordinates(closestRoot);

    return {
        x: squareCoordinates.x + delta.x,
        y: squareCoordinates.y + delta.y
    };
}

function getDeltaFromClosestSquare(isUpperRight, isCloserToLower, distance) {
    if (isUpperRight) {
        if (isCloserToLower) {
            return {
                x: 1,
                y: distance - 1
            };
        } else {
            return {
                x: distance,
                y: 0
            };
        }
    } else {
        if (isCloserToLower) {
            return {
                x: -1,
                y: 1 - distance
            };
        } else {
            return {
                x: -distance,
                y: 0
            };
        }
    }
}

function distanceToClosestSquare(input, roots) {
    const closerSquare = squareInputIsCloserTo(input, roots);
    return Math.abs(input - closerSquare);
}

function getIsCloserToLower(input, roots) {
    const closerSquare = squareInputIsCloserTo(input, roots);
    return input > closerSquare;
}

function squareInputIsCloserTo(input, roots) {
    const upperSquare = roots.upper ** 2;
    const lowerSquare = roots.lower ** 2;
    const lowerDifference = input - lowerSquare;
    const upperDifference = upperSquare - input;
    return upperDifference > lowerDifference ? lowerSquare : upperSquare;
}

function getSquareCoordinates(squareRoot) {
    const isEven = squareRoot % 2 === 0;
    if (isEven) {
        return {
            x: 1 - squareRoot / 2,
            y: squareRoot / 2
        };
    } else {
        return {
            x: (squareRoot - 1) / 2,
            y: -(squareRoot - 1) / 2
        }
    }
}

run(347991);