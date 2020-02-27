const bcrypt = require('bcryptjs');
var db_user = require('../model/schemas/user');
//retrieving user details from user db
exports.get_user = (req,res)=>{
    var user_id = req.params.user_id;
    db_user.find({_id: user_id},function (err, data) {
    if (data === null) {
        res.send("user does not exist");
    } else {
       res.send(data);
    }
  });
}
//deleting user details from user db
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
//updating user details from user db
exports.update_user = (req,res)=>{
    var user_id = req.params.user_id;
    var content = JSON.parse(req.body.toString())
    db_user.findOneAndUpdate({_id: user_id},content,{new: true},function (err, data) {
           if (data === null || typeof data === 'undefined') {
        res.send("user does not exist");
    } else {
       res.send("user updated");
    }
      });
   }