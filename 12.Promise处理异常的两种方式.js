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

// 第一种：处理异常的方法
// 当 我们有这样的需求： 哪怕前面的 Promise 执行失败了，但是，不要影响后续 promise 的正常执行，
// 此时，我们可以单独为 每个 promise，通过 .then 指定一下失败的回调；且在每个失败回调的地方，重新返回一个新的Promise对象
/* getFileByPath('./data/11.txt')
  .then(function (data) {
    console.log(data)

    // 读取文件2
    return getFileByPath('./data/a.txt')
  }, function (err) {
    console.log('这是失败的结果：' + err.message)
    // return 一个 新的 Promise
    return getFileByPath('./data/b.txt')
  })
  .then(function (data) {
    console.log(data)

    return getFileByPath('./data/c.txt')
  })
  .then(function (data) {
    console.log(data)
  })

console.log('OKOKOK') */
// 以上代码分析：先打印OKOKOK->报错->bbb->ccc
// 主程序先执行打印3个ok,在读第一个文件时遇到错误，抛出错误信息，然后接着往下执行

// 第二种处理异常的方式：
// 有时候，我们有这样的需求:与上面的需求刚好相反，如果 后续的Promise 执行，依赖于 前面 Promise 执行的结果，
// 如果前面的失败了，则后面的就没有继续执行下去的意义了，此时，我们想要实现，一旦有报错，则立即终止所有 Promise的执行；
getFileByPath('./data/a.txt')
  .then(function (data) {
    console.log(data)

    // 读取文件2
    return getFileByPath('./data/b1.txt')
  })
  .then(function (data) {
    console.log(data)

    return getFileByPath('./data/c.txt')
  })
  .then(function (data) {
    console.log(data)
  })
  .catch(function (err) { // catch 的作用： 如果前面有任何的 Promise 执行失败，则立即终止后面所有 promise 的执行，并 马上进入 catch 去处理 Promise中 抛出的异常；
    console.log('这是自己的处理方式：' + err.message)
  })
