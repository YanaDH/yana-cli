#!/usr/bin/env node

const template = require('../template.json')
const chalk = require('chalk')

console.log(chalk.gray('当前模板列表如下：\n'))
console.log(template)