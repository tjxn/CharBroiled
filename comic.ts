/**
 * Created by jes97210 on 2/4/16.
 * Edited by JJXN on 2/9/16
 */
/// <reference path="panel.ts" />
/// <reference path="ComicWebService.ts" />

class Comic {
    public dbID:string;
    public title:string;
    public publicView:boolean;
    public panelLimit:number = 9;
    public panels:Panel[];
    public Contributor_1:string;
    public Contributor_2:string;
    public Contributor_3:string;
    public Contributor_4:string;
    public Contributor_5:string;

    //NOTE: Just made it a list of strings, since we don't need to link the contributor name in any way right now,
    // and I assume that the list of contributors is stored in the database?
    //private _contributors: string[];
    constructor(title:string, publicView:boolean, panels:Panel[], contributors:string[]) {
        this.title = title;
        this.publicView = publicView;
        this.panels = panels;
        this.Contributor_1 = contributors[0];
        this.Contributor_2 = contributors[1];
        this.Contributor_3 = contributors[2];
        this.Contributor_4 = contributors[3];
        this.Contributor_5 = contributors[4];
    }

    addPanel() {
        var i = this.panels.length;
        if (i < this.panelLimit) {
            var temppanel = new Panel(this.defaultText, this.defaultPanel);
            this.panels[i - 1] = temppanel;
        }
        else {
            // Return an error?
        }

    }

    updatePanel(panelloc: number, text: string, image_URL: string) {
        this.panels[panelloc] = Panel.updatePanel(text, image_URL);
    }
}
var defaultImage:string = "http://i.imgur.com/An1bi8f.jpg";
var defaultText:string = "Default text.";
var defaultTitle:string = "Default title";
var defaultPublicView: boolean = true;

var defaultPanel = new Panel(defaultText, defaultImage);

// makes a new comic (and makes it in db).
function newComic() {
    var comicdb = new ComicWebService();
    var defpanels:Panel[] = [defaultPanel, defaultPanel, defaultPanel];
    var defcontribs:string[] = [];
    var currcomic = new Comic(this.defaultTitle, this.defaultPublicView, defpanels, defcontribs);
    var dbID: string = "";
    comicdb.newComic(currcomic, function (error:string, response:string, body:string){
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
function retrieveComicViaID(dbID: string){
    var comicdb = new ComicWebService();
    var title:string = "";
    var publicView:boolean = true;
    var panels:Panel[] = [];
    var contributors:string[] = [];
    comicdb.getAComicById(dbID, function (error:string, response:string, body:string){
        var data = JSON.parse(body);

        title = data['Title'];
        publicView = data['Public'];
        for(var i=1; i++; i<10) {
            var tempstrng = 'Panel_';
            tempstrng = tempstrng.concat(String(i));
            var paneli_URL = data['Panels'][tempstrng]['Image_URL'];
            if (paneli_URL == ""){
                break;
            }
            else {
                var paneli_text = data['Panels'][tempstrng]['Text'];
                panels[i-1] = new Panel(paneli_text, paneli_URL);
            }
        }
        for (var j=i; j++; j<6) {
            var tempstrng = 'Contributor_';
            tempstrng = tempstrng.concat(String(i));
            contributors[j-1] = data['Contributors'][tempstrng];
        }
    });
    return new Comic(title,publicView,panels,contributors);
}

// save the comic to the database
function saveComic(comic: Comic) {
    var comicdb = new ComicWebService();
    comicdb.updateComic(comic, function (error:string, response:string, body:string){});
}

// delete the comic from the database
function deleteComic(comic: Comic) {
    var comicdb = new ComicWebService();
    comicdb.deleteAComic(comic, function (error:string, response:string, body:string){});
}

function updateTitle(comic: Comic, newtitle: string) {
    comic.title = newtitle;
    saveComic(comic);
    return comic;
}
function updatePublicView(comic: Comic, newstatus: boolean) {
    comic.publicView = newstatus;
    saveComic(comic);
    return comic;
}
function updateContributor(comic: Comic, contributornum: number, contributorname: string){
    if (0 < contributornum < 6) {

    }
}