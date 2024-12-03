const validRe = /mul\(\d+,\d+\)/g
const digits = /\d+/g


const Solution: AdventOfCodeSolution = (input) => {
    const validCalls = 
        [...input.matchAll(validRe)].map(m => m[0]);
    
   return validCalls
        .map(token => 
            [...token.matchAll(digits)]
            .map(m => Number.parseInt(m[0]))
            .reduce((toMul, num) => toMul * num, 1)
        )
        .reduce((acc, num) => acc + num, 0)
}

export default Solution;