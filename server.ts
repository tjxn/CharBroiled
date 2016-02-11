/// <reference path="express/express.d.ts" />
/// <reference path="body-parser/body-parser.d.ts" />
/// <reference path="ComicWebService.ts" />

var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var express = require('express');
var stormpath = require('express-stormpath');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

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
        register: {
            enabled: true,
            fields: {
                userName: {
                    enabled: true,
                    label: 'User Name',
                    name: 'userName',
                    placeholder: 'User Name',
                    required: true,
                    type: 'text'
                },
                givenName: {
                    enabled: false,
                    required: false
                },
                surname: {
                    enabled: false,
                    required: false
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
            fieldOrder: ["userName", "userType", "email", "password"],
        },
    },

    expand: {
        customData: true
    }

}));

app.get('/', function (req, res) {
    res.render('login', {
        title: 'Welcome'
    });
});

app.use('/profile', stormpath.loginRequired, require('./routes/profile')());

//--------------------------------------------------------
// ACCESSING COMIC WEB SERVICE API
// NOTE: must give a callback function, these calls are ASYNC!!!
//--------------------------------------------------------

var panel1 = new Panel("First Panel", "www.google.ca");
var panel2 = new Panel("First Panel", "www.google.ca");
var comic = new Comic("Api Comic - First", false, [panel1, panel2], ["Trevor Jackson", "Joshua", "Scott", "Jelena", "Tania"]);
comic.dbID = "56b44b8284566860217dad39";

var api = new ComicWebService();
api.getAComicById(comic.dbID, test);

function test (error:string, response:string, body:string){
    var data = JSON.parse(body);

    var title = data['Title'];
    var pub = data['Public'];
    var contributor3 = data['Contributors']['Contributor_3'];
    var panel4_Text = data['Panels']['Panel_4']['Text'];

    console.log(data);

}
//--------------------------------------------------------
//--------------------------------------------------------

app.on('stormpath.ready', function () {
    console.log('Stormpath Ready');
    app.listen(3000);
});
