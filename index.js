#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
import { differenceInSeconds } from "date-fns";
const res = await inquirer.prompt([
    {
        name: "userInput",
        type: "number",
        message: chalk.green("Please Enter the amount of second"),
        validate: (input) => {
            if (isNaN(input)) {
                return chalk.yellow("Please Enter a Valid Number");
            }
            else if (input > 60) {
                return chalk.red("Seconds must be in 60");
            }
            else {
                return true;
            }
        }
    }
]);
let input = res.userInput;
// function which is fire in every seconds
function startTimer(val) {
    const intTime = new Date().setSeconds(new Date().getSeconds() + val);
    const intervalTime = new Date(intTime);
    setInterval((() => {
        const currTime = new Date();
        const timeDiff = differenceInSeconds(intervalTime, currTime);
        if (timeDiff <= 0) {
            console.log(chalk.magenta("Timer has Expired"));
            process.exit();
        }
        const min = Math.floor((timeDiff % (3600 * 24)) / 3600);
        const sec = Math.floor(timeDiff % 60);
        console.log(`${min.toString().padStart(2, "0")} : ${sec.toString().padStart(2, "0")}`);
    }), 1000);
}
startTimer(input);
