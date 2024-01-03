const fs = require('fs/promises');  //same as fs but will return promises instead of callbacks to remove possibility of callback hell

fs.readFile('./input.txt', 'utf8').then((text) => {
    console.log(text);
    fs.writeFile('./output.txt', text, 'utf-8').then(() => {
        console.log('file written');
    })
})