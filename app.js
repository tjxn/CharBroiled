/**
 * Created by Trevor Jackson on 09-Feb-2016.
 */
var Panel = (function () {
    // TODO: constructor for panel
    // Makes a new panel with the default image (will create the image and add later!)
    function Panel(text, image_URL) {
        this.charLimit = 140;
        //Also will need various vars for the size restrictions.
        this._sizelimit = 5;
        //private _fileformat: string = ".jpg";
        this._panelHeight = 426;
        this._panelWidth = 331;
        this.text = text;
        this.image_URL = image_URL;
    }
    // Currently does nothing, as we aren't storing images
    Panel.prototype.checkImage = function (image) {
        return true;
    };
    Panel.prototype.checkText = function (text) {
        if (text.length > this.charLimit) {
            return true;
        }
        else {
            return true;
        }
    };
    Panel.prototype.updatePanel = function (text, image_URL) {
        var i = this.checkImage(image_URL);
        var j = this.checkText(text);
        if (i) {
            if (j) {
                this.text = text;
                this.image_URL = image_URL;
            }
        }
    };
    return Panel;
})();
/**
 * Created by jes97210 on 2/4/16.
 * Edited by JJXN on 2/9/16
 */
/// <reference path="panel.ts" />
/// <reference path="ComicWebService.ts" />
var Comic = (function () {
    //NOTE: Just made it a list of strings, since we don't need to link the contributor name in any way right now,
    // and I assume that the list of contributors is stored in the database?
    //private _contributors: string[];
    function Comic(title, publicView, panels, contributors) {
        this.panelLimit = 9;
        this.title = title;
        this.publicView = publicView;
        this.panels = panels;
        this.Contributor_1 = contributors[0];
        this.Contributor_2 = contributors[1];
        this.Contributor_3 = contributors[2];
        this.Contributor_4 = contributors[3];
        this.Contributor_5 = contributors[4];
    }
    Comic.prototype.addPanel = function () {
        var i = this.panels.length;
        if (i < this.panelLimit) {
            var temppanel = defaultPanel;
            this.panels[i - 1] = temppanel;
        }
        else {
        }
    };
    Comic.prototype.updatePanel = function (panelloc, text, image_URL) {
        this.panels[panelloc] = Panel.updatePanel(text, image_URL);
    };
    return Comic;
})();
var defaultImage = "http://i.imgur.com/An1bi8f.jpg";
var defaultText = "Default text.";
var defaultTitle = "Default title";
var defaultPublicView = true;
var defaultPanel = new Panel(defaultText, defaultImage);
// makes a new comic (and makes it in db).
function newComic() {
    var comicdb = new ComicWebService();
    var defpanels = [defaultPanel, defaultPanel, defaultPanel];
    var defcontribs = [];
    var currcomic = new Comic(this.defaultTitle, this.defaultPublicView, defpanels, defcontribs);
    var dbID = "";
    comicdb.newComic(currcomic, function (error, response, body) {
        var data = JSON.parse(body);
        dbID = data['_id'];
    });
    currcomic.dbID = dbID;
    return currcomic;
}
// TODO: retrieve contributor's comic
function retrieveComic() {
}
// Retrieve comic by database assigned comic ID.
function retrieveComicViaID(dbID) {
    var comicdb = new ComicWebService();
    var title = "";
    var publicView = true;
    var panels = [];
    var contributors = [];
    comicdb.getAComicById(dbID, function (error, response, body) {
        var data = JSON.parse(body);
        title = data['Title'];
        publicView = data['Public'];
        for (var i = 1; i++; i < 10) {
            var tempstrng = 'Panel_';
            tempstrng = tempstrng.concat(String(i));
            var paneli_URL = data['Panels'][tempstrng]['Image_URL'];
            if (paneli_URL == "") {
                break;
            }
            else {
                var paneli_text = data['Panels'][tempstrng]['Text'];
                panels[i - 1] = new Panel(paneli_text, paneli_URL);
            }
        }
        for (var j = i; j++; j < 6) {
            var tempstrng = 'Contributor_';
            tempstrng = tempstrng.concat(String(i));
            contributors[j - 1] = data['Contributors'][tempstrng];
        }
    });
    return new Comic(title, publicView, panels, contributors);
}
// save the comic to the database
function saveComic(comic) {
    var comicdb = new ComicWebService();
    comicdb.updateComic(comic, function (error, response, body) { });
}
// delete the comic from the database
function deleteComic(comic) {
    var comicdb = new ComicWebService();
    comicdb.deleteAComic(comic, function (error, response, body) { });
}
function updateTitle(comic, newtitle) {
    comic.title = newtitle;
    saveComic(comic);
    return comic;
}
function updatePublicView(comic, newstatus) {
    comic.publicView = newstatus;
    saveComic(comic);
    return comic;
}
function updateContributor(comic, contributornum, contributorname) {
    if (0 < contributornum < 6) {
    }
}
/**
 * Created by Trevor Jackson on 08-Feb-2016.
 * Edited by Joshua Jackson on 10-Feb-2016.
 */
/// <reference path="express/express.d.ts" />
/// <reference path="comic.ts" />
/// <reference path="panel.ts" />
var ComicWebService = (function () {
    // USED FOR TESTING
    //panel1:Panel;
    //panel2:Panel;
    //comic:Comic;
    function ComicWebService() {
        // USED FOR TESTING
        //this.panel1 = new Panel("First Panel", "www.google.ca");
        //this.panel2 = new Panel("First Panel", "www.google.ca");
        //this.comic = new Comic("Api Comic - First", false, [this.panel1, this.panel2], ["Trevor Jackson", "Joshua", "Scott", "Jelena", "Tania"]);
        //this.comic.dbID = "56b44b8284566860217dad39";
    }
    ;
    ComicWebService.prototype.getAllComics = function (callback) {
        var request = require('request');
        request.get('http://glacial-retreat-45891.herokuapp.com/comic', callback);
        return;
    };
    ComicWebService.prototype.getAComicById = function (comicId, callback) {
        var request = require('request');
        request.get('http://glacial-retreat-45891.herokuapp.com/comic/' + comicId, callback);
        return;
    };
    ComicWebService.prototype.getAComic = function (comic, callback) {
        var request = require('request');
        request.get('http://glacial-retreat-45891.herokuapp.com/comic/' + comic.dbID, callback);
        return;
    };
    ComicWebService.prototype.deleteAComic = function (comic, callback) {
        var request = require('request');
        var options = {
            method: 'DELETE',
            url: 'http://glacial-retreat-45891.herokuapp.com/comic/' + comic.dbID,
            headers: {
                'content-type': 'application/x-www-form-urlencoded'
            }
        };
        request(options, callback);
        return;
    };
    ComicWebService.prototype.newComic = function (comic, callback) {
        var request = require('request');
        var options = {
            method: 'POST',
            url: 'http://glacial-retreat-45891.herokuapp.com/comic',
            headers: {
                'content-type': 'application/json'
            },
            body: {
                Title: comic.title, Public: comic.publicView,
                Contributors: {
                    Contributor_1: comic.Contributor_1,
                    Contributor_2: comic.Contributor_2,
                    Contributor_3: comic.Contributor_3,
                    Contributor_4: comic.Contributor_4,
                    Contributor_5: comic.Contributor_5
                },
                Panels: {
                    Panel_1: {
                        Image_URL: comic.panels[0].image_URL,
                        Text: comic.panels[0].text
                    },
                    Panel_2: {
                        Image_URL: "",
                        Text: ""
                    },
                    Panel_3: {
                        Image_URL: "",
                        Text: ""
                    },
                    Panel_4: {
                        Image_URL: "",
                        Text: ""
                    },
                    Panel_5: {
                        Image_URL: "",
                        Text: ""
                    },
                    Panel_6: {
                        Image_URL: "",
                        Text: ""
                    },
                    Panel_7: {
                        Image_URL: "",
                        Text: ""
                    },
                    Panel_8: {
                        Image_URL: "",
                        Text: ""
                    },
                    Panel_9: {
                        Image_URL: "",
                        Text: ""
                    }
                }
            },
            json: true
        };
        request(options, callback);
        return;
    };
    ComicWebService.prototype.updateComic = function (comic, callback) {
        var request = require("request");
        var options = {
            method: 'PUT',
            url: 'http://glacial-retreat-45891.herokuapp.com/comic/' + comic.dbID,
            headers: {
                'content-type': 'application/json'
            },
            body: {
                Title: comic.title, Public: comic.publicView,
                Contributors: {
                    Contributor_1: comic.Contributor_1,
                    Contributor_2: comic.Contributor_2,
                    Contributor_3: comic.Contributor_3,
                    Contributor_4: comic.Contributor_4,
                    Contributor_5: comic.Contributor_5
                },
                Panels: {
                    Panel_1: {
                        Image_URL: comic.panels[0].image_URL,
                        Text: comic.panels[0].text
                    },
                    Panel_2: {
                        Image_URL: "",
                        Text: ""
                    },
                    Panel_3: {
                        Image_URL: "",
                        Text: ""
                    },
                    Panel_4: {
                        Image_URL: "",
                        Text: ""
                    },
                    Panel_5: {
                        Image_URL: "",
                        Text: ""
                    },
                    Panel_6: {
                        Image_URL: "",
                        Text: ""
                    },
                    Panel_7: {
                        Image_URL: "",
                        Text: ""
                    },
                    Panel_8: {
                        Image_URL: "",
                        Text: ""
                    },
                    Panel_9: {
                        Image_URL: "",
                        Text: ""
                    }
                }
            },
            json: true
        };
        request(options, callback);
        return;
    };
    return ComicWebService;
})();
/// <reference path="express/express.d.ts" />
/// <reference path="body-parser/body-parser.d.ts" />
/// <reference path="ComicWebService.ts" />
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes/index');
var users = require('./routes/users');
var express = require('express');
var stormpath = require('express-stormpath');
var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', routes);
app.use(stormpath.init(app, {
    client: {
        apiKey: {
            id: '4F42CDDRB565RJ2LFG9O8IR3F',
            secret: '3V84FQEqVIQC09AupKMmjNLxSzmXPq0vAlyDA/qgODs'
        }
    },
    application: {
        href: 'https://api.stormpath.com/v1/applications/MCCvNPvyq2KR5cl0x2POL'
    },
    website: true,
    web: {
        register: {
            enabled: true,
            fields: {
                userName: {
                    enabled: true,
                    label: 'User Name',
                    name: 'userName',
                    placeholder: 'User Name',
                    required: true,
                    type: 'text'
                },
                givenName: {
                    enabled: false,
                    required: false
                },
                surname: {
                    enabled: false,
                    required: false
                },
                userType: {
                    enabled: true,
                    label: 'User Type',
                    name: 'userType',
                    placeholder: 'Enter Contributor or Viewer',
                    required: true,
                    type: 'text'
                }
            },
            fieldOrder: ["userName", "userType", "email", "password"]
        }
    },
    expand: {
        customData: true
    }
}));
app.get('/', function (req, res) {
    res.render('login', {
        title: 'Welcome'
    });
});
app.use('/profile', stormpath.loginRequired, require('./routes/profile')());
//--------------------------------------------------------
// ACCESSING COMIC WEB SERVICE API
// NOTE: must give a callback function, these calls are ASYNC!!!
//--------------------------------------------------------
var panel1 = new Panel("First Panel", "www.google.ca");
var panel2 = new Panel("First Panel", "www.google.ca");
var comic = new Comic("Api Comic - First", false, [panel1, panel2], ["Trevor Jackson", "Joshua", "Scott", "Jelena", "Tania"]);
comic.dbID = "56b44b8284566860217dad39";
var api = new ComicWebService();
api.getAComicById(comic.dbID, test);
function test(error, response, body) {
    var data = JSON.parse(body);
    var title = data['Title'];
    var pub = data['Public'];
    var contributor3 = data['Contributors']['Contributor_3'];
    var panel4_Text = data['Panels']['Panel_4']['Text'];
    console.log(data);
}
//--------------------------------------------------------
//--------------------------------------------------------
app.on('stormpath.ready', function () {
    console.log('Stormpath Ready');
    app.listen(process.env.PORT || 3000);
});
//# sourceMappingURL=app.js.map