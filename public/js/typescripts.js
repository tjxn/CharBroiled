/// <reference path="comic" />
/// <reference path="panel" />
/// <reference path="../../typings/browser/ambient/jquery/jquery.d.ts"/>
/// <reference path="../../typings/main/ambient/request/request.d.ts" />
/// <reference path="../../typings/main/ambient/bootstrap-notify/bootstrap-notify.d.ts" />
/**
 * Created by Trevor Jackson on 16-Feb-2016.
 */
var comicJSONObj;
// para: elementID of pictureContainer, array of urls for pictures' source
// creates img element for each url and add to given pictureContainer.
// return: none
function renderPictures(elId, urls) {
    var el = document.getElementById(elId);
    for (var i = 0; i < urls.length; i++) {
        var img = document.createElement("img");
        img.src = urls[i];
        img.style.height = "300px";
        img.style.width = "300px";
        el.appendChild(img);
    }
}
function testingCall() {
    var el = document.getElementById("TestCall");
    $.post('/testingCall', { Title: "Hello World" }, function (data) {
        var note = $.notify({
            // options
            icon: 'glyphicon glyphicon-ok',
            title: '',
            message: data.toString(),
            url: '',
            target: '_blank'
        }, {
            // settings
            element: 'body',
            position: null,
            type: "success",
            allow_dismiss: true,
            newest_on_top: false,
            showProgressbar: false,
            placement: {
                from: "top",
                align: "right"
            },
            offset: 20,
            spacing: 10,
            z_index: 1031,
            delay: 5000,
            timer: 1000,
            url_target: '_blank',
            mouse_over: null,
            animate: {
                enter: 'animated fadeInDown',
                exit: 'animated fadeOutUp'
            },
            onShow: null,
            onShown: null,
            onClose: null,
            onClosed: null,
            icon_type: 'class',
            template: '<div data-notify="container" class="col-xs-11 col-sm-3 alert alert-{0}" role="alert">' +
                '<button type="button" aria-hidden="true" class="close" data-notify="dismiss">×</button>' +
                '<span data-notify="icon"></span> ' +
                '<span data-notify="title">{1}</span> ' +
                '<span data-notify="message">{2}</span>' +
                '<div class="progress" data-notify="progressbar">' +
                '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
                '</div>' +
                '<a href="{3}" target="{4}" data-notify="url"></a>' +
                '</div>'
        });
    });
}
function image() {
    var el = document.getElementById("ImageCall");
    $.post('/image', { Title: "Hello World" }, function (data) {
        el.innerText = data.toString();
    });
}
// para: none
// sends GET request to get user's email. Sets value of userEmail element.
// return: none
function setUserEmail() {
    var ID = document.getElementById("userEmail");
    $.get('/findUserEmail', function (data) {
        ID.value = data.toString();
    });
}
// para: none
// parses the id param from URL, creates input field and sets value to the id param's value.
// return: none
function setComicID() {
    var comicID = getURLParameterByName("id");
    var ID = document.getElementById("comicID");
    ID.value = comicID;
    return comicID;
}
// para: id for comic to get
// sends GET request to get comic JSON object. Sets value of comicStr element.
// renders comic onto page.
// return: none
function renderEditComic(id) {
    var hiddenString = document.getElementById("comicStr");
    var comicStr;
    $.get('/comicJSON/' + id, function (data) {
        comicJSONObj = JSON.parse(data);
        console.log(data);
        var comicTitle = document.getElementById("comicTitle");
        comicTitle.value = comicJSONObj.Title;
        var publicPrivate = document.getElementById("optradio");
        if (comicJSONObj.Public == true) {
            var publicPrivate = document.getElementById("publicBtn");
            publicPrivate.checked = true;
        }
        else {
            var publicPrivate = document.getElementById("privateBtn");
            publicPrivate.checked = true;
        }
        //console.log(comicJSONObj.Panels);
        renderPanels("pictureContainer", comicJSONObj.Panels, true);
    });
}
// para: id for comic to get
// sends GET request to get comic JSON object. Sets value of comicStr element.
// renders comic onto page.
// return: none
function renderViewComic(id) {
    var hiddenString = document.getElementById("comicStr");
    var comicStr;
    $.get('/comicJSON/' + id, function (data) {
        comicJSONObj = JSON.parse(data);
        console.log(data);
        var comicTitle = document.getElementById("comicTitle");
        if (comicJSONObj.Public == true) {
            comicTitle.value = comicJSONObj.Title;
            //console.log(comicJSONObj.Panels);
            renderPanels("pictureContainer", comicJSONObj.Panels, false);
        }
        else {
            comicTitle.value = "This comic is private.";
        }
    });
}
// para: string id of parameter to parse
// parses the value of the specified param
// return: string value of the specified param
function getURLParameterByName(name) {
    var url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"), results = regex.exec(url);
    if (!results)
        return null;
    if (!results[2])
        return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
// para: none
// PUT request to save the comicJSONObj to the server
// return: none
function saveComic() {
    var comicID = document.getElementById("comicID");
    var newTitle = document.getElementById("comicTitle");
    comicJSONObj.Title = newTitle.value;
    var publicPrivate = document.getElementById("publicBtn");
    if (publicPrivate.checked == true) {
        comicJSONObj.Public = true;
    }
    else {
        comicJSONObj.Public = false;
    }
    var comic = JSON.stringify(comicJSONObj);
    console.log(comic);
    $.ajax({
        type: "PUT",
        url: "/saveComic/" + comicID.value,
        contentType: "application/json; charset=utf-8",
        data: comic,
        async: true,
        dataType: 'json',
        timeout: 4000,
        success: function (data) {
            var note = $.notify({
                // options
                icon: 'glyphicon glyphicon-ok',
                title: '',
                message: data.Status,
                url: '',
                target: '_blank'
            }, {
                // settings
                element: 'body',
                position: null,
                type: "success",
                allow_dismiss: true,
                newest_on_top: false,
                showProgressbar: false,
                placement: {
                    from: "top",
                    align: "right"
                },
                offset: 20,
                spacing: 10,
                z_index: 1031,
                delay: 5000,
                timer: 1000,
                url_target: '_blank',
                mouse_over: null,
                animate: {
                    enter: 'animated fadeInDown',
                    exit: 'animated fadeOutUp'
                },
                onShow: null,
                onShown: null,
                onClose: null,
                onClosed: null,
                icon_type: 'class',
                template: '<div data-notify="container" class="col-xs-11 col-sm-3 alert alert-{0}" role="alert">' +
                    '<button type="button" aria-hidden="true" class="close" data-notify="dismiss">×</button>' +
                    '<span data-notify="icon"></span> ' +
                    '<span data-notify="title">{1}</span> ' +
                    '<span data-notify="message">{2}</span>' +
                    '<div class="progress" data-notify="progressbar">' +
                    '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
                    '</div>' +
                    '<a href="{3}" target="{4}" data-notify="url"></a>' +
                    '</div>'
            });
        },
        error: function (xhr, status, thrownError) {
            alert('ERROR - saveComic()');
            alert(xhr.responseText);
            alert(xhr.statusText);
            alert(status);
            alert(thrownError);
        }
    });
}
// para: none
// POST request to create new comic
// return: none
function newComic() {
    var el = document.getElementById("NewComicbtn");
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
// para: elementID of panel container, JSON object of panels, bool: true = edit mode and false = view mode
//
// return: none
function renderPanels(elId, jsonPanels, edit) {
    var el = document.getElementById(elId);
    /*
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
    */
    var panels = jsonPanels;
    var length = lengthJSON(panels);
    for (var i = 1; i <= length; i++) {
        var url = panels['Panel_' + i].Image_URL;
        var desc = panels['Panel_' + i].Text;
        if (url != "" || desc != "") {
            var panel = document.createElement("div");
            panel.className = "col-md-4";
            panel.className += " panel";
            panel.id = "panel_" + (i).toString();
            //panel.style.height = "500px";
            //panel.style.width = "500px";
            var thumbnail = document.createElement("div");
            thumbnail.className = "thumbnail";
            panel.appendChild(thumbnail);
            var img = document.createElement("img");
            img.alt = "Bootstrap Thumbnail First";
            img.src = panels["Panel_" + i].Image_URL;
            img.id = "panelImg_" + (i).toString();
            img.style.height = "300px";
            img.style.width = "300px";
            thumbnail.appendChild(img);
            var caption = document.createElement("div");
            caption.className = "caption";
            thumbnail.appendChild(caption);
            var par = document.createElement("p");
            par.innerHTML = panels["Panel_" + i].Text;
            par.id = "desc_" + (i).toString();
            caption.appendChild(par);
            if (edit) {
                var button = document.createElement("button");
                button.id = "button_" + (i).toString();
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
            }
            el.appendChild(panel);
        }
    }
}
// para: JSON object to evaluate
// counts the number of properties/fields in the given object
// return: number of fields in given JSON object
function lengthJSON(json) {
    var count = 0;
    var i;
    for (i in json) {
        if (json.hasOwnProperty(i)) {
            count++;
        }
    }
    return count;
}
// para: button element
// extracts number from button element and updates the Modal with the appropriate info
// return: none
function updateModal(ele) {
    var button = document.getElementById(ele.id);
    var num = button.id.substring(7); // gets panel number = button number
    var img = document.getElementById("panelImg_" + num);
    var desc = (document.getElementById("desc_" + num).innerHTML);
    //var modal = document.getElementById(button.getAttribute("href").substring(1));
    var urlEle = document.getElementById("modalURL");
    var descEle = document.getElementById("modalDesc");
    var hiddenInput = document.getElementById("panelNum");
    hiddenInput.value = num;
    urlEle.value = img.getAttribute("src");
    descEle.value = desc;
}
// para: none
// creates default panal and adds to
// return: none
function addPanel() {
    var i = document.getElementsByClassName("panel").length;
    var numStr = (i + 1).toString();
    //alert(i);
    var url = "http://strategyjournal.ru/wp-content/themes/strategy/img/default-image.jpg";
    var desc = "enter text here";
    var el = document.getElementById("pictureContainer");
    var panel = document.createElement("div");
    panel.className = "col-md-4";
    panel.className += " panel";
    panel.id = "panel_" + numStr;
    //panel.style.height = "500px";
    //panel.style.width = "500px";
    var thumbnail = document.createElement("div");
    thumbnail.className = "thumbnail";
    panel.appendChild(thumbnail);
    var img = document.createElement("img");
    img.alt = "Bootstrap Thumbnail First";
    img.src = url;
    img.id = "panelImg_" + numStr;
    img.style.height = "300px";
    img.style.width = "300px";
    thumbnail.appendChild(img);
    var caption = document.createElement("div");
    caption.className = "caption";
    thumbnail.appendChild(caption);
    var par = document.createElement("p");
    par.innerHTML = desc;
    par.id = "desc_" + numStr;
    caption.appendChild(par);
    var button = document.createElement("button");
    button.id = "button_" + numStr;
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
    // update comicJSONObj and save
    var url = document.getElementById("panelImg_" + numStr).src;
    var desc = document.getElementById("desc_" + numStr).innerHTML;
    comicJSONObj["Panels"]["Panel_" + numStr].Image_URL = url;
    comicJSONObj["Panels"]["Panel_" + numStr].Text = desc;
    saveComic();
}
// para: none
// removes the HTML element of the last panel, updates comicJSONObj accordingly, saves Comic
// return: none
function removePanel() {
    var i = countPanels();
    var id = "panel_" + i;
    document.getElementById(id).remove();
    comicJSONObj['Panels']["Panel_" + i].Image_URL = "";
    comicJSONObj['Panels']["Panel_" + i].Text = "";
    saveComic();
}
// para: none
// iterates through panels in comicJSONObj and counts panels in use
// return: number of panels in use in comicJSONObj
function countPanels() {
    var panels = comicJSONObj.Panels;
    var count = 0;
    console.log(comicJSONObj);
    for (var i = 1; i <= 9; i++) {
        var url = panels['Panel_' + i].Image_URL;
        var desc = panels['Panel_' + i].Text;
        if (url != "" || desc != "") {
            //alert(url + " " + desc);
            count++;
        } // don't add else since order of traversal is unknown/not reliable
    }
    return count;
}
function updatePanel(elId) {
    var url = document.getElementById("modalURL").value;
    var desc = document.getElementById("modalDesc").value;
    var numStr = document.getElementById("panelNum").value;
    var panelImg = document.getElementById("panelImg_" + numStr);
    panelImg.src = url;
    document.getElementById("desc_" + numStr).innerHTML = desc;
    comicJSONObj["Panels"]["Panel_" + numStr].Image_URL = url;
    comicJSONObj["Panels"]["Panel_" + numStr].Text = desc;
    saveComic();
}
// used in login.jade
// looks up the id of the comic associated with a user
// redirects the user to the edit page of that comic
function gotoComic() {
    $.get('/comic', function (data) {
        window.location.replace("/edit?id=" + data);
    });
}
// used in login.jade
// looks up the id of the comic associated with a user
// redirects the user to the edit page of that comic
function gotoViewComic() {
    $.get('/comic', function (data) {
        window.location.replace("/view?id=" + data);
    });
}
// javascript remove element
Element.prototype.remove = function () {
    this.parentElement.removeChild(this);
};
NodeList.prototype.remove = HTMLCollection.prototype.remove = function () {
    for (var i = this.length - 1; i >= 0; i--) {
        if (this[i] && this[i].parentElement) {
            this[i].parentElement.removeChild(this[i]);
        }
    }
};
//# sourceMappingURL=typescripts.js.map