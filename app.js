const express = require("express");
const port = 3000;
const bodyParser = require('body-parser');
const expressLayouts = require('express-ejs-layouts');
const minifyHTML = require('express-minify-html');
const logger = require('morgan');
const roles = require('./roles');
var jwt = require('jsonwebtoken');

//routes
const indexRoute = require('./routes/index');
const authRoute = require('./routes/auth');
const appRoute = require('./routes/app');

//api
const animalsRoute = require('./routes/api/animals');
const breedsRoute = require('./routes/api/breeds');
const originsRoute = require('./routes/api/origins');
const personsRoute = require('./routes/api/persons');
const speciesRoute = require('./routes/api/species');
const proceduresRoute = require('./routes/api/procedures');
const proceduresPerformedRoute = require('./routes/api/proceduresPerformed');
const clinicsRoute = require('./routes/api/clinics');
const usersRoute = require('./routes/api/users');


const app = express();
// Setamos que nossa engine será o ejs
app.set('view engine', 'ejs');
app.set('layout', false);
// jwt secret token
app.set('secretKey', 'Pato Branco (16/07/2020)');
app.set('port', process.env.PORT || port);

// DB connection
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/Listing', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(minifyHTML({
  override: true,
  exception_url: false,
  htmlMinifier: {
    removeComments: true,
    collapseWhitespace: true,
    collapseBooleanAttributes: true,
    removeAttributeQuotes: true,
    removeEmptyAttributes: true,
    minifyJS: true
  }
}));
app.use(logger('dev'));
app.use(expressLayouts);
app.use(bodyParser.urlencoded({ extended: false }));

// assets routes
app.use(express.static(__dirname + '/public'));

// public routes
app.use('/', indexRoute);
app.use('/auth', authRoute);

// private routes
app.use('/app', appRoute);

//api routes
app.use('/api/animals', validateUser, animalsRoute);
app.use('/api/breeds', validateUser, breedsRoute);
app.use('/api/origins', validateUser, originsRoute);
app.use('/api/persons', validateUser, personsRoute);
app.use('/api/species', validateUser, speciesRoute);
app.use('/api/procedures', validateUser, proceduresRoute);
app.use('/api/procedures-performed', validateUser, proceduresPerformedRoute);
app.use('/api/clinics', validateUser, clinicsRoute);
app.use('/api/users', usersRoute);

app.get('/favicon.ico', function (req, res) {
  res.sendStatus(204);
});

// user validation
function validateUser(req, res, next) {
  jwt.verify(req.headers['x-access-token'], req.app.get('secretKey'),async function (err, decoded) {
    if (err) {
      res.status(401).json({ message: err.message, data: null });
    } else {
      //Verify role of user.
      permission = await roles[decoded.role].hasPermission(req.originalUrl, req.method);
      if (!permission) {
        res.status(403).json({ message: "Permissão insuficiente!", data: null });
      } else {
        // add user id to request
        req.body.userId = decoded.id;
        next();
      }
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
    res.status(404).json({ message: "Não encontrado" });
  else
    res.status(500).json({ message: "Ocorreu algum erro" });
});

app.listen(port, () => {
  console.log("Server listening on port " + port);
});