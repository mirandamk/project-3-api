require('dotenv').config();
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var cors = require('cors');
var app = express();

app.use(bodyParser.urlencoded({ extended: false }));

// Dependencies for cookie sessions
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

//allow localhost3002(react) to connect with localhost3000(express)

app.use(
  cors({
    origin: [process.env.client_origin_a, process.env.client_origin_b],
    credentials: true,
    //withCredentials: true,
  })
);

// CORS method from the internet
// app.get('/', function (req, res, next) {
//   res.json({ msg: 'This is CORS-enabled for all origins!' });
// });

// app.listen(80, function () {
//   console.log('CORS-enabled web server listening on port 80');
// });

//Starting cookie session for user
app.use(
  session({
    secret: 'basic-auth-secret',
    cookie: { maxAge: 60000 * 60 },
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      ttl: 24 * 60 * 60 * 1000,
    }),
    saveUninitialized: true,
  })
);

//Connect to the database(env.db contains link to MongoDb)
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

//Function to protect routes if not logged in
function protect(req, res, next) {
  console.log('hiii', req.session.currentUser);
  console.log(req.session);
  if (req.session.currentUser) {
    next();
  } else {
    res.status(403).json({ message: 'not logged in' });
    // res.status(500).json(err);
  }
}

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Routes -> word after the first / is what React will look for in localhost3000/....
app.use('/assignments', require('./routes/assignments'));
app.use('/user', require('./routes/users'));
app.use('/signup', require('./routes/signup'));
app.use('/login', require('./routes/login'));
app.use('/countries', require('./routes/countries'));
// app.use('/user', require('./routes/userassignments'));
app.use('/results', require('./routes/results'));

module.exports = app;

//Another code I got from the internet to solve the cors problem
// app.use(function (req, res, next) {
/*  res.header('Access-Control-Allow-Origin', 'localhost');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );*/
//   next();
// });
