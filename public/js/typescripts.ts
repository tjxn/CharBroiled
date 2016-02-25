/// <reference path="comic" />
/// <reference path="panel" />
/// <reference path="../../ComicManager" />
/// <reference path="../../typings/browser/ambient/jquery/jquery.d.ts"/>
/// <reference path="../../typings/main/ambient/request/request.d.ts" />

import Comic = require("./comic");
import Panel = require("./panel");
import ComicManager = require("../../ComicManager");
import $ = require('jquery');
/**
 * Created by Trevor Jackson on 16-Feb-2016.
 */

// para: elementID of pictureContainer, array of urls for pictures' source
// creates img element for each url and add to given pictureContainer.
// return: none
function renderPictures(elId, urls) {

    var el = (<HTMLInputElement> document.getElementById(elId));

    for (var i = 0; i < urls.length; i++) {
        var img = document.createElement("img");
        img.src = urls[i];
        img.style.height = "300px";
        img.style.width = "300px";
        el.appendChild(img);
    }
}

function testingCall() {
    var el = (<HTMLInputElement> document.getElementById("TestCall"));

    $.post('/testingCall', {Title: "Hello World"}, function (data) {
        el.innerText = data.toString();
    });
}

// para: none
//
// return:
function setUserEmail() {
    var ID = (<HTMLInputElement> document.getElementById("userEmail"));
    $.get('/findUserEmail', function (data) {
        ID.value = data.toString();
    });
}


// the comicID is passed in the URL

// para: none
// parses the id param from URL, creates input field and sets value to the id param's value.
// return: none
function setComicID() {
    /* DEPRECATED PART - comicID is passed in URL
    var ID = (<HTMLInputElement> document.getElementById("comicID"));

    $.get('/comicID', function (data) {
        ID.value = data.toString();
    });
    */
    var comicID = getURLParameterByName("id");
    var ID = (<HTMLInputElement> document.getElementById("comicID"));
    ID.value = comicID;
    alert(comicID);

    // CANNOT ACCESS Panel AND Comic
    //var panel1 = [];
    //var panel2 = [];
    //var comic2 = new Comic("Api Comic - First", false, [panel1, panel2], ["Trevor Jackson", "Joshua", "Scott", "Jelena", "Tania"]);
    //alert("comic title: " + comic2.title);
    //var comic = comicJSON();
}

// para: string id of parameter to parse
// parses the value of the specified param
// return: string value of the specified param
function getURLParameterByName(name: string) {
    var url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

// para: none
// pulls all info for the comic from the page and compiles into comic JSON string obj.
// return: comic in JSON string format
function comicJSON() {

    var title = (<HTMLInputElement> document.getElementById("comicTitle"));
    var publicPrivate = true;
    var userEmail = (<HTMLInputElement> document.getElementById("userEmail"));
    //var el = document.getElementsByName;

    //var panels = [];
    //var contributors = [];

    //var comicObj = new Comic("test title", true, panels, contributors);
    //alert(comicObj.title);

    var comic = JSON.stringify(
        {
            Title: title.value, Public: publicPrivate,
            Contributors: {
                Contributor_1: userEmail.value,
                Contributor_2: "",
                Contributor_3: "",
                Contributor_4: "",
                Contributor_5: ""
            },
            Panels: {
                Panel_1: {
                    Image_URL: "",
                    Text: ""
                },
                Panel_2: {
                    Image_URL: "",
                    Text: ""
                },
                Panel_3: {
                    Image_URL: "",
                    Text: ""
                },
                Panel_4: {
                    Image_URL: "",
                    Text: ""
                },
                Panel_5: {
                    Image_URL: "",
                    Text: ""
                },
                Panel_6: {
                    Image_URL: "",
                    Text: ""
                },
                Panel_7: {
                    Image_URL: "",
                    Text: ""
                },
                Panel_8: {
                    Image_URL: "",
                    Text: ""
                },
                Panel_9: {
                    Image_URL: "",
                    Text: ""
                }
            }
        });

    return comic;

}

function updateTitle(){

    var comic = comicJSON();
    var comicID = (<HTMLInputElement> document.getElementById("comicID"));
    alert("updateTitle for id: " + comicID.value);

    $.ajax({
        type: "PUT",
        url: "/saveComic/" + comicID.value,
        contentType: "application/json; charset=utf-8",
        data: comic,
        async: true,
        dataType: 'json',
        timeout: 4000,
        success: function (data) {
            alert(data.Status);
        },
        error: function (xhr, status, thrownError) {
            alert('ERROR - updateTitle()');
            alert(xhr.responseText);
            alert(xhr.statusText);
            alert(status);
            alert(thrownError);
        }
    });

}

function newComic() {
    var el = (<HTMLInputElement> document.getElementById("NewComicbtn"));


    $.ajax({
        type: "POST",
        url: "/newComic",
        async: true,
        timeout: 4000,
        success: function (data) {
            if (data == "false") {
                alert("Email address already in use. Try logging in?");
                return false;
            }
            el.innerText = data.toString();
        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert(xhr.responseText);
            alert(thrownError);
        }

    });
}

function renderPanels(elId, jsonPanels) {
    var el = document.getElementById(elId);

    var TESTJSON = JSON.stringify({
        Panel_1: {
            "Image_URL": "http://cdn.toptenreviews.com/rev/prod/large/1219-i-am-bored-box.jpg",
            "Text": "Jim is bored."
        },
        Panel_2: {
            "Image_URL": "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQdzsYYH6_rIt2kiB15jRv8VWw1zaKWTJNg3L4f9jSW2Ziy0Rf9",
            "Text": "lets recharge my electric fork!"
        },
        Panel_3: {
            "Image_URL": "https://media.giphy.com/media/XevXoNu5WZxe0/giphy.gif",
            "Text": "R.I.P Jim 2016."
        }
    });

    var panelObj = JSON.parse(TESTJSON);
    //alert(JSON.stringify(panelObj));
    var panels = Object.keys(panelObj).map(function (k) {
        return panelObj[k]
    });
    //alert(panels.length);

    for (var i = 0; i < panels.length; i++) {

        var panel = document.createElement("div");
        panel.className = "col-md-4";
        panel.className += " panel";
        panel.id = "panel_" + (i + 1).toString();
        //panel.style.height = "500px";
        //panel.style.width = "500px";

        var thumbnail = document.createElement("div");
        thumbnail.className = "thumbnail";
        panel.appendChild(thumbnail);

        var img = document.createElement("img");
        img.alt = "Bootstrap Thumbnail First";
        img.src = panels[i].Image_URL;
        img.id = "panelImg_" + (i + 1).toString();
        img.style.height = "300px";
        img.style.width = "300px";
        thumbnail.appendChild(img);

        var caption = document.createElement("div");
        caption.className = "caption";
        thumbnail.appendChild(caption);

        var par = document.createElement("p");
        par.innerHTML = panels[i].Text;
        par.id = "desc_" + (i + 1).toString();
        caption.appendChild(par);

        var button = document.createElement("button");
        button.id = "button_" + (i + 1).toString();
        button.className = "btn btn-primary";
        button.innerHTML = "Edit Panel";
        button.setAttribute("data-toggle", "modal");
        button.setAttribute("role", "button");
        button.setAttribute("href", "#modal-container-94539");
        button.setAttribute("onclick", "updateModal(this)");


        var par1 = document.createElement("p");
        caption.appendChild(par);
        caption.appendChild(par1);
        par1.appendChild(button);

        el.appendChild(panel);
    }
}

function renderViewPanels(elId, jsonPanels) {
    var el = document.getElementById(elId);

    var TESTJSON = JSON.stringify({
        Panel_1: {
            "Image_URL": "https://49.media.tumblr.com/8a9eb98c7d55555b5d88d6859d5631fc/tumblr_n8uo15RRCE1sy4wkto1_500.gif",
            "Text": "TEST TEXT"
        },
        Panel_2: {
            "Image_URL": "http://www.potatoes.com/files/5713/4202/4172/07.jpg",
            "Text": "TEST TEXT2"
        },
        Panel_3: {
            "Image_URL": "http://www.potatoes.com/files/5713/4202/4172/07.jpg",
            "Text": "TEST TEXT3"
        }
    });

    var panelObj = JSON.parse(TESTJSON);
    //alert(JSON.stringify(panelObj));
    var panels = Object.keys(panelObj).map(function (k) {
        return panelObj[k]
    });
    //alert(panels.length);

    for (var i = 0; i < panels.length; i++) {

        var panel = document.createElement("div");
        panel.className = "col-md-4";
        panel.className += " panel";
        panel.id = "panel_" + (i + 1).toString();
        //panel.style.height = "500px";
        //panel.style.width = "500px";

        var thumbnail = document.createElement("div");
        thumbnail.className = "thumbnail";
        panel.appendChild(thumbnail);

        var img = document.createElement("img");
        img.alt = "Bootstrap Thumbnail First";
        img.src = panels[i].Image_URL;
        img.id = "panelImg_" + (i + 1).toString();
        img.style.height = "300px";
        img.style.width = "300px";
        thumbnail.appendChild(img);

        var caption = document.createElement("div");
        caption.className = "caption";
        thumbnail.appendChild(caption);

        var par = document.createElement("p");
        par.innerHTML = panels[i].Text;
        par.id = "desc_" + (i + 1).toString();
        caption.appendChild(par);

        el.appendChild(panel);
    }
}

function updateModal(ele) {

    var button = (<HTMLInputElement>  document.getElementById(ele.id));
    var num = button.id.substring(7);  // gets panel number = button number
    var img = (<HTMLInputElement>  document.getElementById("panelImg_" + num));
    var desc = ( document.getElementById("desc_" + num).innerHTML);
    //var modal = document.getElementById(button.getAttribute("href").substring(1));
    var urlEle = (<HTMLInputElement> document.getElementById("modalURL"));
    var descEle = (<HTMLInputElement>  document.getElementById("modalDesc"));
    var hiddenInput = (<HTMLInputElement> document.getElementById("panelNum"));

    hiddenInput.value = num;
    urlEle.value = img.getAttribute("src");
    descEle.value = desc;
}

function addPanel() {
    //comic.ts
    //comic.addPanel("Add your custom text here...","http://33.media.tumblr.com/tumblr_luknndtrik1qkq0wr.gif")
    //saveComic(this.comic);
    //renderPanels("pictureContainer");

    var i = document.getElementsByClassName("panel").length;
    //alert(i);
    var url = "http://strategyjournal.ru/wp-content/themes/strategy/img/default-image.jpg";
    var desc = "enter text here";
    var el = document.getElementById("pictureContainer");

    var panel = document.createElement("div");
    panel.className = "col-md-4";
    panel.className += " panel";
    panel.id = "panel_" + (i + 1).toString();
    //panel.style.height = "500px";
    //panel.style.width = "500px";

    var thumbnail = document.createElement("div");
    thumbnail.className = "thumbnail";
    panel.appendChild(thumbnail);

    var img = document.createElement("img");
    img.alt = "Bootstrap Thumbnail First";
    img.src = url;
    img.id = "panelImg_" + (i + 1).toString();
    img.style.height = "300px";
    img.style.width = "300px";
    thumbnail.appendChild(img);

    var caption = document.createElement("div");
    caption.className = "caption";
    thumbnail.appendChild(caption);

    var par = document.createElement("p");
    par.innerHTML = desc;
    par.id = "desc_" + (i + 1).toString();
    caption.appendChild(par);

    var button = document.createElement("button");
    button.id = "button_" + (i + 1).toString();
    button.className = "btn btn-primary";
    button.innerHTML = "Edit Panel";
    button.setAttribute("data-toggle", "modal");
    button.setAttribute("role", "button");
    button.setAttribute("href", "#modal-container-94539");
    button.setAttribute("onclick", "updateModal(this)");


    var par1 = document.createElement("p");
    caption.appendChild(par);
    caption.appendChild(par1);
    par1.appendChild(button);

    el.appendChild(panel);
}

//function updateTitle(elId){
//    var newTitle = document.getElementById(elId).value;
//    //comic.ts
//    comic.updateTitle(newTitle);
//    //saveComic(this.comic);
//    renderTitle(elId);
//}

//function renderTitle(elId){
//    //comic.ts
//    var el = document.getElementById(elId);
//    el.value = comic.title();
//}

function updatePanel(elId) {

    var url = (<HTMLInputElement>  document.getElementById("modalURL"));
    var desc = (<HTMLInputElement> document.getElementById("modalDesc")).value;

    var num = (<HTMLInputElement>  document.getElementById("panelNum")).value;
    var temp = (<HTMLImageElement> document.getElementById("panelImg_" + num));
    temp.src = url.value;

    (<HTMLInputElement>  document.getElementById("desc_" + num)).innerHTML = desc;

    //comic.updatePanel(pNum, url, desc);
    //saveComic(this.comic);

}


//function renderViewTitle(elID){
//    var title = document.getElementById(elID);
//    title.innerHTML = comic.title;
//}
