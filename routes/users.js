var express = require('express');
var router = express.Router();
var User = require('../models/userModel');

/* GET user page. */
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
