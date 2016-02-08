/// <reference path="express/express.d.ts" />
/// <reference path="node/node.d.ts" />

var express = require('express');
var stormpath = require('express-stormpath');

var app = express();
app.set('views', './views');
app.set('view engine', 'jade');
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
        fields: {
            userName: {
                enabled: true,
                label: 'User Name',
                name: 'User Name',
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
                name: 'User Type',
                placeholder: 'Enter Contributor or Viewer',
                required: true,
                type: 'text'
            },
        },
        fieldOrder: ["userName","userType", "email", "password"],
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
app.on('stormpath.ready', function () {
    console.log('Stormpath Ready');
    app.listen(3000);
});