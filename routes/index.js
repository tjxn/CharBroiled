var express = require('express');
var router = express.Router();
var path    = require("path");


/* GET login page(home). */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'login' });
});

/* GET view page. */
router.get('/view', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../views', 'view.html'));
});

/* GET login page. */
router.get('/edit', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../views', 'login.jade'));
});




module.exports = router;
