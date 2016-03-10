/**
 * Created by Trevor Jackson on 16-Feb-2016.
 */
/// <reference path="../express/express.d.ts" />

/*
 *             Libraries Used Throughout Profile Class
 * xtend - https://www.npmjs.com/package/xtend
 * forms - https://www.npmjs.com/package/forms
 * express-stormpath - https://docs.stormpath.com/nodejs/express/latest/
 *
 * */

import express = require("express");
import Request = Express.Request;
import Response = Express.Response;

class Profile {
    constructor() {

        let cookieParser = require('cookie-parser');
        let extend = require('xtend');
        let forms = require('forms');
        let collectFormErrors = require('express-stormpath/lib/helpers').collectFormErrors;

// Declare the schema of our form:
        var profileForm = forms.create({
            givenName: forms.fields.string({required: true}),
            surname: forms.fields.string({required: true}),
            password: forms.fields.string({required: true})

        });

// A render function that will render our form and
// provide the values of the fields, as well
// as any situation-specific locals
        function renderForm(req, res, locals?) {
            res.render('profile', extend({
                title: 'My Profile',
                givenName: req.user.givenName,
                surname: req.user.surname,
                password: req.user.password
            }, locals || {}));
        }

        function profile() {

            var router = express.Router();

            router.use(cookieParser());


            // Capture all requests, the form library will negotiate
            // between GET and POST requests
            router.all('/', function (req, res) {
                profileForm.handle(req, {
                    success: function (form) {
                        // The form library calls this success method if the
                        // form is being POSTED and does not have errors

                        // The express-stormpath library will populate req.user,
                        // all we have to do is set the properties that we care
                        // about and then cal save() on the user object:
                        //req.user.userName = form.data.userName;
                        req.user.givenName = form.data.givenName;
                        req.user.surname = form.data.surname;

                        //req.user.customData.comic1 = "";
                        //req.user.customData.streetAddress = form.data.streetAddress;
                        //req.user.customData.save();
                        req.user.save(function (err) {
                            if (err) {
                                if (err.developerMessage) {
                                    console.error(err);
                                }
                                renderForm(req, res, {
                                    errors: [{
                                        error: err.userMessage ||
                                        err.message || String(err)
                                    }]
                                });
                            } else {
                                renderForm(req, res, {
                                    saved: true
                                });
                            }
                        });
                    },
                    error: function (form) {
                        // The form library calls this method if the form
                        // has validation errors.  We will collect the errors
                        // and render the form again, showing the errors
                        // to the user
                        renderForm(req, res, {
                            errors: collectFormErrors(form)
                        });
                    },
                    empty: function () {
                        // The form library calls this method if the
                        // method is GET - thus we just need to render
                        // the form
                        renderForm(req, res);
                    }
                });
            });

            // This is an error handler for this router

            router.use(function (err:Error, req:Request, res:Response, next:any) {
                // This handler catches errors for this router
                // Let the parent app handle the error
                return next(err);
            });

            return router;
        };

// Export a function which will create the
// router and return it

        module.exports = profile();
    }
}
var profile = new Profile();