const inquirer = require('inquirer')
const chalk = require('chalk')
const fs = require('fs')
const template = require('../template.json')

let question = [
    {
        name: 'name',
        type: 'list',
        message: '请选择要删除的模板',
        choices: Object.keys(template)
    },
]

inquirer
    .prompt(question)
    .then(answers=>{
        let {name} = answers
        delete template[name]
        // 更新template.json
        fs.writeFile(`${__dirname}/../template.json`, JSON.stringify(template), 'utf-8', err=>{
            if(err) console.log(err)
            console.log(chalk.green('模板删除成功'))
            console.log(chalk.gray('当前可用模板列表如下：\n'))
            console.log(template)

        })
    })