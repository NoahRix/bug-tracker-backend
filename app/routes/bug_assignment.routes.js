require('dotenv').config();
const auth = require('../utils/auth');
const rt = require('../utils/RouterTools');

module.exports = app => {
    const bug_assignment = require("../controllers/bug_assignment.controller.js");
    
    app.get("/api/get/bug_assignment/all", auth.middleware, bug_assignment.all);
    rt.routeParams.push(null);
    
    app.get("/api/get/bug_assignment/all-progress-exclusive", auth.middleware, bug_assignment.allProgressExclusive);
    rt.routeParams.push(null);

    app.get("/api/get/bug_assignment/all-progress-inclusive", auth.middleware, bug_assignment.allProgressInclusive);
    rt.routeParams.push(null);
    
    app.get("/api/get/bug_assignment/by-assignee", auth.middleware, bug_assignment.byAssignee);
    rt.routeParams.push(["assignee"]);

    app.get("/api/get/bug_assignment/by-bug-id", auth.middleware, bug_assignment.byBugId);
    rt.routeParams.push(["bug_id"]);

    app.post("/api/post/bug_assignment/new", auth.middleware, bug_assignment.new);
    rt.routeParams.push(["assignee", "bug_id", "dt_start", "dt_end", "progress", "role"]);

    app.post("/api/post/bug_assignment/update", auth.middleware, bug_assignment.update);
    rt.routeParams.push(["dt_start", "dt_end", "progress", "role", "bug_id", "assignee"]);

    app.post("/api/post/bug_assignment/delete", auth.middleware, bug_assignment.delete);
    rt.routeParams.push(["assignee", "bug_id"]);

    app.post("/api/post/bug_assignment/delete-by-bug-id", auth.middleware, bug_assignment.deleteByBugId);
    rt.routeParams.push(["bug_id"]);
};