/**
 * Created by jes97210 on 3/8/16.
 */
var request = require (["request"]);

var base_url = "http://localhost:3000/";

describe("Testing default", function() {
    describe("GET /", function() {
        it("returns status code 200", function() {
            request( {method: 'GET', uri: base_url}, function(response) {
                expect(response.statusCode).toBe(200);
                done();
            });
        });
    });
    describe("PUT /", function() {
        it("returns status code 404", function() {
            request( {method: 'PUT', uri: base_url}, function(response) {
                expect(response.statusCode).toBe(404);
                done();
            });
        });
    });
    describe("POST /", function() {
        it("returns status code 404", function() {
            request( {method: 'POST', uri: base_url}, function(response) {
                expect(response.statusCode).toBe(404);
                done();
            });
        });
    });
    describe("DELETE /", function() {
        it("returns status code 404", function() {
            request( {method: 'DELETE', uri: base_url}, function(response) {
                expect(response.statusCode).toBe(404);
                done();
            });
        });
    });
});