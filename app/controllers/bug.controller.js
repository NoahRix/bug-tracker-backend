const Bug = require("../models/bug.model.js");

/**
*  Makes a request to fetch all bugs.
*
*  @param req Request body (not used).
*  @param res Response data.
*/
exports.all = (req, res) => {
    Bug.all(data => {
        res.send(data);
    });
};

/**
*  Makes a request to fetch all bugs with it's progress values.
*
*  @param req Request body (not used).
*  @param res Response data.
*/
exports.allWithProgress = (req, res) => {
    Bug.allWithProgress(data => {
        res.send(data);
    });
};

/**
*  Makes a request to fetch a bug by its id.
*
*  @param req Request body that holds the bug id.
*  @param res Response data.
*/
exports.byBugId = (req, res) => {
    Bug.byBugId(req.query.bug_id, (data) => {
        res.send(data);
    });
};

/**
*  Makes a request to fetch a bug with its cost by its id.
*
*  @param req Request body that holds the bug id.
*  @param res Response data.
*/
exports.byBugIdWithCost = (req, res) => {
    Bug.byBugIdWithCost(req.query.bug_id, (data) => {
        res.send(data);
    });
};

/**
*  Makes a request to fetch a bug with its progress by its id.
*
*  @param req Request body that holds the bug id.
*  @param res Response data.
*/
exports.byBugIdWithProgress = (req, res) => {
    Bug.byBugIdWithProgress(req.query.bug_id, (data) => {
        res.send(data);
    });
};

/**
*  Makes a request to fetch all bugs by reportee.
*
*  @param req Request body that holds the queried reportee.
*  @param res Response data.
*/
exports.byReportee = (req, res) => {
    Bug.byReportee(req.query.reportee, (data) => {
        res.send(data)
    });
};

/**
*  Makes a request to fetch all bugs by reportee with its overall progress values.
*
*  @param req Request body that holds the queried reportee.
*  @param res Response data.
*/
exports.byReporteeWithProgress = (req, res) => {
    Bug.byReporteeWithProgress(req.query.reportee, (data) => {
        res.send(data)
    });
};

/**
*  Makes a request to fetch all bugs by assignee with its overall progress values.
*
*  @param req Request body that holds the queried reportee.
*  @param res Response data.
*/
exports.byAssigneeWithProgress = (req, res) => {
    Bug.byAssigneeWithProgress(req.query.assignee, (data) => {
        res.send(data)
    });
};

/**
* 
*  Makes a request to add a new bug. If the model creates a new bug with a duplicate
*  bug_id, the model will be called again until the bug_id is unique.
*
*  @param req Holds the new bug object.
*  @param res Response data.
*
*  @note Constructing a whole new bug is under the circumstance of a duplicate bug_id acceptable in this case 
*  since the chances of a duplicate bug_id by random is (1 / 52 ^ 7 - number of bugs in the database). 
*/
exports.new = (req, res) => {
    console.log(req.body)
    Bug.new(req.body, (data) => {
        if(data.code === "ER_DUP_ENTRY")
            this.new(req, res);
        res.send(data)
    });
};

/**
*  Updates any field of a bug.
*
*  @param req Holds an object of just the bug id and report comment.
*  @param res Response data.
*/
exports.update = (req, res) => {
    Bug.update(req.body, (data) => {
        let rows_affected = data.affectedRows
        if(rows_affected > 0){
            //console.log(rows_affected + " row(s) affected.");
            //console.log(req.body.bug_id);

        }
        res.send(data)
    });
};

/**
*  Deletes a bug by its id.
*   
*  @param req Holds an object of just the bug id.
*  @param res Response data.
*/
exports.delete = (req, res) => {
    console.log(req.body);
    Bug.delete(req.body.bug_id, (data) => {
        if(data.errno == 1451){ //ER_ROW_IS_REFERENCED_2

            //Delete the referenced bug assignments first.
            require('../models/bug_assignment.model.js').deleteByBugId(req.body.bug_id, (data) => {
                console.log(data);
            });

            //Then delete the bug.
            this.delete(req, res);
        }
        else if(data.affectedRows == 0)
            res.send({err: "Bug not found."})
        else
            res.send(data);
    });
};
