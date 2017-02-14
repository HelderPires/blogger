// dependencies
var express  = require('express');
var app      = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var database = require('./config/database');
var port  	 = process.env.PORT || 8080; 
//config
mongoose.connect(database.url);

app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse urlencoded
app.use(bodyParser.json());                                     // parse json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

//load route.js
require('./routes.js')(app);
//launch
app.listen(port);
console.log("App listening on port 8080");