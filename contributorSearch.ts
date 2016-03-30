/**
 * Created by jes97210 on 3/29/16.
 */
class ContributorSearch {
    public USERS:Object[];
    public QUERY:string;

    constructor(query:string, users:Object[]){
        this.USERS = users;
        this.QUERY = query;
    }

    getResults():string[]{
        var rawarr = new Array<string>();
        for (var u of this.USERS){
            if (u['UserType'] == 'Contributor'){
                if (u['Email'].indexOf(this.QUERY) > -1){
                    var uarr = u['Contributed'];
                    for (var ua of uarr){
                        if (rawarr.indexOf(ua) < 0){
                            rawarr.push(ua);
                        }
                    }
                }
            }
        }
        return rawarr;
    }

}

export = ContributorSearch;