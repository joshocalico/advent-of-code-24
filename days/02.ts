function evaluateSafety(seq: number[]): boolean {
    let prev = undefined;
    let isIncreasing = true;
    let isDecreasing = true;
    let tripped = false;

    seq.forEach(element => {
        if (prev) {
            // Sequence Check
            if (prev > element) {
                isIncreasing = false;
            } else if (prev < element) {
                isDecreasing = false;
            } else {
                tripped = true;
            }

            // Magnitude check
            if (Math.abs(prev - element) > 3) {
                tripped = true;
            }
        }

        prev = element;
    });

    return !tripped && (isDecreasing || isIncreasing)
    
}

const Solution: AdventOfCodeSolution = (input) => {
    return input.split("\n")
        .map(line => line.split(" ")
        .map(num => Number.parseInt(num)))
        .map(evaluateSafety)
        .filter(a => a)
        .length
}

export default Solution;