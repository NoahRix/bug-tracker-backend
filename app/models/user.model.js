const dbt = require("../utils/DatabaseTools.js");

/**
 *  Adds an new user to the database.
 * 
 *  @param user User object thats holder the username and password.
 *  @param result Callback to send the response data.
 */
exports.new = (user, result) => {
    console.log(user);
    dbt.execute(`INSERT INTO users(username, password) VALUES(?, ?)`, result, [user.username, user.password]);
}

/**
 *  Fetches all users from the database.
 * 
 *  @param result Callback to send the response data.
 */
exports.all = result => {
    dbt.execute(`SELECT * FROM users`, result)
}

/**
 *  Fetches all usernames from the database.
 * 
 *  @param result Callback to send the response data.
 */
exports.allUsernames = result => {
    dbt.execute(`SELECT username FROM users`, result)
}