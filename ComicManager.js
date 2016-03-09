/**
 * Created by Trevor Jackson on 14-Feb-2016.
 */
/// <reference path="./public/js/panel" />
/// <reference path="./public/js/ComicWebService" />
var Panel = require('./public/js/panel');
var Comic = require('./public/js/comic');
var ComicWebService = require('./public/js/ComicWebService');
var ComicManager = (function () {
    function ComicManager() {
        this.defaultImage = "http://i.imgur.com/An1bi8f.jpg";
        this.defaultText = "Trevor's Test.";
        this.defaultTitle = "Trevor's Test.";
        this.defaultPublicView = true;
        this.defaultPanel = new Panel(this.defaultText, this.defaultImage);
        var defpanels = [this.defaultPanel, this.defaultPanel, this.defaultPanel];
        var defcontribs = ["", "", "", "", ""];
        this.currComic = new Comic(this.defaultTitle, this.defaultPublicView, defpanels, defcontribs);
    }
    // makes a new comic (and makes it in db).
    ComicManager.prototype.newComic = function () {
        var comicdb = new ComicWebService();
        var dbID = "";
        comicdb.newComic(this.currComic, function (error, response, body) {
            dbID = body['_id'];
            this.currComic.dbID = dbID;
        });
    };
    // TODO: retrieve contributor's comic
    ComicManager.prototype.retrieveComic = function () {
    };
    // Retrieve comic by database assigned comic ID.
    ComicManager.prototype.retrieveComicViaID = function (dbID) {
        var comicdb = new ComicWebService();
        var title = "";
        var publicView = true;
        var panels = [];
        var contributors = [];
        comicdb.getAComic(dbID, function (error, response, body) {
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
        this.updateTitle(title);
        this.updatePublicView(publicView);
        this.updateContributors(contributors);
        this.updatePanels(panels);
    };
    // save the comic to the database
    ComicManager.prototype.saveComic = function () {
        var comicdb = new ComicWebService();
        comicdb.updateComic(this.currComic, function (error, response, body) {
        });
    };
    // delete the comic from the database
    ComicManager.prototype.deleteComic = function () {
        var comicdb = new ComicWebService();
        comicdb.deleteAComic(this.currComic.dbID, function (error, response, body) {
        });
    };
    ComicManager.prototype.getTitle = function () {
        return this.currComic.title;
    };
    ComicManager.prototype.updateTitle = function (newtitle) {
        this.currComic.title = newtitle;
        this.saveComic();
    };
    ComicManager.prototype.getPublicView = function () {
        return this.currComic.publicView;
    };
    ComicManager.prototype.updatePublicView = function (newstatus) {
        this.currComic.publicView = newstatus;
        this.saveComic();
    };
    ComicManager.prototype.getContributors = function () {
        var contribs = [];
        contribs[0] = this.currComic.Contributor_1;
        contribs[1] = this.currComic.Contributor_2;
        contribs[2] = this.currComic.Contributor_3;
        contribs[3] = this.currComic.Contributor_4;
        contribs[4] = this.currComic.Contributor_5;
        return contribs;
    };
    // contributors MUST have 5 elements!!
    ComicManager.prototype.updateContributors = function (contributors) {
        this.currComic.Contributor_1 = contributors[0];
        this.currComic.Contributor_2 = contributors[1];
        this.currComic.Contributor_3 = contributors[2];
        this.currComic.Contributor_4 = contributors[3];
        this.currComic.Contributor_5 = contributors[4];
    };
    // get all the panels!
    ComicManager.prototype.getPanels = function () {
        return this.currComic.panels;
    };
    // get one panel. panelloc refers to loc in panel AKA: Panel 1 have a panelloc of 0.
    ComicManager.prototype.getPanel = function (panelloc) {
        return this.currComic.panels[panelloc];
    };
    // update all panels (irregardless of what was there before).
    // NOTE: need to add a check for panels.length not being greater than 9.
    ComicManager.prototype.updatePanels = function (panels) {
        this.currComic.panels = panels;
        this.saveComic();
    };
    return ComicManager;
})();
module.exports = ComicManager;
//# sourceMappingURL=ComicManager.js.map