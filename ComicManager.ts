/**
 * Created by Trevor Jackson on 14-Feb-2016.
 */
/// <reference path="./public/js/panel" />
/// <reference path="./public/js/ComicWebService" />
import Panel = require ('./public/js/panel');
import Comic = require ('./public/js/comic');
import ComicWebService = require ('./public/js/ComicWebService');

class ComicManager {
    public defaultImage:string;
    public defaultText:string;
    public defaultTitle:string;
    public defaultPublicView:boolean;
    public defaultPanel:Panel;
    public currComic:Comic;

    constructor() {
        this.defaultImage = "http://i.imgur.com/An1bi8f.jpg";
        this.defaultText = "Trevor's Test.";
        this.defaultTitle = "Trevor's Test.";
        this.defaultPublicView = true;
        this.defaultPanel = new Panel(this.defaultText, this.defaultImage);
        var defpanels:Panel[] = [this.defaultPanel, this.defaultPanel, this.defaultPanel];
        var defcontribs:string[] = ["", "", "", "", ""];
        this.currComic = new Comic(this.defaultTitle, this.defaultPublicView, defpanels, defcontribs);
    }

// makes a new comic (and makes it in db).
    newComic() {
        var comicdb = new ComicWebService();
        var dbID:string = "";
        comicdb.newComic(this.currComic, function (error:string, response:string, body:string) {
            dbID = body['_id'];
            this.currComic.dbID = dbID;
        });
    }

// TODO: retrieve contributor's comic
    retrieveComic() {

    }

// Retrieve comic by database assigned comic ID.
    retrieveComicViaID(dbID:string) {
        var comicdb = new ComicWebService();
        var title:string = "";
        var publicView:boolean = true;
        var panels:Panel[] = [];
        var contributors:string[] = [];
        comicdb.getAComicById(dbID, function (error:string, response:string, body:string) {
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

    }

// save the comic to the database
    saveComic() {
        var comicdb = new ComicWebService();
        comicdb.updateComic(this.currComic, function (error:string, response:string, body:string) {
        });
    }

// delete the comic from the database
    deleteComic() {
        var comicdb = new ComicWebService();
        comicdb.deleteAComic(this.currComic, function (error:string, response:string, body:string) {
        });
    }

    getTitle() {
        return this.currComic.title;
    }

    updateTitle(newtitle:string) {
        this.currComic.title = newtitle;
        this.saveComic();
    }

    getPublicView() {
        return this.currComic.publicView;
    }

    updatePublicView(newstatus:boolean) {
        this.currComic.publicView = newstatus;
        this.saveComic();
    }

    getContributors() {
        var contribs:string[] = [];
        contribs[0] = this.currComic.Contributor_1;
        contribs[1] = this.currComic.Contributor_2;
        contribs[2] = this.currComic.Contributor_3;
        contribs[3] = this.currComic.Contributor_4;
        contribs[4] = this.currComic.Contributor_5;
        return contribs;
    }

    // contributors MUST have 5 elements!!
    updateContributors(contributors:string[]) {
        this.currComic.Contributor_1 = contributors[0];
        this.currComic.Contributor_2 = contributors[1];
        this.currComic.Contributor_3 = contributors[2];
        this.currComic.Contributor_4 = contributors[3];
        this.currComic.Contributor_5 = contributors[4];
    }

    // get all the panels!
    getPanels() {
        return this.currComic.panels;
    }

    // get one panel. panelloc refers to loc in panel AKA: Panel 1 have a panelloc of 0.
    getPanel(panelloc:number) {
        return this.currComic.panels[panelloc];
    }

// update all panels (irregardless of what was there before).
    // NOTE: need to add a check for panels.length not being greater than 9.
    updatePanels(panels:Panel[]) {
        this.currComic.panels = panels;
        this.saveComic();
    }

    //// updates one panel. panelloc refers to the panel in the array AKA: Panel 1 has a panelloc of 0.
    //updatePanel(panelloc:number, text:string, image_URL:string) {
    //    this.currComic.updatePanel(panelloc, text, image_URL);
    //    this.saveComic();
    //}

    //// Adds a panel with the default settings.
    //addPanel() {
    //    this.currComic.updatePanel(this.defaultPanel);
    //    this.saveComic();
    //}
}export = ComicManager;