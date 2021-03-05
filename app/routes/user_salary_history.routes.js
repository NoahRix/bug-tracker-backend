require('dotenv').config();
const auth = require('../utils/auth');
const rt = require('../utils/RouterTools');

module.exports = app => {
    const user_salary_history = require("../controllers/user_salary_history.controller.js");
    
    app.get("/api/get/user_salary_history/all", auth.middleware, user_salary_history.all);
    rt.routeParams.push(null);

    app.post("/api/post/user_salary_history/new", auth.middleware, user_salary_history.new);
    rt.routeParams.push(["username", "salary", "date"]);
};