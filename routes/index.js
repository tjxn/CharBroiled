/**
 * Created by Trevor Jackson on 13-Feb-2016.
 */
/// <reference path="../express/express.d.ts" />
/// <reference path="../app.ts" />
/// <reference path="../typings/main/ambient/multer/multer.d.ts" />
/// <reference path='../node/node.d.ts'/>
/*
*             Libraries Used Throughout Router Class
* multer - https://github.com/expressjs/multer
* cloudinary - http://cloudinary.com/documentation/node_integration
*
* */
var express = require("express");
var path = require("path");
var ComicWebService = require("../ComicWebService");
var Panel = require("../panel");
var Comic = require("../comic");
var ImageWebService = require("../ImageWebService");
var multer = require('multer');
var ComicSearch = require("../comicSearch");
var ContributorSearch = require("../contributorSearch");
var TranslateWebService = require("../TranslateWebService");
var UserWebService = require("../UserWebService");
var User = require("../user");
var Router = (function () {
    function Router() {
        var fs = require("fs");
        var upload = multer({ dest: 'uploads' });
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
            if (req.user.customData.userType == "Contributor") {
                res.sendFile(path.join(__dirname, '../views', 'edit.html'));
            }
            else {
                res.redirect('view?id=' + req.param('id'));
            }
        });
        /* GET account page. */
        router.get('/', function (req, res, next) {
            res.redirect('/account');
        });
        /* GET search page. */
        router.get('/search', function (req, res, next) {
            res.sendFile(path.join(__dirname, '../views', 'search.html'));
        });
        /* GET account page. */
        router.get('/account', function (req, res, next) {
            if (req.user.customData.userType == "Viewer") {
                res.sendFile(path.join(__dirname, '../views', 'AccountViewer.html'));
            }
            else {
                res.sendFile(path.join(__dirname, '../views', 'Account.html'));
            }
        });
        /* POST newComic. */
        // TODO
        // IS THIS BEING USED ????
        router.post('/comic', function (req, res, next) {
            var api = new ComicWebService();
            var defaultImage = "http://strategyjournal.ru/wp-content/themes/strategy/img/default-image.jpg";
            var defaultText = "Enter Text Here";
            var defaultTitle = "Comic Title";
            var defaultPublicView = true;
            var defaultPanel = new Panel(defaultText, defaultImage);
            var defpanels = [defaultPanel, defaultPanel, defaultPanel];
            var firstcontrib = req.user.email;
            var defcontribs = [firstcontrib, "", "", "", ""];
            var currComic = new Comic(defaultTitle, defaultPublicView, defpanels, defcontribs);
            api.newComic(currComic, function (err, response, body) {
                var userAPI = new UserWebService();
                var comicID = body['_id'];
                userAPI.getAUser(req.user.customData.mongoUserID, function (error, response, body) {
                    var comics = body['Contributed'];
                    if (comics == undefined) {
                        comics = Array();
                    }
                    // Check if the comic is already in the array of comics
                    for (var i = 0; i < comics.length; i++) {
                        if (comics[i] == comicID) {
                            res.send(JSON.stringify({ ComicID: comicID }));
                            return;
                        }
                    }
                    comics.push(comicID);
                    userAPI.updateUser(new User(body["StormpathID"], body['Favourites'], comics, body["UserType"], body["Email"]), function (error, response, body) {
                        res.send(JSON.stringify({ ComicID: comicID }));
                    });
                });
            });
        });
        /* POST user. */
        router.post('/user', function (req, res, next) {
            var api = new UserWebService();
            var user = new User("", [], [], req.body["UserType"], req.body["Email"]);
            api.newUser(user, function (err, response, body) {
                res.send(JSON.stringify({ Status: "Success" }));
            });
        });
        /* GET home page. */
        router.get('/user/email', function (req, res, next) {
            console.log(req.user.email);
            res.send(req.user.email.toString());
        });
        // don't know how restful this is, but seems better than putting it in '/findUserEmail'
        router.get('/user/type', function (req, res, next) {
            console.log(req.user.customData.userType);
            res.send(req.user.customData.userType.toString());
        });
        // returns first comic in the comic array
        router.get('/comicID', function (req, res, next) {
            var comics = JSON.parse(req.user.customData.contributed)[0];
            res.send(comics[0]);
        });
        // --------------------------------------------------
        //                 RESTFUL API
        // --------------------------------------------------
        // Retrieve IDs of comic(s) the user has contributed to
        /*
        router.get('/user/comic', function (req, res, next) {

            if (req.user.customData.comic == undefined) {
                req.user.customData.comic = Array();
            }

            console.log(req.user.customData.comic);
            res.send(req.user.customData.comic);
        });
        */
        //  get and put for '/user/contributed' is defined further down in code
        // Retrieve JSON representation of a comic
        router.get('/comic/:id', function (req, res, next) {
            var id = req.params.id;
            var api = new ComicWebService();
            api.getAComic(id, function (err, response, body) {
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify(body));
                //res.json(body);
            });
        });
        /* GET home page. */
        router.get('/user/name', function (req, res, next) {
            var name = req.user.givenName.toString() + " " + req.user.surname.toString();
            res.send(name);
        });
        // Get the search results for given text
        router.get('/search/text', function (req, res, next) {
            var api = new ComicWebService();
            var query = req.query["comicQuery"];
            api.getAllComics(function (err, response, body) {
                var array = JSON.parse(body);
                var searchManager = new ComicSearch(query, array);
                var results = searchManager.getResults();
                res.send(JSON.stringify(results));
            });
        });
        // Get Translated Text
        router.put('/translate', function (req, res, next) {
            var api = new TranslateWebService();
            var text = req.body["Text"];
            var toLang = req.body["ToLang"];
            var fromLang = req.body["FromLang"];
            api.translateText(text, fromLang, toLang, function (error, response, body) {
                var translated = JSON.parse(body);
                res.send(translated.text);
            });
        });
        // Get the search results for given text
        router.get('/search/contributor', function (req, res, next) {
            var uapi = new UserWebService();
            var api = new ComicWebService();
            var query = req.query["contribQuery"];
            uapi.getAllUsers(function (err, response, body) {
                var uarray = JSON.parse(body);
                var searchManager = new ContributorSearch(query, uarray);
                var ures = searchManager.getResults();
                api.getComics(ures, function (error, resp, bdy) {
                    //var carr = JSON.parse(body);
                    res.send(bdy);
                });
            });
        });
        // Update a comic in the database
        router.put('/comic/:id', function (req, res, next) {
            var api = new ComicWebService();
            var comic = jsonToComic(req.body);
            comic.dbID = req.params.id;
            api.updateComic(comic, function (err, response, body) {
                res.send(JSON.stringify({ Status: "Comic Saved" }));
            });
        });
        // Add/Remove a Favourite Comic
        router.put('/user/fav/ids', function (req, res, next) {
            var userAPI = new UserWebService();
            userAPI.getAUser(req.user.customData.mongoUserID, function (err, resp, bod) {
                var usr = JSON.parse(bod);
                var fav = usr["Favourites"];
                var givenFav = req.body['favourite'];
                // if 1 then add, 0 then remove
                var addRemove = req.body['action'];
                if (fav == undefined) {
                    fav = new Array();
                }
                if (addRemove == 0) {
                    for (var i = 0; i < fav.length; i++) {
                        if (fav[i] == givenFav) {
                            fav = removeFavourite(fav, givenFav);
                            var user = new User("", fav, bod["Contributed"], bod["UserType"], bod["Email"]);
                            user.UserID = req.user.customData.mongoUserID;
                            userAPI.updateUser(user, function (error, response, bd) {
                                res.send(JSON.stringify({ Status: 'Update Successful - Removed Favourite' }));
                            });
                            return;
                        }
                    }
                }
                else {
                    fav.push(givenFav);
                    var user = new User("", fav, bod["Contributed"], bod["UserType"], bod["Email"]);
                    user.UserID = req.user.customData.mongoUserID;
                    userAPI.updateUser(user, function (error, response, bd) {
                        res.send(JSON.stringify({ Status: "Update Successful - Added Favourite" }));
                    });
                }
            });
        });
        // Send JSON array of fav comic ids
        router.get('/user/fav/ids', function (req, res, next) {
            var userAPI = new UserWebService();
            userAPI.getAUser(req.user.customData.mongoUserID, function (err, resp, bod) {
                var usr = JSON.parse(bod);
                res.send(JSON.stringify(usr["Favourites"]));
            });
        });
        //// Send JSON array of comic objects
        router.get('/user/fav', function (req, res, next) {
            var userAPI = new UserWebService();
            userAPI.getAUser(req.user.customData.mongoUserID, function (err, resp, bod) {
                var usr = JSON.parse(bod);
                var api = new ComicWebService();
                api.getComics(usr["Favourites"], function (request, response, body) {
                    res.send(body);
                });
            });
        });
        // TODO
        // IS THIS BEING USED ???
        // Send JSON array of fav comic ids
        router.get('/user/contributed/ids', function (req, res, next) {
            var userAPI = new UserWebService();
            userAPI.getAUser(req.user.customData.mongoUserID, function (err, resp, body) {
                var usr = JSON.parse(body);
                res.send(JSON.stringify(usr["Contributed"]));
            });
        });
        // TODO
        // IS THIS BEING USED ???
        // Send JSON array of comic objects
        router.get('/user/contributed', function (req, res, next) {
            var userAPI = new UserWebService();
            userAPI.getAUser(req.user.customData.mongoUserID, function (err, resp, body) {
                var usr = JSON.parse(body);
                var api = new ComicWebService();
                api.getComics(usr["Contributed"], function (request, response, body) {
                    res.send(body);
                });
            });
        });
        // save contributed array
        router.put('/user/contributed', function (req, res, next) {
            var userAPI = new UserWebService();
            var comicID = req.body['comicID'];
            userAPI.getAUser(req.user.customData.mongoUserID, function (error, response, temp) {
                var body = JSON.parse(temp);
                var comics = body['Contributed'];
                if (comics == undefined) {
                    comics = Array();
                }
                // Check if the comic is already in the array of comics
                for (var i = 0; i < comics.length; i++) {
                    if (comics[i] == comicID) {
                        res.send(JSON.stringify({ Status: "Success - ComicID already in Stormpath" }));
                        return;
                    }
                }
                // Add comic to contributed
                comics.push(comicID);
                var user = new User(body["StormpathID"], body['Favourites'], comics, body["UserType"], body["Email"]);
                user.UserID = req.user.customData.mongoUserID;
                userAPI.updateUser(user, function (error, response, body) {
                    console.log(user.Contributed);
                    res.send(JSON.stringify({ Status: "Success - ComicID already in Stormpath" }));
                });
            });
        });
        // save viewed array
        router.put('/user/viewed', function (req, res, next) {
            var comics = req.user.customData.viewed;
            var id = req.body["comicID"];
            if (comics == undefined) {
                comics = Array();
            }
            // Check if the comic is already in the array of comics
            for (var i = 0; i < comics.length; i++) {
                if (comics[i] == id) {
                    // if comic is in array, remove it
                    comics.splice(i, 1);
                }
            }
            comics.unshift(id); // unshift adds item to the beginning of the array
            req.user.customData.viewed = comics;
            req.user.save();
            res.send(JSON.stringify({ Status: "Success - ComicID added to Stormpath" }));
        });
        // Send JSON array of viewed comic ids
        router.get('/user/viewed/ids', function (req, res, next) {
            console.log(req.user.customData.viewed);
            if (req.user.customData.viewed == undefined) {
                req.user.customData.viewed = Array();
                req.user.save();
            }
            res.send(JSON.stringify(req.user.customData.viewed));
        });
        // Send JSON array of viewed comic objects
        router.get('/user/viewed', function (req, res, next) {
            var api = new ComicWebService();
            if (req.user.customData.viewed == undefined) {
                req.user.customData.viewed = Array();
                req.user.save();
            }
            api.getComics(req.user.customData.viewed, function (request, response, body) {
                res.send(body);
            });
        });
        // Remove a string from an array of strings
        // Used for removing a comic ID from a list of comic IDs
        // See router.put('/user/fav'
        function removeFavourite(fav, givenFav) {
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
                }
                else {
                    // send the permanent url of the image back
                    res.send(result.secure_url);
                }
            });
        });
        // Retrieve IDs of comic(s) the user has contributed to
        router.delete('/image/:id', function (req, res, next) {
            var api = new ImageWebService();
            api.deleteImage(req.params.id, function (result) {
                res.send(JSON.stringify({ Status: "Image Removed" }));
            });
        });
        router.delete('/comic/:id', function (req, res, next) {
            var userAPI = new UserWebService();
            var comicID = req.body['comicID'];
            userAPI.getAllUsers(function (error, response, temp) {
                var allUsers = JSON.parse(temp);
                for (var i = 0; i < allUsers.length; i++) {
                    var api = new ComicWebService();
                    api.deleteAComic(req.params.id, function () {
                    });
                    var viewed = removeComicFromMongo(req.params.id, req.user.customData.viewed);
                    req.user.customData.viewed = viewed;
                    req.user.save();
                    var contributed = removeComicFromMongo(req.params.id, allUsers[i]["Contributed"]);
                    var fav = removeFavourite(allUsers[i]["Favourites"], req.params.id);
                    var user = new User("", fav, contributed, allUsers[i]["UserType"], allUsers[i]["Email"]);
                    user.UserID = allUsers[i]["_id"];
                    userAPI.updateUser(user, function (error, response, body) { });
                }
                res.send(JSON.stringify({ Status: "All User Viewed/Contributed/Favourites Updated" }));
            });
        });
        function removeComicFromMongo(id, comicIds) {
            if (comicIds != undefined) {
                for (var i = 0; i < comicIds.length; i++) {
                    if (comicIds[i] == id) {
                        comicIds.splice(i, 1);
                    }
                }
            }
            return comicIds;
        }
        function jsonToComic(data) {
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
            var contributors = [
                data['Contributors']['Contributor_1'],
                data['Contributors']['Contributor_2'],
                data['Contributors']['Contributor_3'],
                data['Contributors']['Contributor_4'],
                data['Contributors']['Contributor_5']
            ];
            var comic = new Comic(data['Title'], data['Public'], panels, contributors);
            return comic;
        }
        module.exports = router;
    }
    return Router;
})();
var router = new Router();
//# sourceMappingURL=index.js.map