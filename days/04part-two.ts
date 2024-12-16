const Solution: AdventOfCodeSolution = (input) => {
    // co-ords are y, x due to the split.
    const grid = input
        .split("\n")
        .map(line => line.split(''));

    const horizontal = grid[0].length;
    const vertical = grid.length;

    // Helpfully, we need only look for A.

    const trueSet = new Set(["M", "S"]);

    let count = 0;
    for (let x = 1; x < horizontal - 1; x++) {
        for (let y = 1; y < vertical - 1; y++) {
            if (grid[y][x] === "A") {
                new Set([grid[y - 1][x - 1], grid[y + 1][x + 1]]).intersection(trueSet).size === 2 &&
                new Set([grid[y + 1][x - 1], grid[y - 1][x + 1]]).intersection(trueSet).size === 2 &&
                count++
            }
        }
    }

    return count
}

export default Solution;