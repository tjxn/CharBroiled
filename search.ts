/**
 * Created by jes97210 on 3/20/16.
 */
import Comic = require("./comic.ts");

interface ComicSearch {
    _query : string;
    searchComic(comic:Object):boolean;
}

class ContributorSearch implements ComicSearch {
    _query:string;

    constructor(query:string) {
        this._query = query;
    }

    searchComic(comic:Object):boolean{
        var result = false;
            // JS: This is formatted this way for now
            // since we were talking about changing the comic db to have an array of contributors.
        var contribs = comic['Contributors'];
            if (contribs['Contributor_1'].indexOf(this._query) > -1){
                result = true;
            }
            else if (contribs['Contributor_2'].indexOf(this._query) > -1){
                result = true;
            }
            else if (contribs['Contributor_3'].indexOf(this._query) > -1){
                result = true;
            }
            else if (contribs['Contributor_4'].indexOf(this._query) > -1){
                result = true;
            }
            else if (contribs['Contributor_5'].indexOf(this._query) > -1){
                result = true;
            }
        return result;

    }
}

class TextSearch implements ComicSearch {
    _query:string;

    constructor(query:string) {
        this._query = query;
    }

    searchComic(comic:Object):boolean{
        var result = false;
            if (comic['Title'].indexOf(this._query) > -1){
                result = true;
            }
            else {
                var panels = comic['Panels'];
                if (panels['Panel_1']['Text'].indexOf(this._query) > -1){
                    result = true;
                }
                else if (panels['Panel_2']['Text'].indexOf(this._query) > -1){
                    result = true;
                }
                else if (panels['Panel_3']['Text'].indexOf(this._query) > -1){
                    result = true;
                }
                else if (panels['Panel_4']['Text'].indexOf(this._query) > -1){
                    result = true;
                }
                else if (panels['Panel_5']['Text'].indexOf(this._query) > -1){
                    result = true;
                }
                else if (panels['Panel_6']['Text'].indexOf(this._query) > -1){
                    result = true;
                }
                else if (panels['Panel_7']['Text'].indexOf(this._query) > -1){
                    result = true;
                }
                else if (panels['Panel_8']['Text'].indexOf(this._query) > -1){
                    result = true;
                }
                else if (panels['Panel_9']['Text'].indexOf(this._query) > -1){
                    result = true;
                }

        }
        return result;
    }
}

class ComicSearchManager {
    public COMICS:Object[];
    public QUERIES:ComicSearch[];

    constructor(query:string, qtypes:string[], comics:Object[]) {
        this.COMICS = comics;
        this.setQueries(qtypes, query);
    }


    // Called by the constructor to set the query types.
    // Seems like bad design right now?
    setQueries(qtypes:string[], query:string){
        if (!qtypes){
            this.QUERIES = [new TextSearch(query), new ContributorSearch(query)];
            /*this.QUERIES.push(new ContributorSearch(queries));
            this.QUERIES.push(new TextSearch(queries));*/
        }
        else {
            for (var qtype of qtypes){
                if (qtype == "Contributor"){
                    this.QUERIES = [new ContributorSearch(query)];
                }
                else if (qtype == "Text"){
                    this.QUERIES = [new TextSearch(query)];
                }
            }
        }
    }

    // This functions starts the actual search. Don't forget to call it!
    // Should return a list of Comic that has matched one of the queries set in the constructor.
    getResults():Object[]{
        var results:Object[] = [];
        for (var c of this.COMICS){
            for (var q of this.QUERIES){
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
