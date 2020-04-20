var express = require('express');
var router = express.Router();

var User = require('../models/userModel');

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
