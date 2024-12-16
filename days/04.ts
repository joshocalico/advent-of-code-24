import { writeFile } from "fs/promises";

const combine = (x: string[]) => x.filter(a => a).join("");

const Solution: AdventOfCodeSolution = (input) => {
    const horizontalCandidates = input
        .split("\n");
    
    // co-ords are y, x due to the split.
    const grid = horizontalCandidates.map(line => line
        .split(''));
    
    const horizontal = grid[0].length;
    const vertical = grid.length;

    const verticalCandidates = Array
        .from({ length: horizontal })
        .map((_, x) => 
            Array.from({ length: vertical })
                .map((_, y) => grid[y][x])
                .join("")
        )

    let candidateLines = [
        ...horizontalCandidates,
        ...verticalCandidates,
    ];

    for (let startX = -horizontal + 1; startX < horizontal; startX++) {
        // Diag Up/Down
        const upSeg = []
        const downSeg = []
        for (let y = 0; y < vertical; y++) {
            if (startX + y < 0) continue;

            upSeg.push(grid[y].at(startX + y))
            downSeg.push(grid[vertical - y - 1].at(startX + y))
        }

        candidateLines.push(combine(upSeg))
        candidateLines.push(combine(downSeg))
    }

    const reversed = candidateLines.map(s => [...s].reverse().join(''))

    candidateLines.push(...reversed)

    return candidateLines.reduce((acc, str) => {
        return acc + [...str.matchAll(/XMAS/g)].length
    }, 0)
}

export default Solution;