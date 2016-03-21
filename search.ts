/**
 * Created by jes97210 on 3/20/16.
 */
import Comic = require("./comic.ts");
interface class ComicSearch {
    _queries : string[];
    searchComic:boolean(comic:Comic);
}

class ContributorSearch implements ComicSearch {
    _queries:string[];

    constructor(queries:string[]) {
        this._queries = queries;
    }

    searchComic:boolean(comic:Comic){

    }
}

class TextSearch implements ComicSearch {
    _queries:string[];

    constructor(queries:string[]) {
        this._queries = queries;
    }

    searchComic:boolean(comic:Comic){

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
            this.QUERIES.push(new ContributorSearch());
            this.QUERIES.push(new TextSearch());
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
        var results:Comic[];

        /*
        ----
        ZHU LI, DO THE THING!
        ----
         */

        return results;

    }
}
export = ComicSearchManager;
