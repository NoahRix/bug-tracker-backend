const dbt = require("../utils/DatabaseTools.js");

/**
 *  Fetches all bugs from the database.
 * 
 *  @param result Callback to return Bug Array.
 */
exports.all = result => {
    dbt.execute(`select * from bugs`, result);
}

/**
 *  Fetches all bugs with it's progress values from the database.
 * 
 *  @param result Callback to return Bug Array.
 */
exports.allWithProgress = result => {
    dbt.execute(
        `select 
         bugs.*, 
         avg(distinct bug_assignments.progress) as progress_avg 
         from bugs left join bug_assignments  
         on bugs.bug_id = bug_assignments.bug_id 
         group by bugs.bug_id`,
        result
    );
}

/**
 *  Fetches all bugs from the database.
 * 
 *  @param bug_id String of the bug id.
 *  @param result Callback to return Bug Array.
 */
exports.byBugId = (bug_id, result) => {
    dbt.execute(`select * from bugs where bug_id = ?`, result, [bug_id]);
}

/**
 *  Fetches a bug from the database with its costs.
 * 
 *  @param bug_id String of the bug id.
 *  @param result Callback to return Bug Array.
 */
exports.byBugIdWithCost = (bug_id, result) => {
    dbt.execute(`select round(sum(cost),2) as cost from cost_of_bugs where bug_id = ?`, result, [bug_id]);
}

/**
 *  Fetches a bug from the database with its costs.
 * 
 *  @param bug_id String of the bug id.
 *  @param result Callback to return Bug Array.
 */
exports.byBugIdWithProgress = (bug_id, result) => {
    dbt.execute(
        `select 
         bugs.*,
         avg(distinct bug_assignments.progress) as progress_avg 
         from bugs left join bug_assignments  
         on bugs.bug_id = bug_assignments.bug_id 
         where bugs.bug_id = ?`,
        result,
        [bug_id]
    );
}

/**
 *  Fetches all bugs by reportee from the database.
 * 
 *  @param reportee String of the reportee's name.
 *  @param result Callback to return Bug Array.
 */
exports.byReportee = (reportee, result) => {
    dbt.execute(`select * from bugs where reportee = ?`, result, [reportee]);
}

/**
 *  Fetches all bugs by reportee wiht its progress values from the database.
 * 
 *  @param reportee String of the reportee's name.
 *  @param result Callback to return Bug Array.
 */
exports.byReporteeWithProgress = (reportee, result) => {
    dbt.execute(
        `select 
         bugs.*,
         avg(distinct bug_assignments.progress) as progress_avg 
         from bugs left join bug_assignments  
         on bugs.bug_id = bug_assignments.bug_id 
         where reportee = ? 
         group by bugs.bug_id`,
        result,
        [reportee]
    );
}

/**
 *  Fetches all bugs by assignee with its progress values from the database.
 * 
 *  @param assignee String of the assignee's name.
 *  @param result Callback to return Bug Array.
 */
exports.byAssigneeWithProgress = (assignee, result) => {
    dbt.execute(
        `select bug_assignments.bug_id, bugs.*, 
         avg(distinct bug_assignments.progress) as progress_avg 
         from bug_assignments 
         left join bugs
         on bug_assignments.bug_id = bugs.bug_id
         where bug_assignments.assignee = ? 
         group by bugs.bug_id`,
        result,
        [assignee]
    );
}

/**
 *  Adds a new bug to the database.
 * 
 *  @param _bug Bug object.
 *  @param result Callback to return result messages.
 */
exports.new = (_bug, result) => {
    let bug;
    let date = require('moment')().format("YYYY-MM-DD HH:mm:ss");
    _bug.dt_reported = date;

    let bug_id = "";

    for (let i = 0; i < 7; i++) {
        bug_id += String.fromCharCode(65 + Math.floor(Math.random() * 26));
    }

    console.log(bug_id);
    _bug.bug_id = bug_id;

    bug = {
        bug_id: bug_id,
        type: _bug.type,
        dt_reported: _bug.dt_reported,
        report_comment: _bug.report_comment,
        reportee: _bug.reportee
    };

    console.log(bug);

    dbt.execute(
        `insert into bugs(bug_id, type, dt_reported, report_comment, reportee) values(?, ?, ?, ?, ?)`,
        result,
        Object.values(bug)
    );
}

/**
 *  Updates an existing bug on the database.
 * 
 *  @param bug_info Bug info of its id and report comment.
 *  @param result Callback to return result messages.
 */
exports.update = (bug_info, result) => {

    console.log(bug_info);

    dbt.execute(
        `update bugs set report_comment = ? where bug_id = ?`,
        result,
        [
            bug_info.report_comment,
            bug_info.bug_id
        ]
    );
}

/**
 *  Deletes an existing bug on the database.
 * 
 *  @param bug_id Bug id string.
 *  @param result Callback to return result messages.
 */
exports.delete = (bug_id, result) => {
    dbt.execute(
        `delete from bugs where bug_id = ?`,
        result,
        [bug_id]
    );
}