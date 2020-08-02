const express = require("express");
const port = 3000;
const bodyParser = require('body-parser');
const expressLayouts = require('express-ejs-layouts');
const logger = require('morgan');
var jwt = require('jsonwebtoken');

//routes
const indexRoute = require('./routes/index');
const authRoute = require('./routes/auth');
const appRoute = require('./routes/app');
const listsRoute = require('./routes/listing');
const usersRoute = require('./routes/users');

const app = express();
// Setamos que nossa engine será o ejs
app.set('view engine', 'ejs');
app.set('layout', false);
// jwt secret token
app.set('secretKey', 'Pato Branco (16/07/2020)');

// DB connection
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/Listing', { useNewUrlParser: true });
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));


app.use(logger('dev'));
app.use(expressLayouts);
app.use(bodyParser.urlencoded({ extended: false }));

// assets routes
app.use(express.static(__dirname + '/public'));

// public routes
app.use('/', indexRoute);
app.use('/users', usersRoute);
app.use('/auth', authRoute);

// private routes
app.use('/app', appRoute);
app.use('/listings', validateUser, listsRoute);

app.get('/favicon.ico', function (req, res) {
    res.sendStatus(204);
});

// user validation
function validateUser(req, res, next) {
    jwt.verify(req.headers['x-access-token'], req.app.get('secretKey'), function (err, decoded) {
        if (err) {
            res.status(401).json({ message: err.message, data: null });
        } else {
            // add user id to request
            req.body.id = decoded.id;
            next();
        }
    });
}

// express doesn't consider not found 404 as an error so we need to handle 404 explicitly
// handle 404 error
app.use(function (req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// handle errors
app.use(function (err, req, res, next) {
    console.log(err);

    if (err.status === 404)
        res.status(404).json({ message: "Not found" });
    else
        res.status(500).json({ message: "Something looks wrong" });
});

app.listen(port, () => {
    console.log("Server listening on port " + port);
});