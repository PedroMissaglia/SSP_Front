var express = require('express');
var router = express.Router();
var axios = require('axios');

router.get('/', function(req, res, next) {
    res.render('register', { title: 'Express' });
  });

module.exports = router;
