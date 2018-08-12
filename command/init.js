'use strict'

const exec = require('child_process').exec;
const co = require('co');
const prompt = require('co-prompt');
const config = require('../templates');
const chalk = require('chalk');

module.exports = () => {
    co(function* () {
        let tplName = yield prompt('Template name: ');
        let projectName = yield prompt('Project name: ');

        if (!config.tpl[tplName]) {
            console.log(chalk.red('\n Sorry! Template does not exit! \n Please add the template first!'));
            process.exit()
        }

        const gitUrl = config.tpl[tplName].url
        const branch = config.tpl[tplName].branch
        let cmdStr = `git clone -b ${branch} ${gitUrl} ${projectName}`

        console.log(chalk.white('\n Starting a new project, please wait...'));

        exec(cmdStr, (error, stdout, stderr) => {
            if (error) {
                console.log(chalk.red(error));
                process.exit();
            }
            console.log(chalk.green('\n √ Generation Success!'));
            console.log(`\n cd ${projectName} && cnpm install \n`);
            process.exit();
        })
    })
}
