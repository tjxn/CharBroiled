/**
 * Created by Trevor Jackson on 13-Feb-2016.
 */
/// <reference path="../express/express.d.ts" />
/// <reference path="../app.ts" />
/// <reference path="../typings/main/ambient/multer/multer.d.ts" />

import express = require("express");
import Tools = require('../scripts');
import path    = require("path");
import ComicManager = require('../ComicManager');
import ComicWebService = require("../public/js/ComicWebService");
import Panel = require("../public/js/panel");
import Comic = require("../public/js/comic");
import ImageWebService = require("../ImageWebService");
var fs = require("fs");

import multer = require('multer');
var upload = multer({dest: 'uploads'});

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

    api.getAComic(id, function (err:string, response:string, body:string) {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(body));
        //res.json(body);
    });

});

/* GET account page. */
router.get('/account', function (req, res, next) {
    res.sendFile(path.join(__dirname, '../views', 'Account.html'));
});

/* GET accountViewer page. */
router.get('/accountviewer', function (req, res, next) {
    res.sendFile(path.join(__dirname, '../views', 'AccountViewer.html'));
});


/* GET account page. */
router.get('/testPage', function (req, res, next) {
    res.sendFile(path.join(__dirname, '../views', 'initDropzone.html'));
});

/* GET home page. */
router.get('/initDropzone', function (req, res, next) {
    console.log("initDropzone");
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
router.post('/newComic', function (req, res, next) {
    var api = new ComicWebService();

    var defaultImage = "http://strategyjournal.ru/wp-content/themes/strategy/img/default-image.jpg";
    var defaultText = "Enter Text Here";
    var defaultTitle = "Comic Title";
    var defaultPublicView = true;
    var defaultPanel = new Panel(defaultText, defaultImage);
    var defpanels:Panel[] = [defaultPanel, defaultPanel, defaultPanel];
    var firstcontrib:string = req.user.email;
    var defcontribs:string[] = [firstcontrib, "", "", "", ""];
    var currComic = new Comic(defaultTitle, defaultPublicView, defpanels, defcontribs);

    api.newComic(currComic, function (err:string, response:string, body:string) {

        var id:string = body['_id'];
        var comics:Array<string> = req.user.customData.comic;

        if(comics == undefined){
            comics = Array();
        }

        // Check if the comic is already in the array of comics
        for(var i = 0; i < comics.length; i++){
            if(comics[i] == id){
                res.send(JSON.stringify({ComicID: id}));
                return
            }
        }

        comics.push(id);
        req.user.customData.comic = comics;
        req.user.save();

        res.send(JSON.stringify({ComicID: id}));
    });

});


router.put('/saveComic/:id', function (req, res, next) {
    var api = new ComicWebService();

    var comic = jsonToComic(req.body);
    comic.dbID = req.params.id;

    api.updateComic(comic, function (err:string, response:string, body:string) {
        res.send(JSON.stringify({Status: "Comic Saved"}));
    });

});


/* GET home page. */
router.get('/findUserEmail', function (req, res, next) {

    console.log(req.user.email);
    res.send(req.user.email.toString());
});

// returns first comic in the comic array
router.get('/comicID', function (req, res, next) {
    var comics:Array<string> = req.user.customData.comic;
    res.send(comics[0]);
});

// --------------------------------------------------
//                 RESTFUL API
// --------------------------------------------------

// Retrieve IDs of comic(s) the user has contributed to
router.get('/user/comic', function (req, res, next) {

    if(req.user.customData.comic == undefined){
        req.user.customData.comic = Array();
    }

    console.log(req.user.customData.comic);
    res.send(req.user.customData.comic);
});

// Retrieve IDs of comic(s) the user has contributed to
router.put('/user/comic', function (req, res, next) {

    var id:string = req.body;
    var comics:Array<string> = req.user.customData.comic;

    if(comics == undefined){
        comics = Array();
    }

    // Check if the comic is already in the array of comics
    for(var i = 0; i < comics.length; i++){
        if(comics[i] == id){
            res.send(JSON.stringify({Status: "Success"}));
            return
        }
    }

    comics.push(id);
    req.user.customData.comic = comics;
    req.user.save();

    res.send(JSON.stringify({Status: "Success"}));
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
        res.send(JSON.stringify({Status: "Comic Deleted"}));
    });
});

router.get('/user/fav', function (req, res, next){
    var fav:Array<string> = req.user.customData.favourites;
    res.send(JSON.stringify(fav));
});

// Add/Remove a Favourite Comic
router.put('/user/fav', function (req, res, next) {
    var fav:Array<string> = req.user.customData.favourites;
    var givenFav:string = req.body['favourite'];

    if(fav == undefined){
        fav = new Array();
    }

    for (var i = 0; i < fav.length; i++) {
        if (fav[i] == givenFav) {
            fav = removeFavourite(fav, givenFav);
            req.user.customData.favourites = fav;
            req.user.save();
            res.send(JSON.stringify({Status: 'Update Successful - Removed Favourite'}));
            return
        }
    }

    fav.push(givenFav);
    req.user.customData.favourites = fav;
    req.user.save();
    res.send(JSON.stringify({Status: "Update Successful - Added Favourite"}));

});

// Remove a string from an array of strings
// Used for removing a comic ID from a list of comic IDs
// See router.put('/user/fav'
function removeFavourite(fav:Array<string>, givenFav:string):Array<string> {

    for (var i = 0; i < fav.length; i++) {
        if (fav[i] == givenFav) {
            fav.splice(i, 1);
        }
    }

    return fav;
}

// Retrieve IDs of comic(s) the user has contributed to
router.post('/image', upload.any(), function (req, res, next) {
    var api = new ImageWebService();

    api.addImage("/" + req.files[0].path, function (result) {

        //delete file after it's on cloudinary
        fs.unlink(__dirname.substring(0, __dirname.indexOf("\\routes")) + "\\" + req.files[0].path, function (err) {
        });

        if (result.secure_url == undefined) {
            res.send("Error Uploading Image");
        } else {
            // send the permanent url of the image back
            res.send(result.secure_url);
        }
    });
});

// Retrieve IDs of comic(s) the user has contributed to
router.delete('/image/:id', function (req, res, next) {
    var api = new ImageWebService();
    api.deleteImage(req.params.id, function (result) {});
});


function jsonToComic(data:Object):Comic {

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
