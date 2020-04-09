var express = require('express');
var router = express.Router();
var Assignment = require('../models/assignmentModel');

router.get('/', function (req, res, next) {
  Assignment.find()
    .then((assignment) => {
      res.json(assignment);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
