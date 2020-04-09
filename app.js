require('dotenv').config();
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const logger = require('morgan');

var app = express();

mongoose
  .connect(`${process.env.db}`, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((x) => {
    console.log(`Connected to MongoDB name: "${x.connections[0].name}"`);
  })
  .catch((error) => {
    console.log('Unexpected error, connection failed!', error);
  });

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/assignment', require('./routes/assignments'));
app.use('/user', require('./routes/users'));

module.exports = app;
