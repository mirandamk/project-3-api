var express = require('express');
var router = express.Router();
var Assign = require('../models/assignModel');

/* GET assign page. */
router.get('/', function (req, res, next) {
  Assign.find()
    .then((assignment) => {
      res.json(assignment);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
