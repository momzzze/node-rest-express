const fs = require('fs');


const readStream = fs.createReadStream('./index.txt')
const writeStream = fs.createWriteStream('./output.txt')

readStream.pipe(writeStream)
