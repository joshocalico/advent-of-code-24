const Solution: AdventOfCodeSolution = (input) => {
    const 
        left = new Array(),
        right = new Map()

    input
        .split('\n')
        .forEach(line => {
            const [l, r] = line.split(/\s+/);
            left.push(Number.parseInt(l));
            const rightVal = Number.parseInt(r);
            right.set(rightVal, (right.get(rightVal) || 0) + 1);
        });
    
    return left.reduce((sum, val) => {
        return sum + (right.get(val) ?? 0) * val
    }, 0)
};

export default Solution;