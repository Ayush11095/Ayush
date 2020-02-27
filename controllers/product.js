var user = require('../model/schemas/user');
var config = require('../config/config.json')
var product = require('../model/schemas/product');
var review = require('../model/schemas/review');
var jwt_Decode = require('jwt-decode');
//proccessing product details for product collection
exports.create_product = (req,res)=>{
    var firstname;
    var lastname;
    var email;
    //recieving header
    var auth_head=req.headers['token'];
        //decoding token
        var rectify = jwt_Decode(auth_head);
        var user_id = rectify.id;
    //recieving body    
    var content = JSON.parse(req.body.toString());
            //finding user id in user db
            user.findOne({_id: user_id}, (req,docs)=>{
                if (docs!==null && docs!==undefined) {
                    if (docs.length) {
                        //inserting product details in product schema
                        var obj = new product({
                            p_name: content.p_name,
                            p_desc: content.p_desc,
                            p_image: content.p_image,
                            obj_id: user_id,
                            reviews: []
                        })
                        //saving product details in product collection
                        obj.save((err,data)=>{
                            if (!err) {
                                firstname=docs.firstname;
                                    lastname=docs.lastname;
                                    email=docs.email;
                                        res.json({
                                            success:true,
                                            message: 'product added successfully',
                                            data:{
                                                _id:content.p_id,
                                                title:content.p_name,
                                                description:content.p_desc,
                                                img_url:content.p_image,
                                                user:{
                                                firstname:firstname,
                                                lastname:lastname,
                                                email:email
                                                }
                                            }
                                        })
                            }else{
                                res.send(err);
                            }
                        })
                    }else{
                        var obj = new product({
                            p_id: content.p_id,
                            p_name: content.p_name,
                            p_desc: content.p_desc,
                            p_image: content.p_image,
                            obj_id: user_id
                        })
                        obj.save((err,data)=>{
                            if (!err) {
                                user.findOne({_id:user_id},(err,docs)=>{
                                    if (err) res.send(err);
                                    firstname=docs.firstname;
                                    lastname=docs.lastname;
                                    email=docs.email;
                                        res.json({
                                            success:true,
                                            message: 'product added successfully',
                                            data:{
                                                _id:content.p_id,
                                                title:content.p_name,
                                                description:content.p_desc,
                                                img_url:content.p_image,
                                                user:{
                                                firstname:firstname,
                                                lastname:lastname,
                                                email:email
                                                }
                                            }
                                        })
                                })
                            }else{
                                res.send(err);
                            }
                        })
                    }
                }else{
                    res.send('user does not exist');
                }
            })
}
//deleting product details from product db
exports.delete_product = (req,res)=>{
    var _id = req.params.id;
    product.deleteOne({_id: _id},function (err, doc) {
        if (doc.deletedCount === 0) {
            res.send("product does not exist");
        }else{
       res.send("product deleted");
        }
    })
}
//updating product details from product db
exports.update_product = (req,res)=>{
    var p_id = req.params.id;
    var content = JSON.parse(req.body.toString())
    product.findOneAndUpdate({_id: p_id },content,{new: true},function (err, docs) {
        if (docs === null || typeof docs === 'undefined') {
            res.send("product does not exist");
        }else {
            res.send("product updated");
        }
    })
}
//retrieving product details from product db
exports.show_user_products = (req,res)=>{
    var p_id = req.params.id;
    product.findOne({_id:p_id})
    .populate('obj_id')
    .exec()
    .then(result=>{
            res.json({
            //_id:result.obj_id,
            p_name:result.p_name,
            p_desc:result.p_desc,
            p_image:result.p_image
        })
    })
}