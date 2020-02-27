const db = require('../db');
const mongoose = require('mongoose');
/**
 * ReviewSchema
 */
var Schema = db.Schema({
        r_msg:{type:String,require:true,trim:true},
        r_date:{type:Date,require:true,trim:true,default:Date.now},
        p_id:{type:String,require:true,trim:true}
});

module.exports = db.model('review',Schema);