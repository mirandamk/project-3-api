var express = require('express');
// const app = express();
var router = express.Router();
var Assignments = require('../models/assignmentsModel');

// app.get('/', function (req, res, next) {
//   Assignments.find()
//     .then((assignments) => {
//       res.json(assignments);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

router.post('/', (req, res) => {
  Assignments.create(req.body)
    .then((assignments) => {
      res.json(assignments);
    })
    .catch((err) => {
      res.status(500).json({ message: 'err' });
    });
});

module.exports = router;
