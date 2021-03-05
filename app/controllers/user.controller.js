const User = require("../models/user.model.js");

/**
*  Makes a request to store an new user.
*
*  @param req Request body that holder a user object.
*  @param res Response data.
*/
exports.new = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Save User in the database
    User.new((req.body), data => {
        res.send(data);
    });
};

/**
*  Makes a request to fetch all users.
*
*  @param req Request body (not used).
*  @param res Response data.
*/
exports.all = (req, res) => {
    User.all(data => {
        res.send(data);
    });
};

/**
*  Makes a request to fetch all usernames.
*
*  @param req Request body (not used).
*  @param res Response data.
*/
exports.allUsernames = (req, res) => {
    User.allUsernames(data => {
        res.send(data);
    });
};
