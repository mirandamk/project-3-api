
const express = require('express');
const router = express.Router();
var User = require('../models/userModel');

router.get('/', function (req, res, next) {
  User.find()
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;