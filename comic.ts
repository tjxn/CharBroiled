/**
 * Created by jes97210 on 2/4/16.
 * Edited by JJXN on 2/9/16
 */
/// <reference path="panel.ts" />
/// <reference path="panel.ts" />

class Comic {
	public dbID: string;
	public title: string;
	public publicView: boolean;
	public panelLimit: number = 9;
	public panels: Panel[];
	public Contributor_1: string;
	public Contributor_2: string;
	public Contributor_3: string;
	public Contributor_4: string;
	public Contributor_5: string;
	public defaultPanel: string = "http://i.imgur.com/An1bi8f.jpg";
    public defaultText: string = "Default text.";
	//NOTE: Just made it a list of strings, since we don't need to link the contributor name in any way right now,
	// and I assume that the list of contributors is stored in the database?
	//private _contributors: string[];
	constructor(title: string, publicView: boolean, panels: Panel[], contributors: string[]) {
		this.title = title;
		this.publicView = publicView;
		this.panels = panels;
		this.Contributor_1 = contributors[0];
		this.Contributor_2 = contributors[1];
		this.Contributor_3 = contributors[2];
		this.Contributor_4 = contributors[3];
		this.Contributor_5 = contributors[4];
	}

	//constructor(public comicid: string) {
	//}
	// TODO: save the comic in the database
	saveComic() {

	}
	// TODO: delete the comic from the database
	deleteComic() {
	}
	addPanel() {
		var i = this.panels.length;
		if (i < this.panelLimit ) {
            var temppanel = new Panel(this.defaultText, this.defaultPanel);
			this.panels[i-1] = temppanel;
		}
		else {
			// Return an error?
		}
	}
}