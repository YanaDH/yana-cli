#!/usr/bin/env node

const download = require('download-git-repo')
const template = require('../template.json')
const ora = require('ora') // loading效果
const chalk = require('chalk')  // 添加颜色
const inquirer = require('inquirer')    // 交互命令
const getUser = require('./libs/git-user')
const generator = require('./libs/generator')
const question = [
    {
        name: 'templateName',
        type: 'input',
         message: '请输入模板名称',
         validate(val){
             if(val===''){
                 console.log(chalk.yellow('模板名称不能为空'))
                 console.log(chalk.grey('请通过yana-cli list命令查看可用模板'))
                 return
             }else if(!template[val]){
                 console.log(chalk.red('模板不存在，请确认模板名称后重试'))
                 return
             }else{
                 return true
             }
         }
    },
    {
        name: 'projectName',
        type: 'input',
        message: '请输入项目名称',
        validate(val){
            if(val===''){
                console.log(chalk.yellow('项目名称不能为空'))
                return
            }
            return true
        }
    },
    {
        name: 'description',
        type: 'input',
        message: '请输入项目描述',
        // validate(val){
        //     if(val===''){
        //         return '项目描述'
        //     }
        //     return true
        // }
    }
]
inquirer
    .prompt(question)
    .then(answers=>{
        let {templateName, projectName, description} = answers
        const spinner = ora('项目模板下载中...')
        const tempUrl = template[templateName]
        spinner.start()
        download(`direct:${tempUrl}`,projectName, {clone: true}, err=>{
            if(err) {
                spinner.fail()
                console.log(chalk.red(`项目生成失败，请查看是否有同名文件夹\n${err}`))
                return
            }
            spinner.succeed()
            console.log(chalk.green('项目生成成功'))
            let currentPath = process.cwd()
            let gitUser = getUser()
            let metaData = {
              name: projectName,
              author: gitUser.name,
              description: description,
            };
            generator(metaData, `${currentPath}/${projectName}`,`${currentPath}/${projectName}`) // 元信息替换
        })
    })


