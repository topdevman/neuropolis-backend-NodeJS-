var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');
var passport = require('passport');
var cors = require('cors');
var path = require('path');

var users = require('./routes/users');
var authenticate = require('./routes/authenticate');
var vehicles = require('./routes/vehicle');
var vehicletypes = require('./routes/vehicletype');
var jobs = require('./routes/job');
var zones = require('./routes/zone');
var brands = require('./routes/brand');
var colors = require('./routes/color');
var parking_meters = require('./routes/parking_meter');
var sites = require('./routes/site');
var team = require('./routes/team');
var stats_prefs = require('./routes/stats_prefs');
var usertype = require('./routes/usertype');
var job_types = require('./routes/job_type');
var upload = require('./routes/upload');
var project = require('./routes/project');

var mobileLogin = require('./routes/mobile/login');
var mobilePosition = require('./routes/mobile/position');


var app = express();

app.use(cors());

app.use(logger('dev'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// passport middleware
app.use(passport.initialize());
app.use(passport.session());
require("./config/passport")(passport);

app.use('/auth', authenticate);
app.use('/users', users);
app.use('/brands', brands);
app.use('/colors', colors);
app.use('/vehicles', vehicles);
app.use('/vehicletypes', vehicletypes);
app.use('/jobs', jobs);
app.use('/zones', zones);
app.use('/parking_meters', parking_meters);
app.use('/sites', sites);
app.use('/teams', team);
app.use('/stats', stats_prefs);
app.use('/usertypes', usertype);
app.use('/jobtypes', job_types);
app.use('/upload', upload);
app.use('/project', project);

app.use('/m', mobileLogin);
app.use('/m', mobilePosition);


module.exports = app;
