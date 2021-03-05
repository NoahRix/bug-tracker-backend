require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require("body-parser");
const { response } = require('express');

app.use(express.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
const rt = require('./app/utils/RouterTools');

console.log("Bug Tracker backend Starting...");

//Cross Origins configuration.
//var whitelist = ['http://localhost:3000', 'http://localhost:3001', '69.174.145.39:3000'];
var whitelist = ['*'];

var corsOptions = {
    credentials: true,
    origin: function (origin, callback) {

        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS: ' + origin))
        }
    }
}

app.use(cors(corsOptions));

require("./app/routes/user.routes.js")(app);
require("./app/routes/user_salary_history.routes.js")(app);
require("./app/routes/auth.routes.js")(app);
require("./app/routes/bug_assignment.routes.js")(app);
require("./app/routes/bug.routes.js")(app);

//To hold all exsiting routes
let routes = [];

app._router.stack.forEach((item) => {
    if (item.route != null)
        routes.push(item.route.path);
});

app.locals.routes = routes;
app.locals.routeParams = rt.routeParams;

app.get("/", (req, res) => {
    app.locals.html = "";
    res.render("home");
});

app.listen(process.env.PORT);