var express = require('express');
var router = express.Router();
var Countries = require('../models/countriesModel');
const mongoose = require('mongoose');


//show countries in website
router.get('/', function (req, res, next) {
  Countries.find()
    .then((countries) => {
      res.json(countries);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
