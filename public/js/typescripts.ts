
/// <reference path="../../typings/browser/ambient/jquery/jquery.d.ts"/>
/// <reference path="../../typings/main/ambient/request/request.d.ts" />
/// <reference path="../../typings/main/ambient/bootstrap-notify/bootstrap-notify.d.ts" />
/// <reference path="../../typings/main/ambient/dropzone/dropzone.d.ts" />
/**
 * Created by Trevor Jackson on 16-Feb-2016.
 */

var myDrop;
var comicJSONObj;
var JSONObj;


// Removes all files from Dropzone
// Called when modal is closed
function clearDropzone(){
    myDrop.removeAllFiles();
}

// Checks every click, if it is a click on a thumbnail in dropzone
// then change the modal url to the thumbnail's url
$(document).on("click",".dz-details", function(){
    var cloudinary_URL = (<HTMLInputElement> document.getElementById("cloudinary_URL"));
    var panelURL = (<HTMLInputElement> document.getElementById("modalURL"));
    panelURL.value = cloudinary_URL.value;
});

// return: 1 = Icon is yellow; 0 = Icon is white
function changeFavIcon():number{
    var Icon = (<HTMLSpanElement> document.getElementById("FavIcon"));

    if(Icon.style.color == "white"){
        Icon.className = "glyphicon glyphicon-star yellow";
        Icon.style.color = "yellow";
        return 1;
    } else {
        Icon.className = "glyphicon glyphicon-star white";
        Icon.style.color = 'white';
        return 0;
    }
}

function amIFavourite() {
    var comicID = (<HTMLInputElement> document.getElementById("comicID"));
    var Icon = (<HTMLSpanElement> document.getElementById("FavIcon"));

    $.get('/user/fav/ids', function (data) {
        var favs:Array<string>;
        favs = JSON.parse(data);
        console.log('favs');
        console.log(data);
        for(var i = 0; i < favs.length; i++){
            console.log(favs[i]);
            console.log(comicID.value);
            if (favs[i] == comicID.value){
                Icon.className = "glyphicon glyphicon-star yellow";
                Icon.style.color = "yellow";
            }
        }
    });
}

// setup dropzone
function initDropzone(){
    Dropzone.autoDiscover = false;
    myDrop = new Dropzone('#demoUpload', {
        acceptedFiles: ".jpg,.JPG,.jpeg,.JPEG,.gif,.GIF,.png,.PNG",
        maxFiles: 1,
        maxFilesize: 5,
        method: "post",
        url: "/image"
    })

    myDrop.on('success', function(file, data){

        if (data == "Error Uploading Image"){
            var note = $.notify({
                // options
                icon: 'glyphicon glyphicon-remove',
                title: '',
                message: data,
                url: '',
                target: '_blank'
            },{
                // settings
                element: 'body',
                position: null,
                type: "danger",
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
        } else {
            // Do something with url
            var url = data.toString();

            var cloudinary_URL = (<HTMLInputElement> document.getElementById("cloudinary_URL"));
            var panelURL = (<HTMLInputElement> document.getElementById("modalURL"));
            panelURL.value = url;
            cloudinary_URL.value = url;

            var note = $.notify({
                // options
                icon: 'glyphicon glyphicon-ok',
                title: '',
                message: "Image Upload Successful",
                url: '',
                target: '_blank'
            },{
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
        }

    });
}

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

function image() {
    var el = (<HTMLInputElement> document.getElementById("ImageCall"));

    $.post('/image', {Title: "Hello World"}, function (data) {
        el.innerText = data.toString();
    });
}

// para: none
// sends GET request to get user's email. Sets value of userEmail element.
// return: none
function setUserEmail() {
    var ID = (<HTMLInputElement> document.getElementById("userEmail"));

    $.get('/user/email', function (data) {
        ID.value = data.toString();
    });
}

// para: none
// sends GET request to get user's type. Sets value of userType element.
// return: none
function setUserType() {
    $.get('/user/type', function (data) {
        console.log(data.toString());
    });
}

// para: none
// parses the id param from URL, creates input field and sets value to the id param's value.
// return: none
function setComicID() {
    var comicID = getURLParameterByName("id");
    var ID = (<HTMLInputElement> document.getElementById("comicID"));

    ID.value = comicID;
    return comicID;
}

// para: id for comic to get
// sends GET request to get comic JSON object. Sets value of comicStr element.
// renders comic onto page.
// return: none
function renderEditComic(id: string) {
    var hiddenString = (<HTMLInputElement> document.getElementById("comicStr"));
    var comicStr;

    $.get('/comic/' + id, function (data) {

        comicJSONObj = JSON.parse(data);
        var comicTitle = (<HTMLInputElement>  document.getElementById("comicTitle"));
        comicTitle.value = comicJSONObj.Title;

        var publicPrivate = (<HTMLInputElement>  document.getElementById("optradio"));

        if (comicJSONObj.Public == true){
            var publicPrivate = (<HTMLInputElement>  document.getElementById("publicBtn"));
            publicPrivate.checked = true;
        }else{
            var publicPrivate = (<HTMLInputElement>  document.getElementById("privateBtn"));
            publicPrivate.checked = true;
        }

        //var contrib1 = (<HTMLInputElement> document.getElementById("C1"));
        //contrib1.innerHTML = comicJSONObj["Contributors"]["Contributor_1"];
        //console.log(comicJSONObj.Contributors);


        //if comic is favourited by the user, needs to also be updated in savefourite
        //var favoriteButton = (<HTMLInputElement>  document.getElementById("FavouriteButton"));
        //favoriteButton.setAttribute("class","btn btn-primary");
        //favoriteButton.setAttribute("class","btn btn-primary active");

        //button.setAttribute("data-toggle", "modal");
        //console.log(comicJSONObj.Panels);
        renderPanels("pictureContainer", comicJSONObj.Panels, true);

        addComicToUser();
        addUserToComic();
        renderContributors(comicJSONObj);
    });
}

// para: id for comic to get
// sends GET request to get comic JSON object. Sets value of comicStr element.
// renders comic onto page.
// return: none
function renderViewComic(id: string) {
    var hiddenString = (<HTMLInputElement> document.getElementById("comicStr"));
    var comicStr;

    $.get('/comic/' + id, function (data) {
        comicJSONObj = JSON.parse(data);
        var comicTitle = (<HTMLInputElement>  document.getElementById("comicTitle"));
        if (comicJSONObj.Public == true) {
            comicTitle.value = comicJSONObj.Title;

            //console.log(comicJSONObj.Panels);
            renderContributors(comicJSONObj);
            renderPanels("pictureContainer", comicJSONObj.Panels, false);
        } else {
            comicTitle.value = "This comic is private.";
        }
    });
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
// PUT request to save the comicJSONObj to the server
// return: none
function saveComic(){
    var comicID = (<HTMLInputElement> document.getElementById("comicID"));
    var newTitle = (<HTMLInputElement> document.getElementById("comicTitle"));
    comicJSONObj.Title = newTitle.value;

    var publicPrivate = (<HTMLInputElement> document.getElementById("publicBtn"));
    if (publicPrivate.checked == true){
        comicJSONObj.Public = true;
    } else {
        comicJSONObj.Public = false;
    }

    var comic = JSON.stringify(comicJSONObj);
    $.ajax({
        type: "PUT",
        url: "/comic/" + comicID.value,
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
            },{
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
            var note = $.notify({
                // options
                icon: 'glyphicon glyphicon-remove',
                title: '',
                message: 'ERROR - Comic Could Not Be Saved',
                url: '',
                target: '_blank'
            }, {
                // settings
                element: 'body',
                position: null,
                type: "danger",
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
        }
    });
}

// para: none
// POST request to create new comic
// return: none
function newComic() {
    var el = (<HTMLInputElement> document.getElementById("NewComicbtn"));

    $.ajax({
        type: "POST",
        url: "/comic",
        async: true,
        timeout: 4000,
        dataType: 'json',
        success: function (data) {
            window.location.replace("/edit?id=" + data.ComicID);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            var note = $.notify({
                // options
                icon: 'glyphicon glyphicon-remove',
                title: '',
                message: 'ERROR - Could Not Create New Comic',
                url: '',
                target: '_blank'
            }, {
                // settings
                element: 'body',
                position: null,
                type: "danger",
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
        }
    });
}

// para: elementID of panel container, JSON object of panels, bool: true = edit mode and false = view mode
//
// return: none
function renderPanels(elId: string, jsonPanels: JSON, edit:boolean) {
    var el = document.getElementById(elId);
    var panels = jsonPanels;
    var length = lengthJSON(panels);
    for (var i = 1; i <= length; i++) {
        var url = panels['Panel_'+i].Image_URL;
        var desc = panels['Panel_'+i].Text;

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
function lengthJSON(json: JSON) {
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
    var button = (<HTMLInputElement>  document.getElementById(ele.id));
    var num = button.id.substring(7);  // gets panel number = button number
    var img = (<HTMLInputElement>  document.getElementById("panelImg_" + num));
    var desc = ( document.getElementById("desc_" + num).innerHTML);
    //var modal = document.getElementById(button.getAttribute("href").substring(1));
    var urlEle = (<HTMLInputElement> document.getElementById("modalURL"));
    var descEle = (<HTMLInputElement>  document.getElementById("modalDesc"));
    var hiddenInput = (<HTMLInputElement> document.getElementById("panelNum"));
    var hiddenCloudinary = (<HTMLInputElement> document.getElementById("cloudinary_database"));

    hiddenInput.value = num;
    urlEle.value = img.getAttribute("src");

    if(urlEle.value.indexOf("cloudinary.com") > -1){
        hiddenCloudinary.value = urlEle.value;
    }else{
        hiddenCloudinary.value = "";
    }

    descEle.value = desc;
}

// para: none
// creates default panal and adds to
// return: none
function addPanel() {
    var i = document.getElementsByClassName("panel").length;
    var numStr = (i+1).toString();

    if (i > 8){
        var note = $.notify({
            // options
            icon: 'glyphicon glyphicon-remove',
            title: '',
            message: 'Only 9 Panels are Allowed in a Comic',
            url: '',
            target: '_blank'
        },{
            // settings
            element: 'body',
            position: null,
            type: "danger",
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
    } else {
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
        var url = (<HTMLInputElement>  document.getElementById("panelImg_"+numStr)).src;
        var desc = (<HTMLInputElement>  document.getElementById("desc_"+numStr)).innerHTML;
        comicJSONObj["Panels"]["Panel_"+numStr].Image_URL = url;
        comicJSONObj["Panels"]["Panel_"+numStr].Text = desc;
        saveComic();
    }
}

// para: none
// Checks the cloudinary_database element, if the url present there doesn't match the modalURL
// then delete tell cloudinary to delete the image at the cloudinary_database url.
// return: none
function cleanUpCloudinary(){
    var cloud = (<HTMLInputElement>  document.getElementById("cloudinary_database")).value;
    var modal = (<HTMLInputElement>  document.getElementById("modalURL")).value;

    if(cloud.toString() != modal.toString() && cloud.toString() != ("" || undefined)){
        var pattern = /[\w\d]+\.jpg/;

        var cloudPattern = new RegExp ('res.cloudinary.com');
        var cloud_occurance = modal.search(cloudPattern);

        if (cloud_occurance < 1){

            var id = pattern.exec(cloud)[0];

            if (id != null){
                id = id.toString().replace('.jpg', '');
            }

            $.ajax({
                type: "DELETE",
                url: "/image/" + id,
                async: true,
                dataType: 'json',
                timeout: 4000,
                error: function (xhr, status, thrownError) {

                }
            });
        }
    }
}

// para: none
// removes the HTML element of the last panel, updates comicJSONObj accordingly, saves Comic
// return: none
function removePanel() {
    var i=countPanels();
    if (i > 0) {
        var id = "panel_"+i;
        removeElement((<HTMLInputElement> document.getElementById(id)));
        comicJSONObj['Panels']["Panel_"+i].Image_URL = "";
        comicJSONObj['Panels']["Panel_"+i].Text = "";
        saveComic();
    }else{
        var note = $.notify({
            // options
            icon: 'glyphicon glyphicon-remove',
            title: '',
            message: 'There Are No Panels To Remove',
            url: '',
            target: '_blank'
        },{
            // settings
            element: 'body',
            position: null,
            type: "danger",
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
    }
}

// para: none
// iterates through panels in comicJSONObj and counts panels in use
// return: number of panels in use in comicJSONObj
function countPanels() {
    var panels = comicJSONObj.Panels;
    var count = 0;
    for(var i=1; i<=9; i++) {
        var url = panels['Panel_'+i].Image_URL;
        var desc = panels['Panel_'+i].Text;
        if(url != "" || desc != "") { // if panel is in use
            //alert(url + " " + desc);
            count++;
        } // don't add else since order of traversal is unknown/not reliable
        // ie you MUST iterate through all of panels to get true count
    }
    return count;
}

function updatePanel(elId) {

    var url = (<HTMLInputElement>  document.getElementById("modalURL")).value;
    var desc = (<HTMLInputElement> document.getElementById("modalDesc")).value;

    var numStr = (<HTMLInputElement>  document.getElementById("panelNum")).value;
    var panelImg = (<HTMLImageElement> document.getElementById("panelImg_" + numStr));
    panelImg.src = url;

    (<HTMLInputElement>  document.getElementById("desc_" + numStr)).innerHTML = desc;
    comicJSONObj["Panels"]["Panel_"+numStr].Image_URL = url;
    comicJSONObj["Panels"]["Panel_"+numStr].Text = desc;
    saveComic();
}

// para: none
// Uses the id parameter in the url to redirect the user to the edit page of the comic
// with that id
// return: none
function paramToEditComic(){
    var id = getURLParameterByName("id");
    window.location.replace("/edit?id=" + id);

}

// para: none
// Uses the id parameter in the url to redirect the user to the view page of the comic
// with that id
// return: none
function paramToViewComic(){
    var id = getURLParameterByName("id");
    window.location.replace("/view?id=" + id);
}

function gotoAccount(){
    //Sends user to /account, if Viewer then redirects to AccountViewer.html else Account.html
            window.location.replace("/account");
}

// para: element to be removed
// removes given element
// return: none
function removeElement(doc:Element): void{
    doc.parentElement.removeChild(doc);
}

// para: NodeList of items to be removed
// loops through given list and removes each element
// return: none
function removeNodeList(doc:NodeList): void{
    for(var i = doc.length - 1; i >= 0; i--) {
        if(doc[i] && doc[i].parentElement) {
            doc[i].parentElement.removeChild(doc[i]);
        }
    }
}

// para: HTMLCollection of items to be removed
// loops through given collection and removes each element
// return: none
function removeHTMLCollection(doc:HTMLCollection): void{
    for(var i = doc.length - 1; i >= 0; i--) {
        if(doc[i] && doc[i].parentElement) {
            doc[i].parentElement.removeChild(doc[i]);
        }
    }
}

// Used on the View Page to hide the Edit button from a Viewer
function checkIfViewer(){
    $.get('/user/type', function (data) {

        if(data.toString() == "Viewer"){
            var id = (<HTMLAnchorElement>  document.getElementById("Edit-Button"));
            id.remove();
        }
    });
}

// Used on the Edit Page to redirect a Viewer to the View Page
function checkIfContributor(){
    $.get('/user/type', function (data) {

        if(data.toString() == "Viewer"){
            var id = (<HTMLInputElement>  document.getElementById("comicID")).value;
            window.location.replace("/view?id=" + id);
        }


    });
}

function saveFavourites() {
    var id = (<HTMLInputElement>  document.getElementById("comicID")).value;

    // return: 1 = Icon is yellow (favourite); 0 = Icon is white (not a favourite)
    var color = changeFavIcon();

    var favouriteComic = {
        "favourite": id,
        "action": color,
    };

    var fav = JSON.stringify(favouriteComic);

    $.ajax({
        type: "PUT",
        url: "/user/fav/ids",
        contentType: "application/json; charset=utf-8",
        data: fav,
        async: true,
        dataType: 'json',
        timeout: 4000,
        success: function (data) {
            amIFavourite();

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
            amIFavourite();
        },
        error: function (xhr, status, thrownError) {
            amIFavourite();

            var note = $.notify({
                // options
                icon: 'glyphicon glyphicon-remove',
                title: '',
                message: 'ERROR - Favourite Not Saved',
                url: '',
                target: '_blank'
            }, {
                // settings
                element: 'body',
                position: null,
                type: "danger",
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
            amIFavourite();
        }
    });
}

// para: id of favourites container
// renders thumbnails inside the container corresponding to the given id for the view page
// return: none
function renderViewFavourites(id: string): void {
    renderThumbnails(id, "fav", "view");
}

// para: id of favourites container
// renders thumbnails inside the container corresponding to the given id for the edit page
// return: none
function renderEditFavourites(id: string): void {
    renderThumbnails(id, "fav", "edit");
}

// para: id of contributed container
// renders thumbnails inside the container corresponding to the given id for the edit page
// return: none
function renderContributed(id: string): void {
    renderThumbnails(id, "contributed", "edit");
}

function deleteComic(){
    var id = (<HTMLInputElement> document.getElementById("comicID")).value;

    $.ajax({
        type: "DELETE",
        url: "/comic/" + id,
        async: true,
        dataType: 'json',
        timeout: 4000,
        error: function (xhr, status, thrownError) {

            var note = $.notify({
                // options
                icon: 'glyphicon glyphicon-remove',
                title: '',
                message: 'ERROR - Could Not Delete Comic',
                url: '',
                target: '_blank'
            }, {
                // settings
                element: 'body',
                position: null,
                type: "danger",
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
        }
    });

    window.location.replace("/account");
}

// para: id of container to put elements in, string of thumbnail type (type == 'contributed' || 'fav')
// creates contributed thumbnails on the account page in the given container corresponding to the given id
// return: none
function renderThumbnails(id: string, type: string, page: string): void {
    var container = (<HTMLInputElement>  document.getElementById(id));

    // returns list of comic JSON objects
    $.get('/user/'+type, function (data) {  // (type == 'cont' || 'fav')
        JSONObj = JSON.parse(data);

        var length = lengthJSON(JSONObj);
        for (var i = 0; i < length; i++) { // for each cont comic

            var title = JSONObj[i].Title;
            var url = JSONObj[i].Panels.Panel_1.Image_URL;
            var desc = JSONObj[i].Panels.Panel_1.Text;

            if (url != "" || desc != "") { // if panel is not empty
                var thumbnail = document.createElement("div");
                thumbnail.className = "thumbnail";
                thumbnail.className += " " + type;
                thumbnail.id = type + "_" + (i+1).toString();

                var caption = document.createElement("div");
                caption.className = "caption";

                var img = document.createElement("img");
                img.className = "img-responsive";
                img.src = url;
                img.width = 100;
                img.style.cssFloat = "right";
                caption.appendChild(img);

                var h3 = document.createElement("h3");
                h3.innerHTML = title;
                caption.appendChild(h3);

                var p1 = document.createElement("p");

                var first = true;
                for(var j=1; j<=5; j++) {  // 5 = max number of contributors
                    if(JSONObj[i].Contributors['Contributor_' + j]) { // if contributor is defined
                        if (first) {
                            p1.innerHTML = "Contributors: " + JSONObj[i].Contributors['Contributor_' + j];
                            first = false;
                        } else {
                            p1.innerHTML += ", " + JSONObj[i].Contributors['Contributor_' + j];
                        }
                    }
                }

                caption.appendChild(p1);

                var p2 = document.createElement("p");
                var a2 = document.createElement("a");
                a2.className = "btn btn-primary";
                a2.href = "/"+page+"?id=" + JSONObj[i]._id;
                if(page == "edit") {
                    a2.innerHTML = "Edit";
                } else {
                    a2.innerHTML = "View";
                }
                p2.appendChild(a2);
                caption.appendChild(p2);

                thumbnail.appendChild(caption);
            }
            container.appendChild(thumbnail);
        }
        //=======================
        /*
         if (comicJSONObj.Public == true) {
         comicTitle.value = comicJSONObj.Title;

         //console.log(comicJSONObj.Panels);
         renderPanels("pictureContainer", comicJSONObj.Panels, false);
         } else {
         comicTitle.value = "This comic is private.";
         }
         */
        //==========================
    });
}

// para: comicJSON object
// Adds names of contributors to the drop-down bar for edit and view page
// return: none
function renderContributors(json: JSON){
    var container = (<HTMLInputElement> document.getElementById("contributors"));
    for (var i = 1; i<= 5; i++){
        var contributor = json["Contributors"]["Contributor_" + i];
        if(contributor != "") { // don't render an empty li
            var li = document.createElement("li");
            var a = document.createElement("a");
            a.id = "C" + i;
            a.innerHTML = contributor;
            a.href = "#";
            li.appendChild(a);
            container.appendChild(li);
        }
    }
}

// para: comicJSON object
// Adds the UserID to the comic object(MongoDB) unless they are already a contributor
// return: none
function addUserToComic(){
    var currcontrib = (<HTMLInputElement>  document.getElementById("userEmail")).value;
    var contains = false;
    for(var i=1; i<=5; i++) {  // max number of contributors
        if(comicJSONObj["Contributors"]["Contributor_"+i.toString()] == currcontrib) {
            contains = true;
        }
    }
    if (!contains) {
        for (var i = 1; i<= 5; i++) {  // max number of contributors
            var cname = "Contributor_" + i;
            var thiscontrib = comicJSONObj["Contributors"][cname];
            if (thiscontrib != currcontrib && thiscontrib == "") {
                comicJSONObj["Contributors"][cname] = currcontrib;
                saveComic();
                break;
            }
        }
    }
}

function removeUnusedPhoto(){
    var cloudinary_url = (<HTMLInputElement>  document.getElementById("cloudinary_URL")).value;
    var modal_url = (<HTMLInputElement>  document.getElementById("modalURL")).value;

    if(cloudinary_url.toString() != modal_url.toString() && cloudinary_url.toString() != ("" || undefined)){
        var pattern = /[\w\d]+\.jpg/;
            var id = pattern.exec(cloudinary_url)[0];

            if (id != null){
                id = id.toString().replace('.jpg', '');
            }

            $.ajax({
                type: "DELETE",
                url: "/image/" + id,
                async: true,
                dataType: 'json',
                timeout: 4000,
                error: function (xhr, status, thrownError) {
                }
            });
        }
}


// para: none
// Adds the comicID to the user object(StormPath)
// return: none
function addComicToUser() {
    var id = (<HTMLInputElement>  document.getElementById("comicID")).value;

    var conComic = {
        "comicID": id,
    };

    var comicPut = JSON.stringify(conComic);

    $.ajax({
        type: "PUT",
        url: "/user/contributed",
        contentType: "application/json; charset=utf-8",
        data: comicPut,
        async: true,
        timeout: 4000,
        dataType: 'json',
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
        error: function (xhr, ajaxOptions, thrownError) {
        }
    });
}