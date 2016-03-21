/**
 * Created by Trevor Jackson on 3/18/2016.
 */
/// <reference path="express/express.d.ts" />
/// <reference path="./typings/main/ambient/request/request.d.ts" />
///  <reference path="./typings/main/ambient/form-data/form-data.d.ts" />

/*
 *             Libraries Used Throughout UserWebService Class
 * request - https://github.com/request/request
 *
 * */

import User = require ("./user");

class UserWebService {

    constructor() {};

    // para: callback:function(error:string, response:string, body:string) => void - callback with a three string parameters
    // retrieve every single user in the mongo user database
    // return: none
    getAllUsers(callback:(error:string, response:string, body:string) => void) {
        var request = require('request');
        request.get('http://charbroiled-user-api.herokuapp.com/user/', callback);
        return;
    }

    // para: ids:string[] - ids of users, callback:function(error:string, response:string, body:string) => void - callback with a three string parameters
    // Given an array of user ids, get the associated JSON user objects from the user database
    // return: none
    getUsers(ids: string[], callback:(error:string, response:string, body:string) => void) {
        var request = require('request');
        request.get('http://charbroiled-user-api.herokuapp.com/user/', function (err:string, res:string, bod:string) {
            var ans = {};
            var temp = JSON.parse(bod);
            //console.log(temp);
            if(typeof ids === 'undefined') {
                //console.log("given list of ids is empty");
            } else {
                var k=0;
                for (var i = 0; i < temp.length; i++) {
                    for (var j = 0; j < ids.length; j++) {
                        if (temp[i]._id == ids[j]) { // if this comic is a fav
                            ans[k] = temp[i];
                            k++;
                        }
                    }
                }
            }
            callback(err, res, JSON.stringify(ans));
        });
        return;
    }


    // para: ids:string - id of user, callback:function(error:string, response:string, body:string) => void - callback with a three string parameters
    // Given a user id, get the associated JSON user object from the user database
    // return: none
    getAUser(userId:string, callback:(error:string, response:string, body:string) => void) {

        var request = require('request');
        request.get('http://charbroiled-user-api.herokuapp.com/user/' + userId, callback);
        return;
    }


    // para: ids:string - id of user, callback:function(error:string, response:string, body:string) => void - callback with a three string parameters
    // Given a user id, delete the associated JSON user object from the user mongo database
    // return: none
    deleteAUser(userId:string, callback:(error:string, response:string, body:string) => void) {

        var request = require('request');
        var options = {
            method: 'DELETE',
            url: 'http://charbroiled-user-api.herokuapp.com/user/' + userId,
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
            }
        };
        request(options, callback);
        return;
    }


    // para: ids:string - id of user, callback:function(error:string, response:string, body:string) => void - callback with a three string parameters
    // Create a new user in the user mongo database
    // return: none
    newUser(user:User, callback:(error:string, response:string, body:string) => void) {

        var request = require('request');

        var options = {
            method: 'POST',
            url: 'http://charbroiled-user-api.herokuapp.com/user/',
            headers: {
                'content-type': 'application/json'
            },
            body: {
                StormpathID: user.StormpathID,
                Favourites: user.Favourites,
                Contributed: user.Contributed,
                UserType: user.UserType,
                Email: user.Email
            },
            json: true
        };
        request(options, callback);

        return;
    }

    // para: user:User - User Object, callback:function(error:string, response:string, body:string) => void - callback with a three string parameters
    // Given a user object update the associated user object in the mongo database
    // return: none
    updateUser(user:User, callback:(error:string, response:string, body:string) => void) {
        var request = require("request");

        var options = {
            method: 'PUT',
            url: 'http://charbroiled-user-api.herokuapp.com/user/' + user.UserID,
            headers: {
                'content-type': 'application/json'
            },
            body: {
                StormpathID: user.StormpathID,
                Favourites: user.Favourites,
                Contributed: user.Contributed,
                UserType: user.UserType,
                Email: user.Email
            },
            json: true
        };

        request(options, callback);

        return
    }

}
export = UserWebService;
