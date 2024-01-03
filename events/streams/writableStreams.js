const fs = require('fs');


const writeStream = fs.createWriteStream('./output.txt');

writeStream.write('Hello');
writeStream.write('chunk2');
writeStream.write('chunk3');
writeStream.end();