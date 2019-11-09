const fs = require('fs')

// 1. 创建一个普通方法
function readFile(filePath) { // 根据需要定义参数
    // 2. 上来创建 Promise 容器
    const ppp = new Promise((resolve, reject) => {
        // 3. 执行异步操作（定时器、读文件、写文件、ajax 请求、....）
        fs.readFile(filePath, (err, data) => {
            // 4. 成功 resolve，失败 reject
            //   if (err) {
            //     reject(err) // 失败调用 reject，把错误对象传递给它
            // } else {
            //     resolve(data) // 成功调用 resolve，如果有结果就把结果传递给它
            // }
            // 使用三元表达式简化代码
            err ? reject(err) : resolve(data)
        })
    })

    // 5. 返回 Promise 容器对象
    return ppp
}

// 封装的一个Promise版的定时器
function sleep(time) {
    return new Promise((resolve, reject) => {
        setTimeout(function() {
            resolve()
        }, time)
    })
}

// 需求：等1秒读a文件，等2秒读b文件，等3秒读c文件
// 使用async和await,让代码更简洁，让异步代码看起来像同步代码，我们不用通过.then的方法来得到结果
// 使用async和await的前提是要有Promise对象
async function main() {
    await sleep(1000)
    const dataA = await readFile('./data/a.txt')
    console.log(dataA.toString())
    await sleep(2000)
    const dataB = await readFile('./data/b.txt')
    console.log(dataB.toString())
    await sleep(3000)
    const dataC = await readFile('./data/c.txt')
    console.log(dataC.toString())
}

main()