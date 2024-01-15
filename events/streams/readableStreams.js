const fs = require('fs');
const path = require('path');


// const readStream = fs.createReadStream('./index.txt',{
//     encoding: 'utf8',
//     highWaterMark: 11000

// });

// readStream.on('data', (chunk) => {
//     console.log('-----NEW CHUNK-----');
//     console.log(chunk);
// });


// readStream.on('end', () => {
//     console.log('Finished reading file');
// });
console.log(__dirname);
const readableStream=fs.createReadStream(__dirname + '/input.txt',{
    encoding: 'utf8',
} )

readableStream.on('data',(chunk)=>{
    console.log(chunk);
})
readableStream.on('end',()=>{
    console.log('finished reading file');
})

console.log('sync code');

