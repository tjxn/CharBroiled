/**
 * Created by jes97210 on 2/4/16.
 * Edited by JJXN on 2/9/16
 */
/// <reference path="./panel" />
/// <reference path="./ComicWebService" />
import Panel = require ('./panel');
import ComicWebService = require ('./ComicWebService');

class Comic {
     dbID:string;
     title:string;
     publicView:boolean;
     panelLimit:number = 9;
     panels:Panel[];
     Contributor_1:string;
     Contributor_2:string;
     Contributor_3:string;
     Contributor_4:string;
     Contributor_5:string;

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
        this.dbID = "";

    }

    addPanel(panel:Panel) {
        var i = this.panels.length;
        if (i < this.panelLimit) {
            this.panels[i - 1] = panel;
        }
        else {
            // Return an error?
        }

    }

    //updatePanel(panelloc:number, text:string, image_URL:string) {
    //    this.panels[panelloc] = Panel.updatePanel(text, image_URL);
    //}
}export = Comic;
