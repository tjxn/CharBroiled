/**
 * Created by jes97210 on 3/20/16.
 */

class ComicSearch {
    public COMICS:Object[];
    public QUERY:string;

    constructor(query:string, comics:Object[]) {
        this.COMICS = comics;
        this.QUERY = query;
    }

    // This functions starts the actual search. Don't forget to call it!
    // Should return a list of Comic that has matched one of the queries set in the constructor.
    getResults():Object[]{
        var results:Object[] = [];
        if (this.QUERY == '' || this.QUERY == ' '){
            results = this.COMICS;
            return results;
        }

        for (var c of this.COMICS){
                if (this.searchComic(c)){
                    results.push(c);
                }
        }
        return results;
    }

    searchComic(comic:Object):boolean{
        var result = false;
        if (comic['Title'].indexOf(this.QUERY) > -1){
            result = true;
        }
        else {
            var panels = comic['Panels'];
            if (panels['Panel_1']['Text'].indexOf(this.QUERY) > -1){
                result = true;
            }
            else if (panels['Panel_2']['Text'].indexOf(this.QUERY) > -1){
                result = true;
            }
            else if (panels['Panel_3']['Text'].indexOf(this.QUERY) > -1){
                result = true;
            }
            else if (panels['Panel_4']['Text'].indexOf(this.QUERY) > -1){
                result = true;
            }
            else if (panels['Panel_5']['Text'].indexOf(this.QUERY) > -1){
                result = true;
            }
            else if (panels['Panel_6']['Text'].indexOf(this.QUERY) > -1){
                result = true;
            }
            else if (panels['Panel_7']['Text'].indexOf(this.QUERY) > -1){
                result = true;
            }
            else if (panels['Panel_8']['Text'].indexOf(this.QUERY) > -1){
                result = true;
            }
            else if (panels['Panel_9']['Text'].indexOf(this.QUERY) > -1){
                result = true;
            }

        }
        return result;
    }
}
export = ComicSearch;
