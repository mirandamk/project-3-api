var express = require('express');
// const app = express();
var router = express.Router();
var User = require('../models/userModel');
// const bcrypt = require('bcrypt');

router.get('/', function (req, res, next) {
  User.find()
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      console.log("Error", err);
    });
});


router.post('/signup', (req, res) => {
  User.create(req.body)
    .then((user) => {
      // console.log(req.body.currentUser)
      // console.log(user)
      res.json(user);
    })
    .catch((err) => {
      res.status(500).json({ message: 'err' });
    });
});

module.exports = router;







// module.exports = router;
