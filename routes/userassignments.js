var express = require('express');
var router = express.Router();
// var Assignments = require('../models/assignmentsModel');
var User = require('../models/userModel');
// const mongoose = require('mongoose');
// const uploader = require('../config/cloudinary.js');

// router.get('/', function (req, res, next) {
//   User.find()
//   .then((userData) => {
//     res.json(userData)
//   console.log(req.session.currentUser)
//     console.log(userData)
// })
//   .catch((err) => {
//     console.log('user not found');
//   });
// })

router.get('/assignments/:dimension', function (req, res, next) {
  return User.findById(req.session.currentUser._id)
    .populate('assignments')
    .then((userData) => {
      let assignments = userData.assignments.filter(
        (assignment) => assignment.dimension === req.params.dimension
      );
      res.json(assignments);
    })
    .catch((err) => {
      console.log('user not found');
    });
});

module.exports = router;
