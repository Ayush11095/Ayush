const bcrypt = require('bcryptjs');
var db_user = require('../model/schemas/user');
var db_product = require('../model/schemas/product');

exports.register = (req,res)=>{
    var content = JSON.parse(req.body.toString());
    //console.log(content);
    var obj = new db_user({
        firstname: content.firstname,
        lastname: content.lastname,
        email: content.email,
        password: bcrypt.hashSync(content.password,10)
    })
    obj.save((err,data)=>{
        if(!err){res.send('user registered')}
        else{res.send(err)}
    });
}

exports.get_user = (req,res)=>{
    var user_id = req.params.user_id;
    db_user.findOne({_id: user_id},function (err, data) {
    if (data === null) {
        res.send("user does not exist");
    } else {
       res.send(data);
    }
  });
}

exports.delete_user = (req,res)=>{
    var user_id = req.params.user_id;
    db_user.deleteOne({_id: user_id},function (err, data) {
           if (data.deletedCount === 0) {
        res.send("user does not exist");
    } else {
       res.send("user deleted");
    }
});
}

exports.update_user = (req,res)=>{
    var user_id = req.params.user_id;
    var content = JSON.parse(req.body.toString())
    db_user.findOneAndUpdate({_id: user_id},content,{new: true},function (err, data) {
           if (data === null) {
        res.send("user does not exist");
    } else {
       res.send("user updated");
    }
      });
   }