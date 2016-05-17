// modules =================================================
var express        = require('express');
var app            = express();
var mongoose       = require('mongoose');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var ejs            = require('ejs');
var passport       = require('passport');
var session        = require('express-session');
var flash          = require('flash');

// configuration ===========================================
app.engine('html', ejs.renderFile);
app.set('view engine', 'html');

var port = process.env.PORT || 8000; // set our port
require('./config/passport')(passport); 

// get all data/stuff of the body (POST) parameters
app.use(bodyParser.json()); // parse application/json 
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded

app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users


// required for passport
app.use(session({ secret: 'hannesgillardetta', resave: true, saveUninitialized: true })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// routes ==================================================
require('./app/routes')(app, passport); // pass our application into our routes

// start app ===============================================
app.listen(port);   
console.log('Magic happens on port ' + port);           // shoutout to the user
exports = module.exports = app;                         // expose app