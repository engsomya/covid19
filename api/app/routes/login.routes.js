module.exports = (app) => {
    const login = require('../controllers/login.controller.js');

    // Create a new Note
    app.post('/signup', login.signup);

    // Retrieve all user
    //app.get('/dashboard', login.findAll);

    
}