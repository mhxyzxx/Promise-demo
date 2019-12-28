// 需求：你要封装一个方法，我给你一个要读取文件的路径，你这个方法能帮我读取文件，并把内容返回给我

const fs = require('fs')
const path = require('path')


function getFileByPath(fpath, succCb, errCb) {
  fs.readFile(fpath, 'utf-8', (err, dataStr) => {
    if (err) return errCb(err)
    succCb(dataStr)
  })
}

getFileByPath(path.join(__dirname, './data/a.txt'), function (data) {
  console.log(data + '娃哈哈，成功了！！！')
}, function (err) {
  console.log('失败的结果，我们使用失败的回调处理了一下：' + err.message)
})