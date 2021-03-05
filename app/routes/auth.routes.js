const rt = require('../utils/RouterTools');

module.exports = app => {
    const auth = require("../controllers/auth.controller.js");
    
    app.post('/api/post/auth/login', auth.login);
    rt.routeParams.push(["username", "password"]);
    
    app.post('/api/post/auth/register', auth.register);
    rt.routeParams.push(["username", "password"]);
    
    app.post('/api/post/auth/logout', auth.logout);
    rt.routeParams.push(["username"]);
    
    app.post('/api/post/auth/token', auth.token);
    rt.routeParams.push(["token"]);
}