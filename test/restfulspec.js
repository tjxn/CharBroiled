/**
 * Created by jes97210 on 3/8/16.
 */
var request = require (["request"]);

var base_url = "http://localhost:3000/";

describe("Testing default", function() {
    describe("GET /", function() {
        it("returns status code 200", function() {
            request( {method: 'GET', url: base_url}, function(response) {
                expect(response.statusCode).toBe(200);
                done();
            });
        });
    });
    describe("PUT /", function() {
        it("returns status code 404", function() {
            request( {method: 'PUT', url: base_url}, function(response) {
                expect(response.statusCode).toBe(404);
                done();
            });
        });
    });
    describe("POST /", function() {
        it("returns status code 404", function() {
            request( {method: 'POST', url: base_url}, function(response) {
                expect(response.statusCode).toBe(404);
                done();
            });
        });
    });
    describe("DELETE /", function() {
        it("returns status code 404", function() {
            request( {method: 'DELETE', url: base_url}, function(response) {
                expect(response.statusCode).toBe(404);
                done();
            });
        });
    });
});
describe("testing /login", function() {
    describe("bad login attempt", function() {
       it("returns status code 400", function() {
    request( {method: 'POST',
     url: base_url + "/login",
        contentType: "application/json; charset=utf-8",
        dataType:'json',
     json: {
     "username": "bad@mbad.com",
     "password": "doublebad"}
     }, function(response) {
        expect(response.statusCode).toBe(400);
        done();
    });
    });
    });
    describe("good login attempt", function() {
        it("returns status code 200", function() {
            request( {method: 'POST',
                url: base_url + "/login",
                contentType: "application/json; charset=utf-8",
                dataType: 'json',
                json: {
                    "username": "charbroiledtestcontrib@mailinator.com",
                    "password": "charbroiledtestcontrib"}
            }, function(response) {
                expect(response.statusCode).toBe(200);
                done();
            });

        });
    });
});