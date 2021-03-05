const auth = require('../utils/auth');
const rt = require('../utils/RouterTools');

module.exports = app => {
    const users = require("../controllers/user.controller.js");

    app.get("/api/get/user/all", auth.middleware, users.all);
    rt.routeParams.push(null);

    app.get("/api/get/user/all-usernames", auth.middleware, users.allUsernames);
    rt.routeParams.push(null);

    app.post("/api/post/user/new", auth.middleware, users.new);
    rt.routeParams.push(["username", "password"]);
};