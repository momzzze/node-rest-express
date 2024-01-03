const fs=require('fs');

const readFileStream=fs.readFileSync('./input.txt','utf8');
console.log('start');
console.log(readFileStream);
console.log('end');