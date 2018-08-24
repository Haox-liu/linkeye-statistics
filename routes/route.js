var express = require('express');
var router = express.Router();

var query = require('./route');

/* GET home page. */
router.get('/', function(req, res, next) {

  res.render('login');
});

router.get('/login', function(req, res, next) {
  res.render('login');
});

router.get('/statistics', function(req, res, next) {

  res.render('statistics/dashboard');
});

module.exports = router;
