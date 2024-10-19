import { readFileSync } from "fs";
import { join } from "path";
import chalk from "chalk";

const error = chalk.bgHex("#3a0d12").hex("#f74c4c").bold;
const info = chalk.hex("#68c9fa").bold;
const magenta = chalk.bgHex("#342136").hex("#f197f7").bold;
const success = chalk.bgHex("#0c2215").hex("#74faa5").bold;
const warning = chalk.bgHex("#3a0d12").hex("#f7d74c").bold;

const commitMsgFile = process.argv[2];
const commitMsg = readFileSync(join(process.cwd(), commitMsgFile), "utf8").trim();

console.log(success("🎉 Commit message validation complete! 🎉\n"));

if (commitMsg) {
  console.log(info(commitMsg));
}

console.log(magenta("\nGood luck in your PR! 🧾\n"));
