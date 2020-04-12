//NOTE: still need to add error messages
const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const bcrypt = require('bcrypt');

router.post('/', (req, res, next) => {
  const { username, password } = req.body;
  User.findOne({
    username
  })
    .then((user) => {
      if (!user) {
        res.status(500)
        res.json('Invalid Credentials');
      } else {
        bcrypt.compare(password, user.password, function (
          error,
          correctPassword
        ) {
          if (error) {
            res.json('Hash compare error');
          } else if (!correctPassword) {
            res.json('Invalid Credentials');
          } else {
            req.session.currentUser = user;
            console.log(req.session.currentUser._id);
            res.json(user);
          }
        });
      }
    })
    .catch((error) => {
      res.json('Error not logged in');
    });
});

module.exports = router;
