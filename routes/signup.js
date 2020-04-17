//NOTE: need to add error messages and instruction for how to fill in sign up form (e.g. password requirements)
// at least one number, one lowercase and one uppercase letter
// at least 8 characters
const express = require('express');
const router = express.Router();
var User = require('../models/userModel');
const bcrypt = require('bcrypt');

router.post('/', (req, res) => {
  const { username, firstname, lastname, email, password } = req.body;
  User.findOne({ username: username })
    .then((user) => {
      if (user !== null) {
        res.status(500);
        res.json({ err: 'The username already exists!' });
      } else {
        if (checkPassword(password) !== true) {
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
              // home_uni: homeuni,
              // exchange_uni: exchangeuni,
            })
              .then((response) => {
                // console.log(user._id)
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
  var re = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
  return re.test(str);
}

module.exports = router;
