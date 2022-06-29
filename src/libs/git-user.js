#!/usr/bin/env node

const exec = require('child_process').execSync

module.exports = ()=>{
    let name
    let email

    try{
        name = exec('git config --get user.name')
        email = exec('git config --get user.email')
    }catch(e){}

    // 格式化，去除可能的末尾空格，符号等
    name = name && JSON.stringify(name.toString().trim()).slice(1, -1)
    email = email && (' <' + email.toString().trim() + '>')
    return {name: name||'', email: email||''}
}