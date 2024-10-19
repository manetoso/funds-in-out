import { readFileSync } from "fs";
import { join } from "path";
import chalk from "chalk";

const info = chalk.hex("#68c9fa").bold;
const success = chalk.bgHex("#0c2215").hex("#74faa5").bold;

const commitMsgFile = process.argv[2];
const commitMsg = readFileSync(join(process.cwd(), commitMsgFile), "utf8").trim();

console.log(success("🎉 Commit message validation completed! 🎉\n"));

if (commitMsg) {
  console.log(info(commitMsg));
}
