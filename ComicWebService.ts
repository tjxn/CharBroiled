/**
 * Created by Trevor Jackson on 08-Feb-2016.
 * Edited by Joshua Jackson on 10-Feb-2016.
 */
/// <reference path="express/express.d.ts" />
/// <reference path="comic.ts" />
/// <reference path="panel.ts" />


class ComicWebService {

    // USED FOR TESTING
    //panel1:Panel;
    //panel2:Panel;
    //comic:Comic;

    constructor() {
        // USED FOR TESTING
        //this.panel1 = new Panel("First Panel", "www.google.ca");
        //this.panel2 = new Panel("First Panel", "www.google.ca");
        //this.comic = new Comic("Api Comic - First", false, [this.panel1, this.panel2], ["Trevor Jackson", "Joshua", "Scott", "Jelena", "Tania"]);
        //this.comic.dbID = "56b44b8284566860217dad39";
    };

    result:string;

    getAllComics(callback:(error:string, response:string, body:string) => void) {

        var request = require('request');
        request.get('http://glacial-retreat-45891.herokuapp.com/comic', callback);
        return;
    }

    getAComicById(comicId:string, callback:(error:string, response:string, body:string) => void) {

        var request = require('request');
        request.get('http://glacial-retreat-45891.herokuapp.com/comic/' + comicId, callback);
        return;
    }

    getAComic(comic:Comic, callback:(error:string, response:string, body:string) => void) {

        var request = require('request');
        request.get('http://glacial-retreat-45891.herokuapp.com/comic/' + comic.dbID, callback);
        return;
    }

    deleteAComic(comic:Comic, callback:(error:string, response:string, body:string) => void) {

        var request = require('request');
        var options = {
            method: 'DELETE',
            url: 'http://glacial-retreat-45891.herokuapp.com/comic/' + comic.dbID,
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
            }
        };
        request(options, callback);
        return;
    }

    newComic(comic:Comic, callback:(error:string, response:string, body:string) => void) {

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
    }

    updateComic(comic:Comic, callback:(error:string, response:string, body:string) => void) {

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
    }

}
