require('dotenv').config();
const auth = require('../utils/auth');
const rt = require('../utils/RouterTools');

module.exports = app => {
    const bug = require("../controllers/bug.controller.js");
    
    app.get("/api/get/bug/all", auth.middleware, bug.all);
    rt.routeParams.push(null);
    
    app.get("/api/get/bug/all-with-progress", auth.middleware, bug.allWithProgress);
    rt.routeParams.push(null);    

    app.get("/api/get/bug/by-bug-id", auth.middleware, bug.byBugId);
    rt.routeParams.push(["bug_id"]);    

    app.get("/api/get/bug/by-bug-id-with-cost", auth.middleware, bug.byBugIdWithCost);
    rt.routeParams.push(["bug_id"]);    

    app.get("/api/get/bug/by-bug-id-with-progress", auth.middleware, bug.byBugIdWithProgress);
    rt.routeParams.push(["bug_id"]);    
    
    app.get("/api/get/bug/by-reportee", auth.middleware, bug.byReportee);
    rt.routeParams.push(["reportee"]);

    app.get("/api/get/bug/by-reportee-with-progress", auth.middleware, bug.byReporteeWithProgress);
    rt.routeParams.push(["reportee"]);

    app.get("/api/get/bug/by-assignee-with-progress", auth.middleware, bug.byAssigneeWithProgress);
    rt.routeParams.push(["assignee"]);

    app.post("/api/post/bug/new", auth.middleware, bug.new);
    rt.routeParams.push(["type", "dt_reported", "report_comment", "reportee"]);
    
    app.post("/api/post/bug/update", auth.middleware, bug.update);
    rt.routeParams.push(["bug_id", "report_comment"]);  

    app.post("/api/post/bug/delete", auth.middleware, bug.delete);
    rt.routeParams.push(["bug_id"]);  
};