/**
 * Created by Trevor Jackson on 13-Feb-2016.
 */
/// <reference path="../express/express.d.ts" />
/// <reference path="../app.ts" />
var express = require("express");
var Tools = require('../scripts');
var path = require("path");
var ComicWebService = require("../public/js/ComicWebService");
var Panel = require("../public/js/panel");
var Comic = require("../public/js/comic");
var cloudinary = require('cloudinary');
cloudinary.config({
    cloud_name: 'hvsrk8atj',
    api_key: '588748484585879',
    api_secret: 'o2O9I2tAhbVa0XwmBXwq4oDbZ7Q'
});
var router = express.Router();
/* GET edit page. */
router.get('/view', function (req, res, next) {
    res.sendFile(path.join(__dirname, '../views', 'view.html'));
});
/* GET edit page. */
router.get('/edit', function (req, res, next) {
    res.sendFile(path.join(__dirname, '../views', 'edit.html'));
});
/* GET home page. */
router.get('/test', function (req, res, next) {
    console.log("test");
    var tools = new Tools();
    tools.WelcomeMessage();
    res.render('index', { title: 'Express' });
});
/* GET home page. */
router.post('/testingCall', function (req, res, next) {
    console.log(req.body);
    res.send("Hello From Server");
});
/* GET home page. */
router.post('/image', function (req, res, next) {
    cloudinary.uploader.upload("http://www.motherwebbs.com/wp-content/uploads/2014/04/steak300x200.jpg", function (result) {
        console.log(result);
        res.send(result);
    });
});
/* GET home page. */
router.post('/newComic', function (req, res, next) {
    var api = new ComicWebService();
    var defaultImage = "http://i.imgur.com/An1bi8f.jpg";
    var defaultText = "Trevor's Test.";
    var defaultTitle = "Trevor's Test.";
    var defaultPublicView = true;
    var defaultPanel = new Panel(defaultText, defaultImage);
    var defpanels = [defaultPanel, defaultPanel, defaultPanel];
    var defcontribs = ["", "", "", "", ""];
    var currComic = new Comic(defaultTitle, defaultPublicView, defpanels, defcontribs);
    api.newComic(currComic, function (err, response, body) {
        console.log('here');
        currComic.dbID = body['_id'];
        console.log(currComic.dbID);
        console.log(req.user.email);
        req.user.customData.comic1 = currComic.dbID;
        req.user.save();
        res.send(currComic.dbID);
    });
});
router.put('/saveComic/:id', function (req, res, next) {
    var api = new ComicWebService();
    var comic = jsonToComic(req.body);
    comic.dbID = req.params.id;
    api.updateComic(comic, function (err, response, body) {
        res.send(JSON.stringify({ Status: "Comic Saved" }));
    });
});
/* GET home page. */
router.get('/findUserEmail', function (req, res, next) {
    console.log(req.user.email);
    res.send(req.user.email.toString());
});
/* GET home page. */
router.get('/comicID', function (req, res, next) {
    console.log(req.user.customData.comic1);
    res.send(req.user.customData.comic1.toString());
});
// --------------------------------------------------
//                 RESTFUL API
// --------------------------------------------------
// Retrieve IDs of comic(s) the user has contributed to
router.get('/comic', function (req, res, next) {
    console.log(req.user.customData.comic1);
    res.send(req.user.customData.comic1.toString());
});
// Retrieve JSON representation of a comic
router.get('/comic/:id', function (req, res, next) {
    var api = new ComicWebService();
    api.getAComic(req.params.id, function (request, response, body) {
        res.send(body);
    });
});
// Update a comic in the database
router.put('/comic/:id', function (req, res, next) {
    var api = new ComicWebService();
    var comic = jsonToComic(req.body);
    comic.dbID = req.params.id;
    api.updateComic(comic, function (request, response, body) {
        res.send(body);
    });
});
// Remove a comic from the database
router.delete('/comic/:id', function (req, res, next) {
    var api = new ComicWebService();
    api.deleteAComic(req.params.id, function (request, response, body) {
        res.send(JSON.stringify({ Status: "Comic Deleted" }));
    });
});
function jsonToComic(data) {
    var panel1 = new Panel(data['Panels']['Panel_1'].Title, data['Panels']['Panel_1'].Image_URL);
    var panel2 = new Panel(data['Panels']['Panel_2'].Title, data['Panels']['Panel_2'].Image_URL);
    var panel3 = new Panel(data['Panels']['Panel_3'].Title, data['Panels']['Panel_3'].Image_URL);
    var panel4 = new Panel(data['Panels']['Panel_4'].Title, data['Panels']['Panel_4'].Image_URL);
    var panel5 = new Panel(data['Panels']['Panel_5'].Title, data['Panels']['Panel_5'].Image_URL);
    var panel6 = new Panel(data['Panels']['Panel_6'].Title, data['Panels']['Panel_6'].Image_URL);
    var panel7 = new Panel(data['Panels']['Panel_7'].Title, data['Panels']['Panel_7'].Image_URL);
    var panel8 = new Panel(data['Panels']['Panel_8'].Title, data['Panels']['Panel_8'].Image_URL);
    var panel9 = new Panel(data['Panels']['Panel_9'].Title, data['Panels']['Panel_9'].Image_URL);
    var panels = [panel1, panel2, panel3, panel4, panel5, panel6, panel7, panel8, panel9];
    var contributors = [
        data['Contributors']['Contributor_1'],
        data['Contributors']['Contributor_2'],
        data['Contributors']['Contributor_3'],
        data['Contributors']['Contributor_4'],
        data['Contributors']['Contributor_5']
    ];
    var comic = new Comic(data['Title'], true, panels, contributors);
    return comic;
}
module.exports = router;
//# sourceMappingURL=index.js.map