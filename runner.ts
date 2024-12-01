import yargs from 'yargs';
import chalk from 'chalk';
import { z } from 'zod';
import { readdir, readdirSync, readFile } from 'fs';

const args = await yargs(process.argv)
    .scriptName('yarn start')
    .demandCommand(3, chalk.redBright('[Error] Please specify a day.'))
    .example('$0 1', 'Run day 1 solution.')
    .epilogue('Thanks for checking out my AoC solutions! Merry Christmas!')
    .usage('AoC 2024 solutions - by joshocalico')
    .usage(chalk.yellowBright('Usage: $0 <command> [options]'))
    .parse();

const { 
    success,
    error,
    data: _day
} = z
    .number()
    .max(25, 'Day must be between 1 and 25.')
    .min(1, 'Day must be between 1 and 25.')
    .safeParse(args._[2]);

if (!success) {
    console.error(chalk.redBright("[Error] Invalid day."))
    console.error("More details\n");

    console.error(chalk.gray(error.message));
    process.exit(1);
}

const day = _day.toString().padStart(2, '0');
const fileRe = new RegExp(`${day}(.*?).ts`);

const toOptionalAnnotation = (f: string) => f.length ? f : undefined;

const files = readdirSync('./days')
.filter(file => file.match(fileRe))
.map(file => ({
    annotation: toOptionalAnnotation(file.match(fileRe)[1]),
    filename: file,
    func: import(`./days/${file}`)
}))

const solution = import(`./days/${day}.ts`)
readFile(`./files/${day}.txt`, (err, data) => {
    if (err) {
        console.error(chalk.redBright("[Error] Could not read input file."))
        process.exit(1);
    }

    console.log(chalk.greenBright(`Solutions for`), chalk.bold.cyanBright(`${day} December`));

    const input = data.toString();

    files.forEach(({annotation, filename, func}) => {
        func.then(({ default: solve }) => {
            const result = solve(input);
            console.log(chalk.greenBright("Solution" + `${annotation ? ` (${annotation})` : ''}: ${result}`));
        });
    })
})
