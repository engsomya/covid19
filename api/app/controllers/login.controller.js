const User = require('../models/user.model.js');

// Create and Save a new user
exports.signup = (req, res) => {
    // Validate request
    if (!req.body) {
        return res.status(400).send({
            message: "User required data can not be empty"
        });
    }
    // Create a user
    const user = new User({
        firstName: req.body.firstName || "John",
        lastName: req.body.lastName || "Doe",
        password: req.body.password,
        email: req.body.email,
        admin: 1,
        location: "Kolkata",
        actorType: "Actor 1",
        phone: "123456789",
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

