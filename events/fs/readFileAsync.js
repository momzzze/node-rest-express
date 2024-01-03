const fs = require('fs');

fs.readFile('./input.txt', 'utf8', (err, text) => {
    if (err) {
        console.log(err);
    }
    console.log(text);
});

console.log('start');

console.log('end');