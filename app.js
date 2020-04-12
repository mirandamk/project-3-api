require('dotenv').config();
var express = require('express');
var path = require('path');
// var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
var cors = require('cors');
// const bodyParser = require('body-parser');

var app = express();
app.use(
  cors({
    origin: ['http://localhost:3002', 'https://localhost:3002'],
    credentials: true,
  })
);

// app.get('/', function (req, res, next) {
//   res.json({ msg: 'This is CORS-enabled for all origins!' });
// });

// app.listen(80, function () {
//   console.log('CORS-enabled web server listening on port 80');
// });

mongoose
  .connect(`${process.env.db}`, {
    // useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((x) => {
    console.log(`Connected to MongoDB name: "${x.connections[0].name}"`);
  })
  .catch((error) => {
    console.log('Unexpected error, connection failed!', error);
  });

const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

app.use(
  session({
    secret: 'basic-auth-secret',
    cookie: { maxAge: 60000 * 60 },
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      ttl: 24 * 60 * 60 * 1000,
    }),
    saveUninitialized: true
  })
);

function protect(req, res, next, err) {
  if (req.session.currentUser) next();
  else res.status(500).json(err);
}

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//code I got from the internet to solve the cors problem
// app.use(function (req, res, next) {
/*  res.header('Access-Control-Allow-Origin', 'localhost');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );*/
//   next();
// });

app.use('/assignments', require('./routes/assignments'));
app.use('/user', require('./routes/users'));
app.use('/signup', require('./routes/signup'));

module.exports = app;
