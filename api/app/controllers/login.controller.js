var User = require('../models/user.model.js');
const openGeocoder = require('node-open-geocoder');
// Create and Save a new user
exports.signup = (req, res) => {
    // Validate request
    if (!req.body) {
        return res.status(400).send({
            message: "User required data can not be empty"
        });
    }
    let fetchLocationDetails;

    openGeocoder()
        .geocode(req.body.location)
        .end((err, res) => {
            //console.log(res);
            fetchLocationDetails = res;
            myCallback();
        });
    var myCallback = function () {
        // Create a user
        const user = new User({
            firstName: req.body.firstName || "John",
            lastName: req.body.lastName || "Doe",
            password: req.body.password,
            email: req.body.email,
            admin: req.body.actorType == "admin" ? 1 : 0,
            location: req.body.location || "Kolkata",
            actorType: req.body.actorType || "admin",
            longitude: fetchLocationDetails[0].lon,
            latitude: fetchLocationDetails[0].lat,
            phone: req.body.phone,
            created_at: new Date(),
            updated_at: new Date()
        });

        // Save user in the database
        user.save()
            .then(data => {
                res.send(data);
            }).catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while creating the user."
                });
            });
    };
};

// Create and Save a new user
exports.accessLogin = (req, res) => {
    // Validate request
    if (!req.body) {
        return res.status(400).send({
            message: "User required data can not be empty"
        });
    }

    /*User.findOne({email: req.body.email,
        password: req.body.password},function(err, res){
        if (err)
            return err;

        return res;
    });*/
    User.findOne({ email: req.body.email })
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the user."
            });
        });

};