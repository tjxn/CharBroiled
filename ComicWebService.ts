/**
 * Created by Trevor Jackson on 08-Feb-2016.
 * Edited by Joshua Jackson on 10-Feb-2016.
 */
/// <reference path="express/express.d.ts" />
/// <reference path="comic.ts" />
/// <reference path="panel.ts" />
/// <reference path="./typings/main/ambient/request/request.d.ts" />
///  <reference path="./typings/main/ambient/form-data/form-data.d.ts" />

/*
 *             Libraries Used Throughout ComicWebService Class
 * request - https://github.com/request/request
 *
 * */

import Comic = require ("./comic");

class ComicWebService {

    constructor() {};

    result:string;

    // para: callback:function(error:string, response:string, body:string) => void - callback with a three string parameters
    // retrieve every single comic in the mongo database
    // return: none
    getAllComics(callback:(error:string, response:string, body:string) => void) {

        var request = require('request');
        request.get('http://glacial-retreat-45891.herokuapp.com/comic/', callback);
        return;
    }

    // para: ids:string[] - ids of comics, callback:function(error:string, response:string, body:string) => void - callback with a three string parameters
    // Given an array of comic ids, get the associated JSON comic objects from the database
    // return: none
    getComics(ids: string[], callback:(error:string, response:string, body:string) => void) {
        var request = require('request');
        request.get('http://glacial-retreat-45891.herokuapp.com/comic/', function (err:string, res:string, bod:string) {
            var ans = {};
            var temp = JSON.parse(bod);
            //console.log(temp);
            if(typeof ids === 'undefined') {
                //console.log("given list of ids is empty");
            } else {
                var k=0;
                for (var i = 0; i < temp.length; i++) {
                    for (var j = 0; j < ids.length; j++) {
                        if (temp[i]._id == ids[j]) { // if this comic is a fav
                            ans[k] = temp[i];
                            k++;
                        }
                    }
                }
            }
            callback(err, res, JSON.stringify(ans));
        });
        return;
    }


    // para: ids:string - id of comic, callback:function(error:string, response:string, body:string) => void - callback with a three string parameters
    // Given a comic id, get the associated JSON comic object from the database
    // return: none
    getAComic(comicId:string, callback:(error:string, response:string, body:string) => void) {

        var request = require('request');
        request.get('http://glacial-retreat-45891.herokuapp.com/comic/' + comicId, callback);
        return;
    }


    // para: ids:string - id of comic, callback:function(error:string, response:string, body:string) => void - callback with a three string parameters
    // Given a comic id, delete the associated JSON comic object from the mongo database
    // return: none
    deleteAComic(comicId:string, callback:(error:string, response:string, body:string) => void) {

        var request = require('request');
        var options = {
            method: 'DELETE',
            url: 'http://glacial-retreat-45891.herokuapp.com/comic/' + comicId,
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
            }
        };
        request(options, callback);
        return;
    }


    // para: ids:string - id of comic, callback:function(error:string, response:string, body:string) => void - callback with a three string parameters
    // Create a new comic in the mongo database
    // return: none
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

    // para: comic:Comic - Comic Object, callback:function(error:string, response:string, body:string) => void - callback with a three string parameters
    // Given a comic object update the associated object in the mongo database
    // return: none
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
                        Image_URL: comic.panels[1].image_URL,
                        Text: comic.panels[1].text
                    },
                    Panel_3: {
                        Image_URL: comic.panels[2].image_URL,
                        Text: comic.panels[2].text
                    },
                    Panel_4: {
                        Image_URL: comic.panels[3].image_URL,
                        Text: comic.panels[3].text
                    },
                    Panel_5: {
                        Image_URL: comic.panels[4].image_URL,
                        Text: comic.panels[4].text
                    },
                    Panel_6: {
                        Image_URL: comic.panels[5].image_URL,
                        Text: comic.panels[5].text
                    },
                    Panel_7: {
                        Image_URL: comic.panels[6].image_URL,
                        Text: comic.panels[6].text
                    },
                    Panel_8: {
                        Image_URL: comic.panels[7].image_URL,
                        Text: comic.panels[7].text
                    },
                    Panel_9: {
                        Image_URL: comic.panels[8].image_URL,
                        Text: comic.panels[8].text
                    }
                }
            },
            json: true
        };

        request(options, callback);

        return
    }

}
export = ComicWebService;
