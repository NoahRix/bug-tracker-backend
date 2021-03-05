const UserSalaryHistory = require("../models/user_salary_history.model.js");

/**
*  Makes a request to fetch all user salary histories.
*
*  @param req Request body (not used).
*  @param res Response data.
*/
exports.all = (req, res) => {
    UserSalaryHistory.all(data => {
        res.send(data);
    });
};

/**
*  Makes a request to store a new user salary to the histories.
*
*  @param req Request body (not used).
*  @param res Response data.
*/
exports.new = (req, res) => {
    UserSalaryHistory.new(req.body, data => {
        res.send(data);
    });
};
