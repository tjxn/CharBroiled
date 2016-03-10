/**
 * Created by Trevor Jackson on 09-Feb-2016.
 */
class Panel {
    public text:string;
    public charLimit:number = 140;
    public image_URL:string;
    private _sizelimit:number = 5;
    private _panelHeight:number = 426;
    private _panelWidth:number = 331;

    constructor(text:string, image_URL:string) {
        this.text = text;
        this.image_URL = image_URL;
    }

    // para: text:string
    // Check if the string is longer than the allowed character limited
    // return: boolean
    checkText(text:string):boolean {
        if (text.length > this.charLimit) {
            return true;
        }
        else {
            return true;
        }
    }

    // para: text:string - caption on a panel, image_URL:string - url to an image for the panel
    // Check if the string is longer than the allowed character limited
    // return: none
    updatePanel(text:string, image_URL:string) {
        this.text = text;
        this.image_URL = image_URL;
    }

}
export = Panel;
