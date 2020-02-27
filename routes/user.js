var Services = require('../controllers/user');
module.exports = function (router) {
    //this route is used to call user controller for retrieving data from user collection
router.get('/user/:user_id', function (req, res) {
    console.log(req.param);
    Services.get_user(req,res)
})
    //this route is used to call user controller to delete record from user collection
router.delete('/user/:user_id', function(req,res){
    Services.delete_user(req,res)
})
    //this route is used to call user controller to update record of particular user in user collection
router.put('/user/:user_id', function(req,res){
    Services.update_user(req,res)
})
}
