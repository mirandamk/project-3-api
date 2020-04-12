  
const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const bcrypt = require('bcrypt');

router.post('/signup', (req, res) => {
  const { username, firstname, lastname, email, password } = req.body;
  User.findOne({ username: username })
    .then((user) => {
      if (user !== null) {
        res.status(500);
        res.json({ err: 'The username already exists!' });
      } else {
        if (checkPassword(password) !== true) {
          //insert some errormessage here that will be shown
          res.err('Error');
        }
        bcrypt.hash(password, 10, function (err, hash) {
          if (err) next('hashing error');
          else {
            User.create({
              username: username,
              firstname: firstname,
              lastname: lastname,
              email: email,
              password: hash,
            })
              .then((response) => {
                res.json(response);
              })
              .catch((err) => {
                res.json(err);
              });
          }
        });
      }
    })
    .catch((err) => {
      res.send('user not created', err);
    });
});

function checkPassword(str) {
  // at least one number, one lowercase and one uppercase letter
  // at least 8 characters
  var re = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
  return re.test(str);
}

module.exports = router;
















// var express = require('express');
// // const app = express();
// var router = express.Router();
// var User = require('../models/userModel');
// // const bcrypt = require('bcrypt');

// router.get('/', function (req, res, next) {
//   User.find()
//     .then((user) => {
//       res.json(user);
//     })
//     .catch((err) => {
//       console.log("Error", err);
//     });
// });


// router.post('/signup', (req, res) => {
//   User.create(req.body)
//     .then((user) => {
//       // console.log(req.body.currentUser)
//       // console.log(user)
//       res.json(user);
//     })
//     .catch((err) => {
//       res.status(500).json({ message: 'err' });
//     });
// });

// module.exports = router;







// module.exports = router;
