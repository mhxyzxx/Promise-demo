// 引入fs模块
const fs = require('fs')

// 1) 异步方式读取3个文件内容(产生的结果没有固定顺序)
// fs.readFile('./files/1.txt', 'utf8', function(err, data) {
//     if (err) { return console.log('文件读取发生错误了：' + err) }
//     console.log(data);
// })
// fs.readFile('./files/2.txt', 'utf8', function(err, data) {
//     if (err) { return console.log('文件读取发生错误了：' + err) }
//     console.log(data);
// })
// fs.readFile('./files/3.txt', 'utf8', function(err, data) {
//     if (err) { return console.log('文件读取发生错误了：' + err) }
//     console.log(data);
// })

// 2) 通过函数封装文件读取的代码段(此时结果也没有固定顺序)
// function getFileCont(filename) {
//     fs.readFile(filename, 'utf8', function(err, data) {
//         if (err) { return console.log('文件读取发生错误了：' + err) }
//         console.log(data);
//     })
// }
// getFileCont('./files/1.txt')
// getFileCont('./files/2.txt')
// getFileCont('./files/3.txt')

//  3) Promise介入(此时结果也没有固定顺序，因为Promise没有完整介入)
// function getFileCont(filename) {
//     // 实例化Promise对象，用以表示是异步操作
//     new Promise(function() {
//         // 体现异步过程
//         fs.readFile(filename, 'utf8', function(err, data) {
//             if (err) { return console.log('文件读取发生错误了：' + err) }
//             console.log(data);
//         })
//     })
// }
// getFileCont('./files/1.txt')
// getFileCont('./files/2.txt')
// getFileCont('./files/3.txt')

// 4) Promise介入并丰富操作(加入成功、 失败回调，按顺序执行)

function getFileCont(filename) {
    // 实例化Promise对象，用以表示是异步操作
    // new Promise(function(successCb函数, errorCb函数){})
    // successCb：当前异步操作是ok情况下就触发执行successCb
    // errorCb：当前异步操作发生错误情况(出乎意料)下就触发执行errorCb  callback
    return new Promise(function(successCb, errorCb) {
        // 体现异步过程
        fs.readFile(filename, 'utf8', function(err, data) {
            if (err) {
                // 把错误信息当做“实参”传递给errorCb函数
                // return是结束代码执行作用
                return errorCb('文件读取发生错误了：' + err) // 函数调用
            }
            // 所有操作都ok情况下的正常处理，把处理后的结果当做"实参"传递给successCb函数
            successCb(data) // 函数调用
        })
    })
}

// 如果发生错误，它会执行errorCb这个回调函数，它是可选参数，会给我们返回一大坨错误信息(不好看错误)
// 此时，我们可以在所有的then方法的最后只添加一个.catch()回调函数，我们就可显示出我们自定义的错误信息。
// 只要上面的then()方法，有任何一方发生错误，都可被.catch()函数接收。
getFileCont('./files/1.txt')
    .then(function(result) {
        // result:是successCb实参结果
        console.log(result)
            // 使得外部的then方法接收到一个实实在在的2.txt文件读取的Promise对象
        return getFileCont('./files/2.txt')
    })
    .then(function(result) {
        console.log(result)
        return getFileCont('./files/31.txt')
    })
    .then(function(result) {
        console.log(result)
    })
    .catch(function(err) {
        // 任何异步调用有错误，都可以被catch接收
        console.log(err)
    })