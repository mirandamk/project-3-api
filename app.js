require('dotenv').config();
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
var cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');
// const Data = require('./data');

// var indexRouter = require('./routes/home');
// var usersRouter = require('./routes/users');

var app = express();
// const router = express.Router();

mongoose
  .connect(`${process.env.db}`, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(x => {
    console.log(`Connected to MongoDB name: "${x.connections[0].name}"`);
  })
  .catch(error => {
    console.log('Unexpected error, connection failed!', error);
  });

  // let db = mongoose.connection;

  // db.once('open', () => console.log('connected to the database'));


app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use(
//   cors({
//     // this could be multiple domains/origins, but we will allow just our React app
//     origin: ['http://localhost:3000'],
//   })
// );



// app.use('/', require('./routes/home'));
app.use('/assignment', require('./routes/assign'));
app.use('/user', require('./routes/users'));
// app.use('/api', router);

////

/////


// app.listen(3000, () => console.log("listening to port 3000"))
module.exports = app;
