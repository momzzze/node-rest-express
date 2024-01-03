const fs = require('fs');

const readStream = fs.createReadStream('./index.txt',{
    encoding: 'utf8',
    highWaterMark: 11000

});

readStream.on('data', (chunk) => {
    console.log('-----NEW CHUNK-----');
    console.log(chunk);
});


readStream.on('end', () => {
    console.log('Finished reading file');
});

console.log('sync code');