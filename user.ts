import UserWebService = require("./UserWebService");
/**
 * Created by Trevor Jackson on 3/18/2016.
 */
/// <reference path="express/express.d.ts" />
/// <reference path="./typings/main/ambient/request/request.d.ts" />
/// <reference path="./typings/main/ambient/form-data/form-data.d.ts" />

class User {
    UserID:string;
    StormpathID:string;
    Favourites:String[];
    Contributed:String[];
    UserType:string;
    Email:string;

    constructor(StormpathID:string, Favourites:String[], Contributed:String[], UserType:string, Email:string) {
        this.UserID = "";
        this.StormpathID = StormpathID;
        this.Favourites = Favourites;
        this.Contributed = Contributed;
        this.UserType = UserType;
        this.Email = Email;
    }

    setUserID(){
        var user = this;
        // GET request to User API
        // Get list of all Users
        // Find User whose Stormpath ID matches that of this user
        // Set this object's UserID to the database ID of the User we matched to
        var api = new UserWebService();
        api.getAllUsers(function (error:string, response:string, body:string) {
            console.log(body);
            var temp = JSON.parse(body);
            // Check if this object has a corresponding object in the User Database
            // If so assign UserID to User Database object's ID
            for (var i = 0; i < temp.length; i++) {

                if (temp[i].Email == user.Email) {
                    user.UserID = temp[i]._id;
                    return;
                }
            }

            // Create new User in database based on this object since one doesn't exist yet
            api.newUser(user, function(error:string, response:string, body:string){
                var temp = JSON.parse(body);
                user.UserID = temp._id;
            });

        });
        return;
    }
}
export = User;