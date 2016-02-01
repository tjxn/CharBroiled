var express = require('express');
var router = express.Router();
var path    = require("path");


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET login page. */
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Express-login' });
});

/* GET register page. */
router.get('/register', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../views', 'test.html'));
});
//http://stackoverflow.com/questions/25463423/res-sendfile-absolute-path




module.exports = router;
