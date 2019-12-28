// 需求：你要封装一个方法，我给你一个要读取文件的路径，你这个方法能帮我读取文件，并把内容返回给我

const fs = require('fs')
const path = require('path')


function getFileByPath(fpath, succCb, errCb) {
  fs.readFile(fpath, 'utf-8', (err, dataStr) => {
    if (err) return errCb(err)
    succCb(dataStr)
  })
}
// 测试：封装的函数的功能是否正确
// getFileByPath(path.join(__dirname, './data/a.txt'), function (data) {
//   console.log(data + '娃哈哈，成功了！！！')
// }, function (err) {
//   console.log('失败的结果，我们使用失败的回调处理了一下：' + err.message)
// })

// 需求： 先读取文件a，再读取文件a，最后再读取文件c
// 分析：以下代码的执行顺序都是a->b->c
// 这是node中读文件有三种方式，一种是并排的读文件，不嵌套，那么，他们的执行顺序是可变的。读取速度很快，但不能保证顺序。
// 那么，我们想按顺序读文件，又不想阻塞cup,可嵌套执行。
// 缺点：一层套一层，如果代码多了，就不好阅读了，容易出错。我们把这种称为“回调地狱”
// 怎么解决回调地狱的问题：
// 使用 ES6 中的 Promise，来解决 回调地狱的问题；
// 问： Promise 的本质是要干什么的：就是单纯的为了解决回调地狱问题；并不能帮我们减少代码量；

getFileByPath(path.join(__dirname, './data/a.txt'), function (data) {
  console.log(data)

  getFileByPath(path.join(__dirname, './data/b.txt'), function (data) {
    console.log(data)

    getFileByPath(path.join(__dirname, './data/c.txt'), function (data) {
      console.log(data)
    })
  })
})