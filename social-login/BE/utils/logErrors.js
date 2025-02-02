const moment = require("moment");

const logError = async (error) => {
    const chalk = await import('chalk');
    const timeStamp = moment().format("YYYY-MM-DD HH:mm:ss");

    console.log(chalk.red.bold("🚨 ERROR LOG 🚨"));
    console.log(chalk.yellow(`[Time]:`), chalk.cyan(timeStamp));

    if (error.name) {
        console.log(chalk.yellow(`[Error Type]:`), chalk.magenta.bold(error.name));
    }

    if (error.message) {
        console.log(chalk.yellow(`[Message]:`), chalk.red(error.message));
    }

    if (error.stack) {
        const stackLines = error.stack.split("\n").slice(0, 5);
        console.log(chalk.yellow(`[Stack Trace]:`));
        stackLines.forEach((line) => console.log(chalk.gray(line)));
    }

    console.log(chalk.red.bold("🚨 END ERROR 🚨"));
};

module.exports = logError;