var express = require('express');
var router = express.Router();
var path    = require("path");

/* GET view page. */
router.get('/view', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../views', 'view.html'));
});

/* GET edit page. */
router.get('/edit', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../views', 'login.jade'));
});

/* GET TEST page. */
router.get('/test', function(req, res) {
  res.render('test', { title: 'Hello, World!' });
});

module.exports = router;
