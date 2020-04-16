const mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var userSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    password: { type: String, required: true },
    email: String,
    admin: Boolean,
    location: String,
    latitude: String,
    longitude: String,
    phone: String,
    actorType: String,
    created_at: Date,
    updated_at: Date
});

var User = mongoose.model('User', userSchema,'userData');
module.exports = User;

