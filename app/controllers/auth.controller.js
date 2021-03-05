

const Auth = require("../models/auth.model.js");
 
/**
 *  This returns true if an insert, update, or delete statement was successful.
 *  @depricated Possibly will remove this due to chance of not needing OkPackets anymore. 
 */
const implementsOkPacket = (o) => {
    return (
        o.fieldCount !== null &&
        o.affectedRows !== null &&
        o.insertId !== null &&
        o.serverStatus !== null &&
        o.warningCount !== null &&
        o.message !== null &&
        o.protocol41 !== null &&
        o.changedRows !== null
    )
}

/**
*  Makes a request to log the user in. Successful attempt will respond
*  an access token.
*
*  @param req Request body that hold username and password input.
*  @param res Response data.
*/
exports.login = (req, res) => {
    Auth.login(req.body, (data) => {
        res.send(data);
    });
}

/**
*  Makes a request to register a new user. 
*  Successful attempt will respond with an okay message. 
*  Duplicate user will repsond an appropriate message.
*
*  @param req Request body that hold new username and password input.
*  @param res Response data.
*/
exports.register = (req, res) => {
    Auth.register(req.body, (data) => {
        if (data instanceof Error)
            console.log("Error!");
        else if (implementsOkPacket(data))
            console.log("Success!");
        res.send(data);
    });
}

/**
*  Makes a request to log a user out and kills their access token. 
*
*  @param req Request body that holds the user's token.
*  @param res Response data.
*/
exports.logout = (req, res) => {
    Auth.logout(req.body.username, (data) => {
        res.send(data);
    })
}

/**
*  Makes a request to refresh the user's access token by providing 
*  a valid refresh token. 
*
*  @param req Request body that holds the user's refresh token.
*  @param res Response data.
*/
exports.token = (req, res) => {
    Auth.token(req.body.token, (data) => {
        res.send(data);
    })
}
