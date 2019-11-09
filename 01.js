const fs = require('fs')

/**
 * Promise 使用
 * Promise 就是承诺、许诺、保证 I promise you.
 * 承诺一件事儿
 *   可能完成
 *   可能完不成
 *
 * 程序中
 *   Promise 一个承诺容器(有三个状态)
 *   在承诺中执行一个**异步**任务，默认是 Pending 执行中的状态
 *   承诺中的任务
 *     可能成功 resolved
 *     可能失败 rejected
 */


/**
 * 第一步：使用 Promise 封装异步任务的执行：
 *   1. 创建 Promise 承诺容器
 *   2. 在容器中执行一个异步任务
 *   3. 当容器中任务
 *     成功 resolve
 *     失败 reject
 * Promise 是 ECMAScript 6 新增的一个 API
 */
const p1 = new Promise(function(resolve, reject) { // 1. 创建 Promise 承诺容器
    fs.readFile('./data/a.txt', (err, data) => { // 2. 在容器中执行一个异步任务
        // 3. 当容器中任务
        //    成功 resolve
        //    失败 reject
        if (err) {
            reject(err) // 失败调用 reject，把错误对象传递给它
        } else {
            resolve(data) // 成功调用 resolve，如果有结果就把结果传递给它
                // 说明：我们这里只包装不使用，不会在这写异步执行的代码的，否则，又会回到之前异步回调地狱的问题
        }
    })
})


/**
 * 第二步：获取承诺中异步任务的执行结果
 * Promise 实例有一个 then 方法
 * then 方法接收两个参数
 *   参数1：resolve 函数，
 *   参数2：reject 函数（可选）
 */
p1
    .then(function(data) { // resolve 函数
        console.log('resolve => ', data)
    }, function(err) { // reject 函数
        console.log('reject => ', err)
    })