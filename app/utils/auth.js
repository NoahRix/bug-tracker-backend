const jwt = require('jsonwebtoken');
require('dotenv').config();

// True = to test APIs on backend. False = to function normally. 
let debug = true;

exports.authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err) => {
        if (err) return res.sendStatus(403);
        next();
    })
}

exports.generateAccessToken = (user) => {
    console.log("NEW TOKEN")
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '3h' });
}

exports.middleware = (debug ? (req, res, next) => { next(); } : this.authenticateToken);

