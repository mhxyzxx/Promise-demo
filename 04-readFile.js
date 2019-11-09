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

readFile('./data/a.txt')
    .then(function(data) {
        console.log(data.toString()); // hello aaa
    })