var express = require('express');
var router = express.Router();
var dbConn  = require('../lib/db');
 
// crear registros de USUARIO
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
  });
  
module.exports = router;
