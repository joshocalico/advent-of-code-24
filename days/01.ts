const Solution: AdventOfCodeSolution = (input) => {
    const 
        left = new Array(),
        right = new Array();

    input
        .split('\n')
        .forEach(line => {
            const [l, r] = line.split(/\s+/);
            left.push(Number.parseInt(l));
            right.push(Number.parseInt(r));
        });
    
    const sortedLeft = left.sort((a, b) => a - b);
    const sortedRight = right.sort((a, b) => a - b);

    return sortedLeft.reduce((sum, _, index) => sum + Math.abs(sortedLeft[index] - sortedRight[index]), 0)
};

export default Solution;