const dbt = require("../utils/DatabaseTools.js");

/**
 *  Fetches all bugs assignments from the database.
 * 
 *  @param result Callback to return Bug Assignment Array.
 */
exports.all = (result) => {
    dbt.execute(`select * from bug_assignments`,  result);
}

/**
 *  Fetches all bug_assignments, excluding all bug properties except for the bug id, and includes the progress value.
 * 
 *  @param result Callback to return progress (int), bug_id (string) object Array.
 */
exports.allProgressExclusive = result => {
    dbt.execute(
        `SELECT bug_assignments.progress, 
         bugs.bug_id 
         FROM bugs 
         LEFT JOIN bug_assignments  
         ON bug_assignments.bug_id = bugs.bug_id`,
        result);
}

/**
 *  Fetches the all of the bug_assignments and includes the progress values.
 * 
 *  @param result Callback to return progress (int), bug_id (string) object Array.
 */
exports.allProgressInclusive = result => {
    dbt.execute(`SELECT * from bug_assignments`, result);
}

/**
 *  Fetches all bugs assignments by bug_id from the database.
 * 
 *  @param assignee assignee of the bug assignment.
 *  @param result Callback to return Bug Assignment Array.
 */
exports.byAssignee = (assignee, result) => {
    dbt.execute(`select * from bug_assignments where assignee = ?`, result, [assignee]);
}

/**
 *  Fetches all bugs assignments by bug_id from the database.
 * 
 *  @param bug_id Bug ID of the bug assignment.
 *  @param result Callback to return Bug Assignment Array.
 */
exports.byBugId = (bug_id, result) => {
    console.log("bug_id: " + bug_id);
    dbt.execute(`select * from bug_assignments where bug_id = ?`, result, [bug_id]);
}

/**
 *  Adds a new bug assignment to the database.
 * 
 *  @param _bug_assignment Bug assignment object.
 *  @param result Callback to return sql server status messages.
 */
exports.new = (_bug_assignment, result) => {
    dbt.execute(
        `insert into bug_assignments(assignee, bug_id, dt_start, dt_end, progress, role) values(?, ?, ?, ?, ?, ?)`,
        result,
        Object.values(_bug_assignment)
    );    
}

/**
 *  Updates an existing bug assignment.
 * 
 *  @param bug_assignment bug assignment object.
 *  @param result Callback to return sql server status messages.
 */
exports.update = (bug_assignment, result) => {

    //result("You're a wizard, Harry.");
    dbt.execute(
        `update bug_assignments set progress = ? where bug_id = ? and assignee = ?`,
        result,
        Object.values(bug_assignment)
    );    
}

/**
 *  Deletes a bug assignment from the database.
 * 
 *  @param bug_assignment_info Bug assignment info thats hold the assignee and bug id.
 *  @param result Callback to return sql server status messages.
 */
exports.delete = (bug_assignment_info, result) => {
    dbt.execute(
        `delete from bug_assignments where assignee = ? and bug_id = ?`,
        result,
        Object.values(bug_assignment_info)
    );    
}

/**
 *  Deletes bug assignments based on a bug id from the database.
 * 
 *  @param bug_id bug id string.
 *  @param result Callback to return sql server status messages.
 */
exports.deleteByBugId = (bug_id, result) => {
    dbt.execute(
        `delete from bug_assignments where bug_id = ?`,
        result,
        [bug_id]
    );    
}
