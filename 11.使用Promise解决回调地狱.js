const fs = require('fs')

function getFileByPath(fpath) {
  return new Promise(function (resolve, reject) {
    fs.readFile(fpath, 'utf-8', (err, dataStr) => {

      if (err) return reject(err)
      resolve(dataStr)

    })
  })
}

// 需求：先读取文件a，在读取b，最后读取c
// 注意： 通过 .then 指定 回调函数的时候，成功的 回调函数，必须传，但是，失败的回调，可以省略不传

// 怎么做？读取文件1，在上一个 .then 中，返回一个新的 promise 实例，可以继续用下一个 .then 来处理


// 如果 ，前面的 Promise 执行失败，我们不想让后续的Promise 操作被终止，可以为 每个 promise 指定 失败的回调
getFileByPath('./data/a.txt')
  .then(function (data) {
    console.log(data)

    // 读取文件b
    return getFileByPath('./data/b.txt')
  })
  .then(function (data) {
    console.log(data)
    // 读文件c
    return getFileByPath('./data/c.txt')
  })
  .then(function (data) {
    console.log(data)
  })
