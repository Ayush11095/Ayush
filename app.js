const bodyParaser = require('body-parser');
const user = require('./controllers/user');
const login = require('./controllers/login');
const product = require('./controllers/product');
const review = require('./controllers/review');
module.exports = function(app){
    app.use(bodyParaser.text());
    app.use('/api/auth',user);
    app.use('/api/auth',login);
    const checkAuth = (req, res, next) => {
        var auth_head=req.headers['token'];
        console.log(auth_head);
        if (typeof auth_head==='undefined') {
            return res.status(403).json({ error: 'No credentials sent!' });
        }
        // check valid
        console.log(req.headers['token']);
        next();
    };
    app.use(checkAuth);
    app.use('/api/product',product);
    app.use('/api/review',review);
    app.all('*',(req,res)=>{
        res.send('invalid url');
    });
}