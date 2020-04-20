var express = require('express');
var router = express.Router();
var Assignments = require('../models/assignmentsModel');
var User = require('../models/userModel');
const mongoose = require('mongoose');
const uploader = require('../config/cloudinary.js');

//Show all assignments
router.get('/', function (req, res, next) {
  Assignments.find()
    .then((assignments) => {
      res.json(assignments);
    })
    .catch((err) => {
      console.log(err);
    });
});

//create 
router.post('/create', (req, res, next) => {
  Assignments.create({
    dimension: req.body.dimension,
    description: req.body.description,
    image: req.body.image

  })
    .then((assignmentData) => {
      console.log(req.session.currentUser);
      return User.findOneAndUpdate(
        { _id: req.session.currentUser._id },
        { $push: { assignments: mongoose.Types.ObjectId(assignmentData._id) } },
        { new: true }
      );
    })
    .then((user) => {
      res.json(user);
    })
    .catch((error) => {
      console.log(error);
    });
});

//sends the file to cloudinary
router.post('/uploadimage', uploader.single('dimension-image'), (req, res, next) => {
  var imageUrl= req.file.url;
  res.json(imageUrl);
});

module.exports = router;
