/**
 * Created by jes97210 on 2/4/16.
 * Edited by JJXN on 2/9/16
 */
/// <reference path="./panel" />
var Comic = (function () {
    function Comic(title, publicView, panels, contributors) {
        this.panelLimit = 9;
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
    // param: panel:Panel
    // Add a panel to this comic object
    // return: none
    Comic.prototype.addPanel = function (panel) {
        var i = this.panels.length;
        if (i < this.panelLimit) {
            this.panels[i - 1] = panel;
        }
        else {
        }
    };
    return Comic;
})();
module.exports = Comic;
//# sourceMappingURL=comic.js.map