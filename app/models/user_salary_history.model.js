const dbt = require("../utils/DatabaseTools.js");

/**
 *  Fetches all user salary histories from the database.
 * 
 *  @param result Callback to return Bug Array.
 */
exports.all = result => {
    dbt.execute(`select * from user_salary_histories`, result);
}

/**
 *  Stores a new user salary history to the database. 
 * 
 *  @param result Callback to return Bug Array.
 */
exports.new = (ush, result) => {
    console.log("ush");
    console.log(ush);
    console.log([...Object.values(ush)]);
    dbt.execute(`INSERT INTO user_salary_histories(username, salary, date) VALUES(?, ?, ?)`, result, [...Object.values(ush)]);
}