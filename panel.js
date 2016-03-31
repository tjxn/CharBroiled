/**
 * Created by Trevor Jackson on 09-Feb-2016.
 */
var Panel = (function () {
    function Panel(text, image_URL) {
        this.charLimit = 140;
        this._sizelimit = 5;
        this._panelHeight = 426;
        this._panelWidth = 331;
        this.text = text;
        this.image_URL = image_URL;
    }
    // para: text:string
    // Check if the string is longer than the allowed character limited
    // return: boolean
    Panel.prototype.checkText = function (text) {
        if (text.length > this.charLimit) {
            return true;
        }
        else {
            return true;
        }
    };
    // para: text:string - caption on a panel, image_URL:string - url to an image for the panel
    // Check if the string is longer than the allowed character limited
    // return: none
    Panel.prototype.updatePanel = function (text, image_URL) {
        this.text = text;
        this.image_URL = image_URL;
    };
    return Panel;
})();
module.exports = Panel;
//# sourceMappingURL=panel.js.map