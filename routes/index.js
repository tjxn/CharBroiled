var express = require('express');
var router = express.Router();
var path    = require("path");
var stormpath = require('express-stormpath');

/* GET view page. */
router.get('/view', stormpath.loginRequired, function(req, res, next) {
  res.sendFile(path.join(__dirname, '../views', 'view.html'));
});

router.get('/edit', stormpath.loginRequired, function(req, res) {
  res.sendFile(path.join(__dirname, '../views', 'edit.html'));
});

router.get('/', function (req, res) {
  res.render('login', {
    title: 'Welcome'
  });
});

//app.use('/profile', stormpath.loginRequired, require('../routes/profile'));

//app.use('/profile',stormpath.loginRequired,require('./profile')());

module.exports = router;