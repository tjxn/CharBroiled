var express = require('express');
var router = express.Router();
var path    = require("path");


/* GET login page(home). */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'login' });
});

/* GET register page. */
router.get('/register', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../views', 'register.html'));
});
//http://stackoverflow.com/questions/25463423/res-sendfile-absolute-path

/* GET view page. */
router.get('/register', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../views', 'view.html'));
});

/* GET edit page. */
router.get('/register', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../views', 'edit.html'));
});



module.exports = router;
