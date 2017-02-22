// dependencies
var express  = require('express');
var app      = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var port  	 = process.env.PORT || 8080; 

var passport = require('passport');
var flash    = require('connect-flash');
var bodyParser   = require('body-parser');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');

//config

var database = require('./config/database');
mongoose.connect(database.url);
//app.use('/static', express.static('public'));
app.use(express.static(__dirname + '/public/'));                 // set the static files location /public/img will be /img for users
app.set('view engine', 'html');

app.use(bodyParser.urlencoded({'extended':'true'}));            // parse urlencoded
app.use(bodyParser.json());                                     // parse json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

app.use(session({secret: 'ilovebeerBeerBEER',
		saveUninitialized: true,
        resave: true
        }));
app.use(passport.initialize()); // persistent login sessions
app.use(passport.session()); // use connect-flash for flash messages stored in session
app.use(flash()); // use connect-flash for flash messages in session

//load route.js
require('./routes.js')(app, passport);
//launch
app.listen(port);
console.log("App listening on port 8080");