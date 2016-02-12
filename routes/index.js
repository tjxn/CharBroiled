var express = require('express');
var router = express.Router();
var path    = require("path");
var stormpath = require('express-stormpath');

/* GET view page. */
router.get('/view', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../views', 'view.html'));
});

/* GET edit page. */
router.get('/edit', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../views', 'edit.html'));
});

/* GET edit page. */
router.get('/edit', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../views', 'view.html'));
});


module.exports = router;