var express = require('express');
var router = express.Router();
var dbConn  = require('../lib/db');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/personal', function(req, res, next) {
  res.render('personal');
});

router.get('/nosotros', function(req, res, next) {
  res.render('nosotros');
});

module.exports = router;
