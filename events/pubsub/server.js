const http=require('http');
const messageBroker=require('./messageBroker');

require('./logger');
require('./reportingService');

const server=http.createServer((req,res)=>{
    messageBroker.publish('request',`URL: ${req.url}; METHOD: ${req.method}`)
    // messageBroker.publish('request',`URL: ${req.url}; METHOD: ${req.method}`)
    if(req.url==='/register'){
        messageBroker.publish('user-register',{username:'John'})
    }
    res.end();
});

server.listen(5050)
console.log(`Server is running on port 5050`);