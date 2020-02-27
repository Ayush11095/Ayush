var express = require('express');
var jwt_Decode = require('jwt-decode');
var db_user=require('../model/schemas/user');
var jwt=require('jsonwebtoken');
var auth = require('../controllers/auth');
var config = require('../config/config.json');
var router = express.Router();
//this route is used to call auth controller for login request
router.post('/auth/login', function (req,res) {
    auth.login(req,res)
});
//this route is used to call auth controller to register record in users collection
router.post('/auth/register', function(req,res){
    auth.register(req,res)
});
//here we are calling user router
require('./user')(router);
//here we are authenticating that server is valid or not for accessing product and reviews module
    const checkAuth = (req, res, next) => {
        //recieving header
        var auth_head=req.headers['token'];
        //executes when header is undefined
        if (typeof auth_head==='undefined') {
            return res.status(403).json({ error: 'No credentials sent!' });
        }
        //executes when header is given
        else{
            //decoding token
        var rectify = jwt_Decode(auth_head);
            if (typeof auth_head!=='undefined') {
                //verifying for valid token
                jwt.verify(auth_head,config.key, (err,authData) =>{
                if(err) {
                    console.log(err);
                    res.sendStatus(403);
                }
                else{
                    db_user.findOne({_id:rectify.id}).exec()
                    .then(result => {
                        if(!result){
                            res.send("Invalid Credentials.!");
                        }else{
                            next();
                        }
                    })
                    .catch(err => {
                        console.log(err);
                        return;
                    })
                }
                })
    }
        }
    }
router.use(checkAuth);
//here we are calling product router
require('./product')(router);
//here we are calling review router
require('./review')(router);
module.exports = router;