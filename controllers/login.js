var express = require('express');
var config = require('../config/config.json');
var db_user = require('../model/schemas/user');
var bcrypt = require('bcryptjs');
//var services = require('./login_services');
var router = express.Router();
console.log(config.key)
var k_token;
var jwt = require('jsonwebtoken');
router.post('/login',(req,res)=>{

    var jsonParse = JSON.parse(req.body);
    const email = jsonParse.email;
    const password = jsonParse.password;
    reg = new db_user({
        email : email,
        password : password 
    });
    var keytoken = config.key;
    console.log(reg);
    var token=req.headers['token'];
    if (typeof token == 'undefined'){
        var token = jwt.sign({reg:reg}, config.key,{expiresIn: 60 * 60});        
        res.json({
            success :true,
            message : 'Token is generated!',
            token : token
        });
    }else{
        jwt.verify(token,config.key, (err,authData) =>{
            if(err) {
                console.log(err);
                res.sendStatus(403);
            }
            else{
                db_user.findOne({email:email}).exec()
                .then(result => {
                    if(!result)
                        res.send("Invalid Credentials.!");
                    if(result){
                        if(result.email != email)
                        {
                            // console.log(result.email);
                            console.log("User not found!");
                        }
                        bcrypt.compare(password,result.password,(err,isMatch) =>{
                            if(err) throw err;
                            if(isMatch){
                                res.json({
                                    success: true,
                                    message: 'Welcome! Authentication Successful!',
                                });
                                // console.log("Welcome! Authentication Successful!");
                            }
                            else
                                console.log("Password Mismatch");
                        });    
                    }
                })
                .catch(err => {
                    console.log(err);
                    return;
                })
            }
            })
    
        }
            //res.end();
//         db_user.findOne({email: content.email},function (err,docs) {
//             if (docs==null) {
//                 res.send('wrong email');
//             }else
//             if (!bcrypt.compareSync(content.password, docs.password)) {
//                 res.send('wrong password');
//             }else{
//             k_token = jwt.sign({id:docs._id,
//                 email:docs.email,
//             password:docs.password
//             },keytoken,{expiresIn: 60 * 60});
//             console.log(k_token);
//             success: true;
//             res.json({
//                 success: true,
//                 message: 'Token genrated Successfully',
//                 token: k_token,
//                 value: req.headers.authorization
//             });
//         }
//     })     
//  if(req.headers.authorization){
//     // console.log(req.headers.authorization);
//     // let authToken = postman.getResponseHeader("Authorization")
//     // console.log("auth header -> ", authToken)
//     // postman.setEnvironmentVariable("auth", authToken)
//    }
})

module.exports = router;