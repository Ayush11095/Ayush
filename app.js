const bodyParaser = require('body-parser');
const user = require('./controllers/user');
const login = require('./controllers/login');
const product = require('./controllers/product');
const review = require('./controllers/review');
module.exports = function(app){
    app.use(bodyParaser.text())
    app.use('/api/user',user);
    app.use('/api/auth',login);
    app.use('/api/product',product);
    //app.use('/api/review',review);
    app.all('*',(req,res)=>{
        res.send('invalid url');
    });}