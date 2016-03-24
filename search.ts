/**
 * Created by jes97210 on 3/20/16.
 */
import Comic = require("./comic.ts");

interface ComicSearch {
    _queries : string[];
    searchComic(comic:Comic):boolean;
}

class ContributorSearch implements ComicSearch {
    _queries:string[];

    constructor(queries:string[]) {
        this._queries = queries;
    }

    searchComic(comic:Comic):boolean{
        var result = false;
        for (var q of this._queries){
            // JS: This is formatted this way for now
            // since we were talking about changing the comic db to have an array of contributors.
            if (comic.Contributor_1.indexOf(q) > -1){
                result = true;
            }
            else if (comic.Contributor_2.indexOf(q) > -1){
                result = true;
            }
            else if (comic.Contributor_3.indexOf(q) > -1){
                result = true;
            }
            else if (comic.Contributor_4.indexOf(q) > -1){
                result = true;
            }
            else if (comic.Contributor_5.indexOf(q) > -1){
                result = true;
            }
        }
        return result;

    }
}

class TextSearch implements ComicSearch {
    _queries:string[];

    constructor(queries:string[]) {
        this._queries = queries;
    }

    searchComic(comic:Comic):boolean{
        var result = false;
        for (var q of this._queries){
            if (comic.title.indexOf(q) > -1){
                result = true;
            }
            else {
                for (var p of comic.panels){
                    if (p.text.indexOf(q) > -1){
                        result = true;
                    }
                }
            }
        }
        return result;
    }
}

class ComicSearchManager {
    public COMICS:Comic[];
    public QUERIES:ComicSearch[];

    constructor(queries:string[], qtypes:string[], comics:Comic[]) {
        this.COMICS = comics;
        this.setQueries(qtypes, queries);
    }


    // Called by the constructor to set the query types.
    // Seems like bad design right now?
    setQueries(qtypes:string[], queries:string[]){
        if (!qtypes){
            this.QUERIES.push(new ContributorSearch(queries));
            this.QUERIES.push(new TextSearch(queries));
        }
        else {
            for (var qtype of qtypes){
                if (qtype == "Contributor"){
                    this.QUERIES.push(new ContributorSearch(queries));
                }
                else if (qtype == "Text"){
                    this.QUERIES.push(new TextSearch(queries));
                }
            }
        }
    }

    // This functions starts the actual search. Don't forget to call it!
    // Should return a list of Comic that has matched one of the queries set in the constructor.
    getResults():Comic[]{
        var results:Comic[] = [];
        for (var c in this.COMICS){
            for (var q in this.QUERIES){
                if (q.searchComic(c)){
                    results.push(c);
                    break;
                }
            }
        }
        return results;
    }
}
export = ComicSearchManager;
