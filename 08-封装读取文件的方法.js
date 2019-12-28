// 需求：你要封装一个方法，我给你一个要读取文件的路径，你这个方法能帮我读取文件，并把内容返回给我

const fs = require('fs')
const path = require('path')

// 第一种：
// 这是普通读取文件的方式,我们可考虑封装成一个函数
// fs.readFile(path.join(__dirname, './data/a.txt'), 'utf-8', (err, dataStr) => {
//   if (err) throw err
//   console.log(dataStr)
// })

// 第二种：
// 初衷： 给定文件路径，返回读取到的内容
// function getFileByPath(fpath) {
//   fs.readFile(fpath, 'utf-8', (err, dataStr) => {
//     if(err) throw err
//     return dataStr
//   })
// }

// var result = getFileByPath(path.join(__dirname, './data/a.txt'))
// console.log(result) // undefined
// 结果分析：之所以报undefined,是因为代码从上往下执行，执行主程序中的代码，遇到fs.readFile()异步读文件的方法，会把它放到异步对列中去，
// 然后就，继续往下执行。函数如果没有返回值，默认返回undefined。当异步执行的代码执行完了，返回了结果，但主程序已经执行结束了。所以，打印是undefined
// 怎么解决？
// 我们在异步执行结果的地方，放一个回调函数，把结果传给它，那么，我们异步函数的定义要在调用getFileByPath()传进去，在异步函数中得到异步返回的结果，如下：

// 第三种：
// function getFileByPath(fpath, callback) {
//   fs.readFile(fpath, 'utf-8', (err, dataStr) => {
//     if (err) throw err
//     callback(dataStr) // 在异步有回调的地方把结果传进去
//   })
// }

// getFileByPath(path.join(__dirname, './data/a1.txt'), (dataStr) => {
//   console.log(dataStr + '------') // 得到结果
// })
// 以上这种方法：也不好，因为如果文件有问题，方法就会读取失败，程序就会终止掉。如果一个程序经常会异常，人家会认为
// 方法不好用。最好不要trow出去：if (err) throw err，不管成功还是失败了，都应该交给用户去处理。我们不要
// throw出去，要通过方法调用传给用户去处理。

// 第四种：
// function getFileByPath(fpath, callback) {
//   fs.readFile(fpath, 'utf-8', (err, dataStr) => {
//     // 如果报错了，进入if分支后，if后面的代码就没有必要执行了,加了return
//     if (err) return callback(err)
//     callback(dataStr) // 在异步有回调的地方把结果传进去
//   })
// }

// getFileByPath(path.join(__dirname, './data/a1.txt'), (dataStr) => {
//   console.log(dataStr + '------') // 得到结果
// })
// 以上方法还是不好：因为，下面的回调函数的参数你也不知道应该传错误的还是成功的。还需要改造

// 第五种：
// 我们可以规定一下， callback 中，有两个参数，第一个参数，是 失败的结果；第二个参数是成功的结果；
// 同时，我们规定了： 如果成功后，返回的结果，应该位于 callback 参数的第二个位置，此时， 第一个位置 由于没有出错，所以，放一个 null；  如果失败了，则 第一个位置放 Error对象，第二个位置放置一个 undefined
function getFileByPath(fpath, callback) {
  fs.readFile(fpath, 'utf-8', (err, dataStr) => {
    // 如果报错了，进入if分支后，if后面的代码就没有必要执行了
    if (err) return callback(err)
    // console.log(dataStr)
    // return dataStr
    callback(null, dataStr)
  })
}

getFileByPath(path.join(__dirname, './data/a.txt'), (err, dataStr) => {
  if (err) return console.log(err.message)
  console.log(dataStr)
})
