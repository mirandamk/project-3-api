var express = require('express');
var router = express.Router();
var Assignments = require('../models/assignmentsModel');
var User = require('../models/userModel');
const mongoose = require('mongoose');

//show answers in website
router.get('/', function (req, res, next) {
  Assignments.find()
    .then((assignments) => {
      res.json(assignments);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post('/', (req, res, next) => {
  Assignments.create({
    answerMasculinity: req.body.answerMasculinity,
  })
    .then((assignmentData) => {
      console.log(req.session.currentUser);
      console.log(assignmentData);
      return User.findOneAndUpdate(
        { _id: req.session.currentUser._id },
        { $push: { assignments: mongoose.Types.ObjectId(assignmentData._id) } },
        { new: true }
      );
    })
    .then((user) => {
      console.log(user);
      res.json(user);
    })
    .catch((error) => {
      console.log(error);
    });
});

module.exports = router;

//add answers to user_id
// router.post('/', (req, res, next) => {
//   let userId = req.session.currentUser._id
//     Assignments.create({
//       answerMasculinity: req.body.answerMasculinity,
//       owner: userId,
//     })
//       .then((assignmentData) => {
//         console.log("created: ", assignmentData)
//         res.json(assignments);
//       })
//       .catch((err) => {
//         res.send(`Error: ${err}`);
//       })
//     }
// } else {
//   Assig.create({
//     answerMasculinity: req.body.answerMasculinity,
//     owner: userId,
//     //items: [],
//     // liked_by: [] ,
//   })
//     .then((assignmentData) => {
//       console.log("created: ", assignmentData)
//       res.json(assignments);
//     })
//     .catch((err) => {
//       res.send(`Error: ${err}`);
//     })
// }
// )

router.post('/', (req, res, next) => {
  Assignments.create({
    answerMasculinity: req.body.answerMasculinity,
  })
    .then((assignment) => {
      console.log(req.session.currentUser);
      console.log(assignment);
      return User.findOneAndUpdate(
        { _id: req.session.currentUser._id },
        { $push: { assignments: mongoose.Types.ObjectId(assignment._id) } },
        { new: true }
      );
    })
    .then((user) => {
      console.log(user);
      res.json(assignments);
    })
    .catch((error) => {
      console.log(error);
    });
});

module.exports = router;

//working code that adds answer to database MongoDB
// router.post('/', (req, res) => {
//   Assignments.create(req.body)
//     .then((assignments) => {
//       res.json(assignments);
//     })
//     .catch((err) => {
//       res.status(500).json({ message: 'err' });
//     });
// });

module.exports = router;
