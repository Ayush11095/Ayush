var bcrypt = require('bcryptjs');
var db_user = require('../model/schemas/user');
var jwt = require('jsonwebtoken');

exports.log_in = (req,res,token)=>{
    jwt.verify(token, 'supersecret',function(err,decoded){
        if (!err) {
            var content = JSON.parse(req.body.toString());
            db_user.findOne({email: content.email},function (err,docs) {
                if (docs==null) {
                    res.send('wrong email');
                }else{
                    if (!bcrypt.compareSync(content.password, docs.password)) {
                        res.send('wrong password');
                    }else{
                        //console.log(bcrypt.compare(content.password, docs.password));
                        res.send('user login');
                    }
                }
            })
        }else{
            res.send('unauthorized access');
        }
    })
}