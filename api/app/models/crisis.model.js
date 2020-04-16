const mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var crisisSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },    
    email: String,    
    location: String,
    latitude:String,
    longitude:String,
    subject: String,
    comment: String,
    created_at:Date,
    updated_at:Date,    
});

var User = mongoose.model('Crisis', crisisSchema,'crisisData');
module.exports = User;
