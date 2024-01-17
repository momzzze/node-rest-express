const express=require('express');
const handlebars=require('express-handlebars');
const path=require('path');
const app=express();

app.engine('hbs',handlebars.engine({
    extname:'hbs',
}));
app.set('view engine','hbs');
app.set('views',path.join(__dirname,'views'));

const port=5001;
app.get('/',(req,res)=>{
    res.send('Hello world');
});

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});