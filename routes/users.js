var express = require('express');
var router = express.Router();
var User = require('../models/userModel');

/* GET user page. */
router.get('/', function (req, res, next) {
  User.find()
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;



// var express = require('express');
// var router = express.Router();
// const User = require('../models/userModel');
// // and this is the scecond test line 

// /* GET users listing. */
// router.get('/user', function(req, res, next) {
//   res.send('respond with a resource');
// });

// module.exports = router;
