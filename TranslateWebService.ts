/**
 * Created by Trevor Jackson on 3/18/2016.
 */
/// <reference path="express/express.d.ts" />
/// <reference path="./typings/main/ambient/request/request.d.ts" />
///  <reference path="./typings/main/ambient/form-data/form-data.d.ts" />

/*
 *             Libraries Used Throughout TranslateWebService Class
 * request - https://github.com/request/request
 *
 * */

class TranslateWebService {

    constructor() {};

    // para:
    // texts - an array of strings to be translated,
    // fromLang - Language code original language is in,
    // toLang - Language to translate into, see https://tech.yandex.com/translate/doc/dg/concepts/langs-docpage/
    // callback:function(error:string, response:string, body:string) => void - callback with a three string parameters
    // return: none
    translateText(texts: string[], fromLang:string, toLang:string, callback:(error:string, response:string, body:string) => void) {
        var request = require('request');
        var translateURL = "https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20160324T020520Z.802a346138a54409.45dcbe3970fd895d4afbae3e7787e8a43b93ecb2";

        for (var text of texts){
            translateURL = translateURL.concat("&text=" + text);
        }

        translateURL = translateURL.concat("&lang=" + fromLang + "-" + toLang);
        request.get(translateURL, callback);
        return;
    }
}
export = TranslateWebService;
