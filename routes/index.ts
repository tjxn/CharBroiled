/**
 * Created by Trevor Jackson on 13-Feb-2016.
 */
/// <reference path="../express/express.d.ts" />
/// <reference path="../app.ts" />
import express = require("express");
import Tools = require('../scripts');
import path    = require("path");
import ComicManager = require('../ComicManager');
import ComicWebService = require("../public/js/ComicWebService");
import Panel = require("../public/js/panel");
import Comic = require("../public/js/comic");
var cloudinary = require('cloudinary');


cloudinary.config({
    cloud_name: 'hvsrk8atj',
    api_key: '588748484585879',
    api_secret: 'o2O9I2tAhbVa0XwmBXwq4oDbZ7Q'
});


var router = express.Router();

/* GET view page. */
router.get('/view', function (req, res, next) {
    res.sendFile(path.join(__dirname, '../views', 'view.html'));
});

/* GET edit page. */
router.get('/edit', function (req, res, next) {
    res.sendFile(path.join(__dirname, '../views', 'edit.html'));
});

/* GET edit page. */
router.get('/comicJSON/:id', function (req, res, next) {
    var id = req.params.id;
    var api = new ComicWebService();

    api.getAComic(id, function(err:string, response:string, body:string){
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(body));
        //res.json(body);
    });

});

/* GET account page. */
router.get('/account', function (req, res, next) {
    res.sendFile(path.join(__dirname, '../views', 'Account.html'));
});

/* GET home page. */
router.get('/test', function (req, res, next) {
    console.log("test");
    var tools = new Tools();
    tools.WelcomeMessage();
    res.render('index', {title: 'Express'});
});


/* GET home page. */
router.post('/testingCall', function (req, res, next) {
    console.log(req.body);
    res.send("Hello From Server");
});

/* GET home page. */
router.post('/image', function (req, res, next) {
    cloudinary.uploader.upload("http://www.motherwebbs.com/wp-content/uploads/2014/04/steak300x200.jpg", function(result) {
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
    var defpanels:Panel[] = [defaultPanel, defaultPanel, defaultPanel];
    var defcontribs:string[] = ["", "", "", "", ""];
    var currComic = new Comic(defaultTitle, defaultPublicView, defpanels, defcontribs);

    api.newComic(currComic, function(err:string, response:string, body:string){
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

    api.updateComic(comic, function (err:string, response:string, body:string) {
        res.send(JSON.stringify({Status : "Comic Saved"}));
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

    api.getAComic(req.params.id, function(request, response, body){
        res.send(body);
    });
});

// Update a comic in the database
router.put('/comic/:id', function (req, res, next) {
    var api = new ComicWebService();

    var comic = jsonToComic(req.body);
    comic.dbID = req.params.id;

    api.updateComic(comic, function(request, response, body){
        res.send(body);
    });
});

// Remove a comic from the database
router.delete('/comic/:id', function (req, res, next) {
    var api = new ComicWebService();
    api.deleteAComic(req.params.id, function(request, response, body){
        res.send(JSON.stringify({Status : "Comic Deleted"}));
    });
});

function jsonToComic(data:Object):Comic{

/* CODE IS FOR DYNAMIC PANEL SUPPORT
    var panels = [];
    var i = 1;
    for(var p in data['Panels']) {
        panels[i] = new Panel(data['Panels']['Panel_'+i].Text, data['Panels']['Panel_'+i].Image_URL);
    }
    // !!! check that panels does not exceed panel number limit?
*/

    var panel1 = new Panel(data['Panels']['Panel_1'].Text, data['Panels']['Panel_1'].Image_URL);
    var panel2 = new Panel(data['Panels']['Panel_2'].Text, data['Panels']['Panel_2'].Image_URL);
    var panel3 = new Panel(data['Panels']['Panel_3'].Text, data['Panels']['Panel_3'].Image_URL);
    var panel4 = new Panel(data['Panels']['Panel_4'].Text, data['Panels']['Panel_4'].Image_URL);
    var panel5 = new Panel(data['Panels']['Panel_5'].Text, data['Panels']['Panel_5'].Image_URL);
    var panel6 = new Panel(data['Panels']['Panel_6'].Text, data['Panels']['Panel_6'].Image_URL);
    var panel7 = new Panel(data['Panels']['Panel_7'].Text, data['Panels']['Panel_7'].Image_URL);
    var panel8 = new Panel(data['Panels']['Panel_8'].Text, data['Panels']['Panel_8'].Image_URL);
    var panel9 = new Panel(data['Panels']['Panel_9'].Text, data['Panels']['Panel_9'].Image_URL);


    var panels = [panel1, panel2, panel3, panel4, panel5, panel6, panel7, panel8, panel9];

    var contributors =
        [
            data['Contributors']['Contributor_1'],
            data['Contributors']['Contributor_2'],
            data['Contributors']['Contributor_3'],
            data['Contributors']['Contributor_4'],
            data['Contributors']['Contributor_5']
        ];


    var comic = new Comic(data['Title'], data['Public'], panels, contributors);
    return comic;
}

export = router;