/**
 * Created by ScottHenry on 2016-03-31.
 */

var request = require (["request"]);

var baseurl = 'http://charbroiled-user-api.herokuapp.com/user/'

describe("Testing userdb calls", function() {
    describe("404 return on DELETE baseurl/user", function() {
        request( {method: 'DELETE',
            url: baseurl},
            function(response) {
                expect(response.statusCode.toBe(404));
                done();
        });
    });

    describe("404 return on PUT baseurl/user", function() {
        request( {method: 'PUT',
        url: baseurl},
        function(response) {
            expect(response.statusCode.toBe(404));
            done();
        });
    });

    describe("200 return on GET baseurl/user", function() {
        request( {method: 'GET', url: baseurl},
        function(response) {
            expect(response.statusCode.toBe(200));
            done();
        });
    });

    describe("returns 200 with a valid user email get call", function() {
        request( {method: 'GET',
            url: baseurl + "email/jes97210@gmail.com"},
        function(response) {
            expect(response.statusCode.toBe(200));
            done();
        });
    });

    describe("returns 200 with an invalid user email get call", function() {
        request( {method: 'GET',
        url: baseurl + "email/bad@bad.com"},
        function(response) {
            expect(response.statusCode.toBe(200));
            done();
        });
    });
});