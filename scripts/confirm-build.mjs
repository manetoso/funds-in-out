import readline from "readline";
import chalk from "chalk";
import { execSync } from "child_process";

const info = chalk.bgHex("#093d57").hex("#68c9fa").bold;
const warning = chalk.bgHex("#3b351c").hex("#f7d74c").bold;
const error = chalk.bgHex("#3a0d12").hex("#c42133").bold;
const success = chalk.bgHex("#0c2215").hex("#74faa5").bold;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: true,
});

console.log(
  warning("\n🚧 Please proceed if you have set up your EAS account and config in the repo. 🚧\n"),
);
process.stdout.write(info("Do you want to continue? (y/n): "));

process.stdin.setRawMode(true);
process.stdin.resume();

process.stdin.on("data", key => {
  const answer = key.toString().toLowerCase();

  if (answer === "y") {
    console.log(success("\nStarting build, please wait and grab a coffee. ☕️"));
    execSync("eas build -p android --profile preview", {
      stdio: "inherit",
    });
  } else {
    console.log(error("\nBuild canceled, happy coding. 🧑‍💻"));
  }

  process.stdin.setRawMode(false);
  rl.close();
});
