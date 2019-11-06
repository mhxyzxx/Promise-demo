const fs = require('fs');
setTimeout(function() {
    fs.readFile('./data/a.txt', 'utf8', (err, retA) => {
        if (err) {
            throw err
        }
        console.log(retA);
        setTimeout(function() {
            fs.readFile('./data/b.txt', 'utf8', (err, retB) => {
                if (err) {
                    throw err
                }
                console.log(retB);
                setTimeout(function() {
                    fs.readFile('./data/c.txt', 'utf8', (err, retC) => {
                        if (err) {
                            throw err
                        }
                        console.log(retC);
                        // 把读到的三个文件汇总到一个d.txt文件中
                        const data = retA + retB + retC;
                        setTimeout(function() {
                            fs.writeFile('./data/e.txt', data, err => {
                                if (err) {
                                    throw err
                                }
                                console.log('success');
                            })
                        }, 4000)
                    })
                }, 3000)
            })
        }, 2000)
    })
}, 1000)