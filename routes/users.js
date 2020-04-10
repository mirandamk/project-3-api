var express = require('express');
// const app = express();
var router = express.Router();
var User = require('../models/userModel');
// const bcrypt = require('bcrypt');

/* Old working version. */
router.get('/', function (req, res, next) {
  User.find()
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      console.log("Error", err);
    });
});


// app.post('/', (req, res) => {
//   User.create(req.body)
//     .then((usersignup) => {
//       res.json(usersignup);
//     })
//     .catch((err) => {
//       res.status(500).json({ message: 'err' });
//     });
// });

module.exports = router;







// module.exports = router;
