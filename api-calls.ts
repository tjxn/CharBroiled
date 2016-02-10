/**
 * Created by Trevor Jackson on 08-Feb-2016.
 */
/// <reference path="node_modules/express/express.d.ts" />
/// <reference path="src/comic.ts" />
/// <reference path="src/panel.ts" />


var request = require('request');

function getAllComics() {

    request.get('http://glacial-retreat-45891.herokuapp.com/comic', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body);
        }
    })
    ;

    return;
}

function getAComic(comic:Comic) {

    request.get('http://glacial-retreat-45891.herokuapp.com/comic/' + comic.dbID, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body);
        }
    });

    return;
}

function deleteAComics(comic:Comic) {

    var options = {
        method: 'DELETE',
        url: 'http://glacial-retreat-45891.herokuapp.com/comic/' + comic.dbID,
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
        }
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        console.log(body);
    });

    return;
}


var panel1 = new Panel("First Panel", "www.google.ca");
var panel2 = new Panel("First Panel", "www.google.ca");
var comic = new Comic("Api Comic - First", false, [panel1, panel2], ["Trevor Jackson", "Joshua", "Scott", "Jelena", "Tania"]);

function newComic(comic:Comic) {

    var request = require("request");

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

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        console.log(body);
    });

    return;
}

function updateComic(comic:Comic) {

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

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        console.log(body);
    });

    return;
}


//newComic(comic);
//deleteAComics(comic);
//updateComic(comic);
