const fs = require('fs')

// 1. 创建一个普通方法
function readFile(filePath) { // 根据需要定义参数
    // 2. 上来创建 Promise 容器
    const ppp = new Promise((resolve, reject) => {
        // 3. 执行异步操作（定时器、读文件、写文件、ajax 请求、....）
        fs.readFile(filePath, (err, data) => {
            // 4. 成功 resolve，失败 reject
            err ? reject(err) : resolve(data)
        })
    })

    // 5. 返回 Promise 容器对象
    return ppp
}

// 测试一个使用Promise封装的一个读文件的方法
// readFile('./data/a.txt')
//     .then(function(data) {
//         console.log(data.toString()); // hello aaa
//     })

// 封装的一个Promise版的定时器
function sleep(time) {
    return new Promise((resolve, reject) => {
        setTimeout(function() {
            resolve()
        }, time)
    })
}

// 需求：等1秒读a文件，等2秒读b文件，等3秒读c文件
sleep(1000)
    .then(function() {
        console.log('1 秒到了')
        return readFile('./data/a.txt')
    })
    .then(function(data) {
        console.log('a文件读取到了 => ', data.toString())
        return sleep(2000)
    })
    .then(function() {
        console.log('2 秒到了')
        return readFile('./data/b.txt')
    })
    .then(function(data) {
        console.log('b文件读取到了 => ', data.toString())
        return sleep(3000)
    })
    .then(function() {
        console.log('3 秒到了')
        return readFile('./data/c.txt')
    })
    .then(function(data) {
        console.log(data.toString())
        console.log('The end.')
    })