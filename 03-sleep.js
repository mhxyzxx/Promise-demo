/**
 * 封装可以多次调用的 Promise 方法
 */
sleep(1000)
    .then(function() {
        console.log('1 秒到了')
        return sleep(2000) // 这里不是 return 的 sleep()，而是 sleep() 的执行结果
    })
    .then(function() {
        console.log('2 秒到了')
        return sleep(3000)
    })
    .then(function() {
        console.log('3 秒到了')
    })

function sleep(time) {
    return new Promise((resolve, reject) => {
        setTimeout(function() {
            resolve()
        }, time)
    })
}


// 说明：如果上面我们不使用sleep封装，等1秒执行、等2秒执行。就形成了回调地狱的问题。
// setTimeout(function () {
//   setTimeout(function () {
//     setTimeout(function () {
//       setTimeout(function () {
//         setTimeout(function () {

//         }, 5000)
//       }, 4000)
//     }, 3000)
//   }, 2000)
// }, 1000)