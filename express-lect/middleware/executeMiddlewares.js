const app = require('./index');

app.use((req, res, next) => {
    req.user = 'Pesho'
    console.log('Middleware 1');
    next();
})

app.use((req, res, next) => {
    req.age = 20;
    console.log('Middleware 2');
    next();
})

app.use((req, res, next) => {
    req.isAuthenticated = true;
    console.log('Middleware 3');
    next();
})

app.execute({},{},(req,res)=>{
    console.log('Middleware cahin finished');
    console.log(req);
})