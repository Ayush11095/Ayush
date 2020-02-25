// var bcrypt = require('bcryptjs');
// var db_user = require('../model/schemas/user');
// var jwt = require('jsonwebtoken');
// var string = require('../config/config.json');
// exports.log_in = (req,res,token)=>{
//     // var user_token = string.token;
//     // jwt.verify(token,user_token,function(err,decoded){
//     //     if (!err) {
//             var content = JSON.parse(req.body.toString());
//             db_user.findOne({email: content.email},function (err,docs) {
//                 if (docs==null) {
//                     res.send('wrong email');
//                 }else{
//                     if (!bcrypt.compareSync(content.password, docs.password)) {
//                         res.send('wrong password');
//                     }else{
//                         console.log(docs);
//                         var token = jwt.sign({id:docs._id,firstname:docs.firstname,lastname:docs.lastname,email:docs.email},string.token,{expiresIn: 60 * 60});
//                         //console.log(bcrypt.compare(content.password, docs.password));
//                         console.log(token);
//                         success: true;
//                         res.json({
//                             success: true,
//                             message: 'Login Successfully',
//                             token: token
//                         });
//                         //res.send('user login');
//                     }
//                 }
//             })
//         // }else{
//         //     res.send('unauthorized access');
//         // }
//     }