const express=require('express');
const app=express();


app.get('/',(req,res)=>{
    res.header({
        'Content-Type':'text/plain'    
    })
    res.status(200).send('<h1>Hello World</h1>');
    // res.end();
})
app.get('/cats',(req,res)=>{
    
    res.send('<h1>Cats page</h1>');
    // res.end();
})
app.listen(5000);
console.log('Server is running on port 5000...');

