const Crisis = require('../models/crisis.model.js');
const fs = require('fs');
const data = require('../../mockJson/insertCrisisInfoData.json');
// Create and Save a new user
exports.add = (req, res) => {
    // Validate request
    if (!req.body) {
        return res.status(400).send({
            message: "Crisis required data can not be empty"
        });
    }
    // Create a user
    const crisis = new Crisis({
        firstName: req.body.firstName || "John",
        lastName: req.body.lastName || "Doe",
        email: req.body.email,
        subject: req.body.subject,
        comment: req.body.comment,
        location: req.body.location || "Kolkata",
        created_at: new Date(),
        updated_at: new Date()
    });
    
    console.log(data);
    // Save user in the database
    /*crisis.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the user."
            });
        });*/
};

