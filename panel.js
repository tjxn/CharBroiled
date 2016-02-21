/**
 * Created by Trevor Jackson on 09-Feb-2016.
 */
var Panel = (function () {
    // TODO: constructor for panel
    // Makes a new panel with the default image (will create the image and add later!)
    function Panel(text, image_URL) {
        this.charLimit = 140;
        //Also will need various vars for the size restrictions.
        this._sizelimit = 5;
        //private _fileformat: string = ".jpg";
        this._panelHeight = 426;
        this._panelWidth = 331;
        this.text = text;
        this.image_URL = image_URL;
    }
    // Currently does nothing, as we aren't storing images
    Panel.prototype.checkImage = function (image) {
        return true;
    };
    Panel.prototype.checkText = function (text) {
        if (text.length > this.charLimit) {
            return true;
        }
        else {
            return true;
        }
    };
    Panel.prototype.updatePanel = function (text, image_URL) {
        var i = this.checkImage(image_URL);
        var j = this.checkText(text);
        if (i) {
            if (j) {
                this.text = text;
                this.image_URL = image_URL;
            }
        }
    };
    return Panel;
})();
module.exports = Panel;
//# sourceMappingURL=panel.js.map