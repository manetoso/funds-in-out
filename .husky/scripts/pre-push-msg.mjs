import chalk from "chalk";

const error = chalk.bgHex("#3a0d12").hex("#f74c4c").bold;
const info = chalk.hex("#68c9fa").bold;
const magenta = chalk.bgHex("#342136").hex("#f197f7").bold;
const success = chalk.bgHex("#0c2215").hex("#74faa5").bold;

console.log(success("\n🎉 Code validation completed! 🎉\n"));

console.log(magenta("\nGood luck in your PR! 🧾\n"));
