// api initialized from here using route we can access whole api by it's url.
const bodyParaser = require('body-parser');
var routes=require('./routes/index');
module.exports = function(app){
    app.use(bodyParaser.text());
    app.use('/api',routes);
    app.all('*',(req,res)=>{
        res.send('invalid url');
    });
}