/**
 * Created by jes97210 on 3/23/16.
 */
var Panel = require(['Panel']);
var ComicSearchManager = require(['ComicSearchManager']);
var Comic = require(['Comic']);

describe("Testing ComicSearchManager", function () {
    describe("Can I call the constructor with an empty type array?", function () {
        it("Returns the defualt setting for querries", function () {
            var text = "I'm text";
            var url = "imaurl";
            var somepanel = new Panel(text, url);
            var somepanels = [somepanel, somepanel, somepanel];
            var somecomic = new Comic("I'm a title", true, somepanels, ["me", "you", "that other guy"]);
            var somesearch = new ComicSearchManager(["I'm a querry"], [], [somecomic]);
            expect(somesearch.COMICS).toBe([somecomic]);
            expect(somesearch.QUERIES).not.toBe(null);
        });
    });
});
//# sourceMappingURL=searchspec.js.map