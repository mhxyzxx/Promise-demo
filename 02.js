/**
 * Pormise 实例方法 then 链式调用
 */
const fs = require('fs')

const p1 = new Promise(function(resolve, reject) { // 1. 创建 Promise 承诺容器
    fs.readFile('./data/a.txt', (err, data) => { // 2. 在容器中执行一个异步任务
        // 3. 当容器中任务
        //    成功 resolve
        //    失败 reject
        if (err) {
            reject(err) // 失败调用 reject，把错误对象传递给它
        } else {
            resolve(data) // 成功调用 resolve，如果有结果就把结果传递给它
        }
    })
})

// Promise对象可以无限次.then,下面执行结果依次输出1,2,3,4,5,6
// 以下做是无意义的
// p1
//     .then(function(data) {
//         console.log(1)
//     })
//     .then(function(data) {
//         console.log(2)
//     })
//     .then(function(data) {
//         console.log(3)
//     })
//     .then(function(data) {
//         console.log(4)
//     })
//     .then(function(data) {
//         console.log(5)
//     })
//     .then(function(data) {
//         console.log(6)
//     })

// 改变写法，如下：
// p1
//     .then(function(data) {
//         console.log(data.toString()); // hello aaa
//         return "a"
//     })
//     .then(function(data) {
//         console.log(data) // a
//         return "b"
//     })
//     .then(function(data) {
//         console.log(data) // b
//     })

// 再改变写法，如下：
// p1
//     .then(function(data) {
//         console.log(data.toString()) // hello aaa

//         // return 一个 Promise 对象的时候才有意义
//         return new Promise((resolve, reject) => {
//             resolve(123)
//         })

//         // 说明：return 123 // 返回 123、abc 没啥意义
//     })
//     .then(function(data) { // 它就是上一个 then 里面 return 的 Promise 中的 resolve 方法
//         // 如果上面的resolve()方法不调用，后面的then方法就不执行了。这是规定
//         console.log(data) //123
//         return "b"
//     })
//     .then(function(data) {
//         console.log(data) // b
//     })


// 需求：实现读a文件、2秒读b文件、3秒读c文件，优化写法，如下：
p1
    .then(function(data) {
        console.log(data.toString()) // hello aaa

        // return 一个 Promise 对象的时候才有意义
        return new Promise((resolve, reject) => {
            setTimeout(function() {
                resolve()
            }, 2000)
        })

        // return 123 // 返回 123、abc 没啥意义
    })
    .then(function(data) { // 它就是上一个 then 里面 return 的 Promise 中的 resolve 方法
        // 如果上面的resolve()方法不调用，后面的then方法就不执行了。这是规定
        // fs.readFile
        return new Promise((resolve, reject) => {
            fs.readFile('./data/b.txt', (err, data) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(data)
                }
            })
        })
    })
    .then(function(data) {
        console.log(data.toString())
        return new Promise((resolve, reject) => {
            setTimeout(function() {
                resolve()
            }, 3000)
        })
    })
    .then(function() {
        return new Promise((resolve, reject) => {
            fs.readFile('./data/c.txt', (err, data) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(data)
                }
            })
        })
    })
    .then(function(data) { // 简单理解，每一个 then 就是上一个 then 的回调
        console.log(data.toString())
    })