var db_review = require('../model/schemas/review');
var db_product = require('../model/schemas/product');

exports.create_review = (req,res)=>{
    var content = JSON.parse(req.body.toString())
    db_product.findOne({p_id: req.params.p_id},function(err,docs){
        if(docs!== null){
            var obj = new db_review({
                r_id: content.r_id,
                r_msg: content.r_msg,
                p_id: req.params.p_id
            })
            obj.save((err,data)=>{
                if(!err){res.send('review added')}
                else{res.send('review does not added')}
            })
        }
        else{
        res.send('product not exist')
        }
    })
}

exports.update_review = (req,res)=>{
    var content = JSON.parse(req.body.toString()); 
    db_review.findOneAndUpdate({r_id:req.params.id,p_id: req.params.p_id},content,{new: true},function (err, doc) {
        if (doc === null) {
        res.send("product review or review id not exist");
        }else {
        res.send("review updated");
        }
    })
}

exports.delete_review = (req,res)=>{
    db_review.deleteOne({r_id:req.params.id,p_id: req.params.p_id},function (err, docs) {
        if (docs.deletedCount === 0){
        res.send("product review or review id not exist");
        } else {
        res.send("review deleted");
        }
    })
}

exports.show_product_reviews = (req,res)=>{
    var p_id = req.params.p_id
    db_review.find({p_id : p_id},function(err,docs){
       if(docs.length){
           res.send(docs);
       }       
       else{
           res.send('no review for this user product')
       }
    })
}