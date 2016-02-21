/**
 * Created by Trevor Jackson on 08-Feb-2016.
 * Edited by Joshua Jackson on 10-Feb-2016.
 */
/// <reference path="express/express.d.ts" />
/// <reference path="comic.ts" />
/// <reference path="panel.ts" />
/// <reference path="./typings/main/ambient/request/request.d.ts" />
///  <reference path="./typings/main/ambient/form-data/form-data.d.ts" />
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
module.exports = ComicWebService;
//# sourceMappingURL=ComicWebService.js.map