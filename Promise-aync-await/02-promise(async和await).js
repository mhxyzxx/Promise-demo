// 引入fs模块
const fs = require('fs')

// 1) 异步方式读取3个文件内容(产生的结果没有固定顺序)
// fs.readFile('./files/1.txt', 'utf8', function(err, data){
//   if(err) {return console.log('文件读取发生错误了：' + err)}
//   console.log(data);
// })
// fs.readFile('./files/2.txt', 'utf8', function(err, data){
//   if(err) {return console.log('文件读取发生错误了：' + err)}
//   console.log(data);
// })
// fs.readFile('./files/3.txt', 'utf8', function(err, data){
//   if(err) {return console.log('文件读取发生错误了：' + err)}
//   console.log(data);
// })

// 2) 通过函数封装文件读取的代码段(此时结果也没有固定顺序)
// function getFileCont(filename){
//   fs.readFile(filename, 'utf8', function(err, data){
//     if(err) {return console.log('文件读取发生错误了：' + err)}
//     console.log(data);
//   })
// }
// getFileCont('./files/1.txt')
// getFileCont('./files/2.txt')
// getFileCont('./files/3.txt')

//  3) Promise介入(此时结果也没有固定顺序，因为Promise没有完整介入)
// function getFileCont(filename){
//   // 实例化Promise对象，用以表示是异步操作
//   new Promise(function(){
//     // 体现异步过程
//     fs.readFile(filename, 'utf8', function(err, data){
//       if(err) {return console.log('文件读取发生错误了：' + err)}
//       console.log(data);
//     })
//   })
// }
// getFileCont('./files/1.txt')
// getFileCont('./files/2.txt')
// getFileCont('./files/3.txt')

// 4) Promise介入并丰富操作(加入成功 、失败回调)
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

// 这样写也不会保证顺序执行
// function getThreeFile() {
//     // 有可能产生错误的代码
//     var p1 = getFileCont('./files/1.txt')
//     var p2 = getFileCont('./files/2.txt')
//     var p3 = getFileCont('./files/3.txt')

//     console.log(p1) // Promise { <pending> }
//     console.log(p2) // Promise { <pending> }
//     console.log(p3) // Promise { <pending> }
// }
// getThreeFile()


// 保证各个异步操作"有序"执行
// async和await介入(ES7)
// async：修饰函数，代表当前函数是"异步"执行的
// await: 在async修饰的函数内部 修饰返回的Promise对象结果
//        那么await整体会返回的信息(p1/p2/p3)是：Promise内部successCb函数的实参
// async和await可以保证各个异步操作顺序执行
// try{}catch(){} 异常机制，可以捕获并输出错误
//                代码有错误会被catch捕捉，在try中错误地点会停止后续代码执行，执行catch中代码，
//                然后catch的后续代码还会自行
// async function getThreeFile() {
//     // 有可能产生错误的代码
//     var p1 = await getFileCont('./files/1.txt')
//     var p2 = await getFileCont('./files/2.txt')
//     var p3 = await getFileCont('./files/3.txt')

//     console.log(p1) // 111
//     console.log(p2) // 222
//     console.log(p3) // 333
// }
// getThreeFile()




// Promise(async和await)-引入错误信息的处理方法
// 保证各个异步操作"有序"执行
// async和await介入(ES7)
// async：修饰函数，代表当前函数是"异步"执行的
// await: 在async修饰的函数内部 修饰返回的Promise对象结果
//        那么await整体会返回的信息(p1/p2/p3)是：Promise内部successCb函数的实参
// async和await可以保证各个异步操作顺序执行
// try{}catch(){} 异常机制，可以捕获并输出错误
//                代码有错误会被catch捕捉，在try中错误地点会停止后续代码执行，执行catch中代码，
//                然后catch的后续代码还会执行
// 如果没有try{}catch(){} 异常机制，如果发生错误，程序就会在发生错误的地方终止了整个程序的执行，如下：
// 如果p2 = await getFileCont('./files/23333.txt')地方发生错误，从p2代码处的代码都不会再执行了
async function getThreeFile() {
    try {
        // 有可能产生错误的代码
        var p1 = await getFileCont('./files/1.txt')
        var p2 = await getFileCont('./files/23333.txt')
        var p3 = await getFileCont('./files/3.txt')
    } catch (err) {
        // err：捕捉到的错误信息
        console.log(err)
    }

    console.log(p1) // 111
    console.log(p2) // 222
    console.log(p3) // 333
}
getThreeFile()