const validRe = /(mul\(\d+,\d+\)|do\(\)|don\'t\(\))/g
const digits = /\d+/g

let echo = true;

const parseEvalCall = (token: string): number | undefined => {
    if (token === "do()") { echo = true; return; }
    if (token === "don't()") { echo = false; return; }

    return echo ? [...token.matchAll(digits)]
        .map(m => Number.parseInt(m[0]))
        .reduce((toMul, num) => toMul * num, 1) : undefined;
}

const Solution: AdventOfCodeSolution = (input) => {
    const validCalls = 
        [...input.matchAll(validRe)].map(m => m[0]);
    
    return validCalls
        .map(parseEvalCall)
        .filter(a => a)
        .reduce((acc, num) => acc + num, 0)
}

export default Solution;