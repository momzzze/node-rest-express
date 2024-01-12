const path=require('path');
// console.log(__dirname);
// console.log(__filename);
console.log(path.basename(__dirname));  // pathModule
// console.log(path.basename(__filename)); // index.js
// console.log(path.extname(__dirname));  // empty
console.log(path.extname(__filename));  // .js
// console.log(path.parse(__dirname));
console.log(path.parse(__filename));
console.log(path.format(path.parse(__filename)));
console.log(path.isAbsolute(__filename));
console.log(path.isAbsolute('./index.js'));
console.log(path.join('folder1','folder2','folder3','index.js'));
console.log(path.isAbsolute(path.join(__dirname,'index.js')));


