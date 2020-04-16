const Crisis = require('../models/crisis.model.js');
const fs = require('fs');
const path = require('path');
const openGeocoder = require('node-open-geocoder');
// Create and Save a new crisis
exports.add = (req, res) => {
    // Validate request
    if (!req.body) {
        return res.status(400).send({
            message: "Crisis required data can not be empty"
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
        const crisis = new Crisis({
            firstName: req.body.firstName || "John",
            lastName: req.body.lastName || "Doe",
            email: req.body.email,
            subject: req.body.subject,
            comment: req.body.comment,
            location: req.body.location || "Kolkata",
            longitude: fetchLocationDetails[0].lon,
            latitude: fetchLocationDetails[0].lat,
            created_at: new Date(),
            updated_at: new Date()
        });

        let appDir = path.dirname(require.main.filename);
        var obj = {
            table: []
        };
        console.log(crisis)
        let rawdata = fs.readFileSync(appDir + '/mockJson/insertCrisisInfoData.json');

        oldData = JSON.parse(rawdata); //convert it back to json

        obj = (oldData); //now its an object

        obj.table.push(crisis); //add some data
        json = JSON.stringify(obj); //convert it back to json

        fs.writeFileSync(appDir + '/mockJson/insertCrisisInfoData.json', json); // write it back 
    };



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

