const db = require('../db');
const mongoose = require('mongoose');

var Schema = db.Schema({
        r_id:{type:String,require:true,trim:true},
        r_msg:{type:String,require:true,trim:true},
        r_date:{type:Date,require:true,trim:true,default:Date.now},
        p_id:{type:String,require:true,trim:true}
});

module.exports = db.model('reviewDatas',Schema);