/**
 * Created by jes97210 on 3/9/16.
 */
var request = require (["request"]);

var base_url = "http://localhost:3000/";

describe("Anything to do with comics", function() {
    describe("GET /edit", function() {
        it("returns status code 200", function() {
            request( {method: 'GET', uri: base_url + '/edit'}, function(response) {
                expect(response.statusCode).toBe(200);
                done();
            });
        });
    });
});