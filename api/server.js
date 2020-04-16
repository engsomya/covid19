const express = require('express');
//const MongoClient = require('mongodb').MongoClient;
var mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const port = 8000;

app.use(bodyParser.urlencoded({
    extended: true
}));
// parse application/json
app.use(bodyParser.json());
app.use(function (req, res, next) {

    res.header("Access-Control-Allow-Origin", "*");

    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    next();

});
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/cDatabase', {
    useNewUrlParser: true
    //useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connected to the database");        
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

require('./app/routes/login.routes')(app, {});
require('./app/routes/crisis.routes')(app, {});
 app.listen(port, () => {
    console.log('We are live on ' + port);
});