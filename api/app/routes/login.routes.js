module.exports = (app) => {
    const login = require('../controllers/login.controller.js');

    // Create a new Note
    app.post('/signup', login.signup);

    app.post('/login', login.accessLogin);

    // Retrieve all user
    //app.get('/dashboard', login.findAll);

    
}