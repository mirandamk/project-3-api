//check with Emilie; are we still using this page, or did the sign up and login routes replace this route? 
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
  var re = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
  return re.test(str);
}

module.exports = router;