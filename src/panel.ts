/**
 * Created by Trevor Jackson on 09-Feb-2016.
 */
class Panel {
    public text: string;
    public charLimit: number;
    public image_URL: string;
    //Also will need various vars for the size restrictions.
    private _sizelimit: number = 5;
    private _fileformat: string = ".jpg";
    private _defaultPanel: HTMLImageElement;
    private _panelHeight: number = 426;
    private _panelWidth: number = 331;
    // TODO: constructor for panel
    // Makes a new panel with the default image (will create the image and add later!)
    constructor(text: string, image_URL: string) {
        this.text = text;
        this.image_URL = image_URL;
    }
    // TODO: check image meets constraints
    checkImage() {
    }
    // TODO: check text meets constraints
    checkText() {
    }
}