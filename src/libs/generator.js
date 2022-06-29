/* 生成最终项目  generator.js*/

const Metalsmith = require("metalsmith");
const Handlebars = require("handlebars");

module.exports = function (metadata = {}, src, dest = ".") {
  if (!src) {
    return Promise.reject(new Error(`无效的source: ${src}`));
  }
  return new Promise((resolve, reject) => {
    Metalsmith(process.cwd()) // 在当前目录下执行
      .metadata(metadata) // 设置全局元信息-可被应用于所有文件
      .clean(false) // 设置是否在写入文件前移除目标路径
      .source(src) // 设置资源目录（相对路径）
      .destination(dest) // 目标路径
      .use((files, metalsmith, done) => {
        // 使用函数插件
        const meta = metalsmith.metadata();
        // 修改package.json中的内容
        Object.keys(files)
          .filter((x) => x.includes("package.json"))
          .forEach((fileName) => {
            const t = files[fileName].contents.toString();
            files[fileName].contents = Buffer.from(
              Handlebars.compile(t)(meta),
              "utf-8"
            );
          });
        done();
      })
      .build((err) => {
        err ? reject(err) : resolve();
      });
  });
};
