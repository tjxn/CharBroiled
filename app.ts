/// <reference path="./express/express.d.ts" />
/// <reference path="./panel.ts" />
/// <reference path="./comic.ts" />
/// <reference path="./ComicWebService.ts" />
/// <reference path="./node/node.d.ts" />

/*
 *             Libraries Used Throughout Application Class
 * path - https://www.npmjs.com/package/path
 * serve-favicon - https://github.com/expressjs/serve-favicon
 * express-stormpath - https://docs.stormpath.com/nodejs/express/latest/
 * morgan - https://github.com/expressjs/morgan
 * cookie-parser - https://www.npmjs.com/package/cookie-parser
 * body-parser - https://www.npmjs.com/package/body-parser
 *
 * */



import User = require("./user");
class Application {

    constructor() {
        var express = require("express");

        var Panel = require('./panel');
        var ComicWebService = require('./ComicWebService');
        var Comic = require('./comic');
        var TranslateWebService = require('./TranslateWebService')

        let path = require('path');
        let favicon = require('serve-favicon');
        let stormpath = require('express-stormpath');
        let logger = require('morgan');
        let cookieParser = require('cookie-parser');
        let bodyParser = require('body-parser');

        var profile = require('./routes/profile');
        var routes = require('./routes/index');
        var app = express();

        // view engine setup
        app.set('views', path.join(__dirname, 'views'));
        app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
        app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
        app.use(logger('dev'));
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({extended: false}));
        app.use(cookieParser());
        app.use(express.static(path.join(__dirname, 'public')));

        app.use(stormpath.init(app, {
            client: {
                apiKey: {
                    id: '4F42CDDRB565RJ2LFG9O8IR3F',
                    secret: '3V84FQEqVIQC09AupKMmjNLxSzmXPq0vAlyDA/qgODs',
                },
            },
            application: {
                href: 'https://api.stormpath.com/v1/applications/MCCvNPvyq2KR5cl0x2POL'
            },

            website: true,
            web: {
                login: {
                    enabled: true,
                    nextUri: "/account"
                },
                register: {
                    enabled: true,
                    fields: {
                        givenName: {
                            enabled: true,
                            required: true
                        },
                        surname: {
                            enabled: true,
                            required: true
                        },
                        userType: {
                            enabled: true,
                            label: 'User Type',
                            name: 'userType',
                            placeholder: 'Enter Contributor or Viewer',
                            required: true,
                            type: 'text'
                        },
                    },
                    fieldOrder: ["givenName", "surname", "email", "password", "userType"],
                },
            },

            expand: {
                customData: true
            }

        }));


// -----------------------------------
//              ROUTING
// -----------------------------------
        app.get('/image', function (req, res) {
            res.sendFile(path.join(__dirname, 'views', 'TestImageUpload.html'));
        });
        app.use('/', stormpath.loginRequired, routes);
        app.use('/profile', stormpath.loginRequired, profile);

//--------------------------------------------------------
// ACCESSING COMIC WEB SERVICE API
// NOTE: must give a callback function, these calls are ASYNC!!!
//--------------------------------------------------------

//var panel1 = new Panel("First Panel", "www.google.ca");
//var panel2 = new Panel("First Panel", "www.google.ca");
//var comic = new Comic("Api Comic - First", false, [panel1, panel2], ["Trevor Jackson", "Joshua", "Scott", "Jelena", "Tania"]);
//comic.dbID = "56c8dcbaa759dc110004e6c5";
//
//var api = new ComicWebService();
//api.getAComic(comic.dbID, initDropzone);
//
//function initDropzone(error:string, response:string, body:string) {
//    var data = JSON.parse(body);
//
//    var title = data['Title'];
//    var pub = data['Public'];
//    var contributor3 = data['Contributors']['Contributor_3'];
//    var panel4_Text = data['Panels']['Panel_4']['Text'];
//
//    console.log(data);
//
//}
//--------------------------------------------------------
//--------------------------------------------------------


//catch 404 and forward to error handler
        app.use((req, res, next) => {
            let err:any;
            err = new Error('Not Found');
            err.status = 404;
            next(err);
        });

// error handlers

// development error handler
// will print stacktrace
        if (app.get('env') === 'development') {

            app.use((err:any, req, res, next) => {
                res.status(err['status'] || 500);
                res.render('error', {
                    message: err.message,
                    error: err
                });
            });
        }

// production error handler
// no stacktraces leaked to user
        app.use((err:any, req, res, next) => {
            res.status(err.status || 500);
            res.render('error', {
                message: err.message,
                error: {}
            });
        });


//app.on('stormpath.ready',function() {
//    console.log('Stormpath Ready');
//    app.listen(process.env.PORT || 3000);
//});

        setTimeout(function () {
            console.log('Stormpath Ready');
            var server = app.listen(process.env.PORT || 3000);
        }, 7000);
        module.exports = app;
    }
}
var app = new Application();