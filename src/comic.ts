/**
 * Created by jes97210 on 2/4/16.
 */
class Comic {

    _title: string;
    _publicView: boolean;
    _panelLimit: number;
    _panelList: Panel[];
    //NOTE: Just made it a list of strings, since we don't need to link the contributor name in any way right now,
    // and I assume that the list of contributors is stored in the database?
    _contributorList: string[];

    //TODO: constructor for new comic
    constructor() {
    }
    // TODO: constructor for existing comic
    constructor(public comicid: string) {
    }
    // TODO: save the comic in the database
    saveComic() {

    }
    // TODO: delete the comic from the database
    deleteComic() {

    }

}

class Panel {

    _message: string;
    _charLimit: number;
    //Also will need various vars for the size restrictions.


    // TODO: constructor for panel
    // Makes a new panel with the default image (will create the image and add later!)
    constructor() {

    }

    // TODO: check image meets constraints
    checkImage() {

    }

    // TODO: check message meets constraints
    checkMessage() {

    }
}