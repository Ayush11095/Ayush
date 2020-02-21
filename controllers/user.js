var express = require('express');
var Services = require('./user_service');
var router = express.Router();
//var  app = require('../app');
router.post('/', function(req,res){
    Services.register(req,res)
})

router.get('/:user_id', function (req, res) {
    Services.get_user(req,res)
    //console.log(req.url);
})

router.get('/delete/:user_id', function(req,res){
    //console.log(req.param.user_id);
    Services.delete_user(req,res)
})

router.post('/update/:user_id', function(req,res){
    Services.update_user(req,res)
})

module.exports = router;