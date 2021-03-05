const BugAssignment = require("../models/bug_assignment.model.js");

/**
*  Makes a request to fetch all bug assignments.
*
*  @param req Request body (not used).
*  @param res Response data.
*/
exports.all = (req, res) => {
    BugAssignment.all(data => {
        res.send(data);
    });
};

/**
*  Makes a request to fetch only the progress and bug_id values of all bug assignments.
*
*  @param req Request body (not used).
*  @param res Response data.
*/
exports.allProgressExclusive = (req, res) => {
    BugAssignment.allProgressExclusive(data => {
        res.send(data);
    });
};

/**
*  Makes a request to fetch all bug assignments including it's progress values.
*
*  @param req Request body (not used).
*  @param res Response data.
*/
exports.allProgressInclusive = (req, res) => {
    BugAssignment.allProgressInclusive(data => {
        res.send(data);
    });
};

/**
*  Makes a request to fetch bugs assignments by assignee.
*
*  @param req Request body (not used).
*  @param res Response data.
*/
exports.byAssignee = (req, res) => {
    BugAssignment.byAssignee(req.query.assignee, (data) => {
        res.send(data);
    });
};

/**
*  Makes a request to fetch bugs assignments by bug_id.
*
*  @param req Request body (not used).
*  @param res Response data.
*/
exports.byBugId = (req, res) => {
    BugAssignment.byBugId(req.query.bug_id, (data) => {
        res.send(data);
    });
};

/**
*  Makes a request to create a new bug assignment.
*
*  @param req Request body (not used).
*  @param res bug assignment object.
*/
exports.new = (req, res) => {
    BugAssignment.new(req.body, (data) => {
        res.send(data);
    });
};

/**
*  Makes a request to update an existing bug assignment.
*
*  @param req Request body, holds a bug_assignment object.
*  @param res bug assignment object.
*/
exports.update = (req, res) => {
    BugAssignment.update(req.body.bug_assignment, (data) => {
        res.send(data);
    });
};

/**
*  Makes a request to delete an existing bug assignment.
*
*  @param req Request body that holds the assignee and bug id.
*  @param res response data.
*/
exports.delete = (req, res) => {
    BugAssignment.delete(req.body, (data) => {
        res.send(data);
    });
};

/**
*  Makes a request to delete existings bug assignments based on the bug id.
*
*  @param req Request body that holds the bug id.
*  @param res response data.
*/
exports.deleteByBugId = (req, res) => {
    BugAssignment.deleteByBugId(req.body.bug_id, (data) => {
        res.send(data);
    });
};
