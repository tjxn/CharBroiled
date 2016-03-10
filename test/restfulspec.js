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
    describe("bad POST /login", function() {
        request( {method: 'POST',
            url: base_url + "/login?next=%2F",
            json: {
                "username": "bad@mbad.com",
                "password": "doublebad"}
        }, function(response){
            expect(response.statusCode).toBe(404);
            done();
        });
    });
});