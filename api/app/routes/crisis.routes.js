module.exports = (app) => {
    const crisis = require('../controllers/crisis.controller.js');

    // Create a new Note
    app.post('/addCrisisInfo', crisis.add);

    // Retrieve all user
    //app.get('/dashboard', login.findAll);

    
}