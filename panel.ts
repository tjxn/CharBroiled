/**
 * Created by Trevor Jackson on 09-Feb-2016.
 */
class Panel {
    public text: string;
    public charLimit: number = 140;
    public image_URL: string;
    //Also will need various vars for the size restrictions.
    private _sizelimit: number = 5;
    //private _fileformat: string = ".jpg";
    private _panelHeight: number = 426;
    private _panelWidth: number = 331;
    // TODO: constructor for panel
    // Makes a new panel with the default image (will create the image and add later!)
    constructor(text: string, image_URL: string) {
        this.text = text;
        this.image_URL = image_URL;
    }
    // Currently does nothing, as we aren't storing images
    function checkImage(image: string) {
        return True;
    }

    function checkText(text: string) {
        if (text.length > charLimit) {
            return False;
        }
        else {
            return True;
        }
    }
    function updatePanel(text: string, image_URL: string){
        var i = checkImage(image_URL);
        var j = checkText(text);
        if (i){
            if (j){
                this.text = text;
                this.image_URL = image_URL;
            }
            // Want to recieve an error that the text is over the limit?
        }
}
}