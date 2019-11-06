const fs = require('fs');
fs.readFile('./data/a.txt', 'utf8', (err, ret) => {
    if (err) {
        throw err
    }
    console.log(ret);
    fs.readFile('./data/b.txt', 'utf8', (err, ret) => {
        if (err) {
            throw err
        }
        console.log(ret);
        fs.readFile('./data/c.txt', 'utf8', (err, ret) => {
            if (err) {
                throw err
            }
            console.log(ret);
        })
    })
})