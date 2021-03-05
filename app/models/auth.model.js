const sql = require("../utils/db.js");
const dbt = require("../utils/DatabaseTools.js");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const AuthUtil = require('../utils/auth');

/**
 *  Successful logins sends back the access token in the result callback.
 *  Unsuccessful logins sends back isAuth = false in the result callback.
 *
 *  @param user     User object.
 *  @param result   Callback function to send the response data.
 */
exports.login = async (user, result) => {


    console.log(user);

    let found = null;   //user object that is found.

    const query = new Promise((resolve, reject) => {
        sql.query(`SELECT * FROM users where username = ?`, user.username, (err, res) => {
            if (err)
                reject();
            found = res;
            resolve();
        })
    })
    
    await query;    //Wait untl the query is finished.

    //If the user is not found, do not authorize the user.
    if(found[0] === undefined){
        result({isAuthed: false});
        return;
    }
    
    //Else compare the password input with the database password.
    bcrypt.compare(user.password, found[0].password, (err, res) => {
        if(err)
        result(err);
        if(!res)
        {
            console.log("Not found");
            result({isAuthed: false});
        }
        else{
            console.log("Result");
            const username = user.username;
            const tokenDetails = { username: username };
            const accessToken = AuthUtil.generateAccessToken(tokenDetails);
            const refreshToken = jwt.sign(tokenDetails, process.env.REFRESH_TOKEN_SECRET);

            // Store the refresh token to the correct user in the database.
            sql.query("update users set refresh_token = ? where username = ?", [refreshToken, username]);

            result({ accessToken: accessToken, refreshToken: refreshToken, isAuthed: true, username: username });
            console.log("here")
        }
    }) 
}


/**
 *  Adds a new user to the database with a hashes password
 *
 *  @param user     User object.
 *  @param result   Callback function to send the response data.
 */
exports.register = async (user, result) => {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(user.password, salt);
    const newUser = [user.username, hashedPassword];

    new Promise((resolve, reject) => {
        sql.query(`INSERT INTO users(username, password) VALUES(?, ?)`, newUser, (err, res) => {
            if (err)
                reject(err);
            else
                resolve(res);
        })
    })
    .then((res) => result(res))
    .catch((err) => result(err));
}

/**
 *  Expires the access token of the user to be logged out.
 *
 *  @param token    Token object.
 *  @param result   Callback function to send the response data.
 */
exports.logout = (username, result) => {
    dbt.execute("update users set refresh_token = NULL where username = ?", result, [username])
}

/**
 *  Refreshe's the users access token by checking if the user has an exsiting refresh token from the database.
 *
 *  @param token    Token object.
 *  @param result   Callback function to send the response data.
 */
exports.token = (refreshToken, result) => {
    dbt.execute("select * from users where refresh_token = ?", (data) => {
        let found = (data.length > 0);
        if (refreshToken == null) result('401');
        if (!found) result('403');
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
            if (err) result('403')
            const accessToken = AuthUtil.generateAccessToken({ username: user.username })
            result({ accessToken: accessToken });
        })
    }, [refreshToken])
}