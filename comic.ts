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

	addPanel(text:string, panel_URL:string) {
		var i = this.panels.length;
		if (i < this.panelLimit) {
			var temppanel = new Panel(this.defaultText, this.defaultPanel);
			this.panels[i - 1] = temppanel;
		}
		else {
			// Return an error?
		}
	}

//
// defaultImage:string = "http://i.imgur.com/An1bi8f.jpg";
// defaultText:string = "Default text.";
// deaultTitle:string = "Default title";
// defaultPublicView: boolean = true;
//
//var comicdb = new ComicWebService();
//var currcomic = null;
//var defaultPanel = new Panel(this.defaultText, this.defaultImage);

}
// TODO: makes a new comic (and makes it in db)
function newComic() {
    var defpanels:Panel[] = [defaultPanel, defaultPanel, defaultPanel];
    var defcontribs:string[] = [];
    currcomic = new Comic(this.defaultTitle, this.defaultPublicView, defpanels, defcontribs);
    this.comicbd.newComic(currcomic, function (error:string, response:string, body:string){});

}

// TODO: retrieve contributor's comic
function retrieveComic() {

}

// TODO: save the comic in the database
function saveComic(comic : Comic) {
    comicdb.updateComic(comic, function (error:string, response:string, body:string){});
}

// TODO: delete the comic from the database
function deleteComic(comic : Comic) {
    comicdb.deleteAComic(comic, function (error:string, response:string, body:string){});
}