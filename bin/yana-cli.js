#! /usr/bin/env node
const program = require('commander')
const config = require('../package.json')

program.version(config.version, "-V, --version")

// 定义使用方法
program
    .command("create")
    .description("创建一个模板项目")
    .action( () =>{
        require("../lib/create")
    })

program
    .command("list")
    .description("列出当前可用模板项目")
    .action(()=>{
        require('../lib/list')
    })

program
    .command('add')
    .description('添加模板')
    .action(()=>{
        require('../lib/add')
    })

program
    .command('delete')
    .description('删除模板')
    .action(()=>{
        require('../lib/delete')
    })
    
// 解析参数
program.parse(process.argv)
if(!program.args.length){
    program.help()
}