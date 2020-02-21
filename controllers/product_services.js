var user = require('../model/schemas/user');
var product = require('../model/schemas/product');
var review = require('../model/schemas/review');

exports.create_product = (req,res)=>{
    var user_id =req.params.user_id;
    var content = JSON.parse(req.body.toString());

    product.findOne({p_id: content.p_id}, (err,docs)=>{
        if (docs===null || docs===undefined) {
            db_user.findOne({_id: u_id}, (req,docs)=>{
                if (docs!==null && docs!==undefined) {
                 review.find({p_id: content.p_id}, (req,res)=>{
                    if (docs.length) {
                        var obj = new product({
                            p_id: content.p_id,
                            p_name: content.p_name,
                            p_desc: content.p_desc,
                            p_image: content.p_image,
                            obj_id:req.params.u_id,
                            reviews: docs
                        })
                        obj.save((err,data)=>{
                            if (!err) {
                                res.send('product added')
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
                            obj_id:req.params.u_id,
                            reviews: []
                        })
                        obj.save((err,data)=>{
                            if (!err) {
                                res.send('product added')
                            }else{
                                res.send(err);
                            }
                        })
                    }
                 })   
                }else{
                    res.send('user does not exist');
                }
            })
        }else{
            res.send('product already exist');
        }
    })
}

exports.delete_product = (req,res)=>{ 
    var p_id = req.params.id
    product.deleteOne({p_id: p_id},function (err, doc) {
        if (doc.deletedCount === 0) {
            res.send("product does not exist");
        }else{
       res.send("product deleted");
        }
    })
}

exports.update_product = (req,res)=>{
    var p_id = req.params.id
    var content = JSON.parse(req.body.toString())
    product.findOneAndUpdate({p_id: p_id },content,{new: true},function (err, docs) {
        if (docs === null) {
            res.send("product does not exist");
        }else {
            res.send("product updated");
        }
    })
}

exports.show_user_products = (req,res)=>{
    var user_id = req.params.user_id;
    product.find({obj_id : user_id},function(err,docs){
       if(docs.length){
           res.send(docs);
       }       
       else{
           res.send('no product for this user');
       }
    })
}