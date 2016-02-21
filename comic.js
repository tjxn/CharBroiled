var Comic = (function () {
    //NOTE: Just made it a list of strings, since we don't need to link the contributor name in any way right now,
    // and I assume that the list of contributors is stored in the database?
    //private _contributors: string[];
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