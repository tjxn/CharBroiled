/// <reference path="../../typings/browser/ambient/jquery/jquery.d.ts"/>
/// <reference path="../../typings/main/ambient/request/request.d.ts" />
/// <reference path="../../typings/main/ambient/bootstrap-notify/bootstrap-notify.d.ts" />
/// <reference path="../../typings/main/ambient/dropzone/dropzone.d.ts" />
/**
 * Created by Trevor Jackson on 16-Feb-2016.
 */
/*
 *             Libraries Used Throughout typescripts.ts
 * dropzonejs - http://www.dropzonejs.com/
 * bootstrap-notify - http://bootstrap-notify.remabledesigns.com/
 * jquery - https://jquery.com/
 *
 * */
var myDrop;
var comicJSONObj;
var JSONObj;
var userType;
// para: none
// Removes all thumbnails from the dropzone modal
// Called when modal is closed
// return: none
function clearDropzone() {
    myDrop.removeAllFiles();
}
// para: none
// Checks every click, if it is a click on a thumbnail in dropzone
// then change the modal url to the thumbnail's url
// return: none
$(document).on("click", ".dz-details", function () {
    var cloudinary_URL = document.getElementById("cloudinary_URL");
    var panelURL = document.getElementById("modalURL");
    panelURL.value = cloudinary_URL.value;
});
// para: none
// Change the color of the Favourite Button. If yellow set to white,
// if white set to yellow.
// return: number; If Favourite button is now yellow return 1, if white return 0
function changeFavIcon() {
    var Icon = document.getElementById("FavIcon");
    if (Icon.style.color == "white") {
        Icon.className = "glyphicon glyphicon-star yellow";
        Icon.style.color = "yellow";
        return 1;
    }
    else {
        Icon.className = "glyphicon glyphicon-star white";
        Icon.style.color = 'white';
        return 0;
    }
}
// para: none
// Check if the comic is currently set as a favourite of the user.
// GET request retrieves list of favourite comics of the user, goes through list
// and sees if current comic is on list. If comic is a favourite set the Favourite
// button icon to yellow.
// return: none
function amIFavourite() {
    var comicID = document.getElementById("comicID");
    var Icon = document.getElementById("FavIcon");
    $.get('/user/fav/ids', function (data) {
        var favs;
        favs = JSON.parse(data);
        for (var i = 0; i < favs.length; i++) {
            if (favs[i] == comicID.value) {
                Icon.className = "glyphicon glyphicon-star yellow";
                Icon.style.color = "yellow";
            }
        }
    });
}
// para: none
// Configure Dropzone library and associate it with the modal.
// Set up limitations: 5MB max, 1 file, jpg/gif/png format only
// return: none
function initDropzone() {
    Dropzone.autoDiscover = false;
    myDrop = new Dropzone('#demoUpload', {
        acceptedFiles: ".jpg,.JPG,.jpeg,.JPEG,.gif,.GIF,.png,.PNG",
        maxFiles: 1,
        maxFilesize: 5,
        method: "post",
        url: "/image"
    });
    myDrop.on('success', function (file, data) {
        if (data == "Error Uploading Image") {
            var note = $.notify({
                // options
                icon: 'glyphicon glyphicon-remove',
                title: '',
                message: data,
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
        else {
            // Do something with url
            var url = data.toString();
            var cloudinary_URL = document.getElementById("cloudinary_URL");
            var panelURL = document.getElementById("modalURL");
            panelURL.value = url;
            cloudinary_URL.value = url;
            var note = $.notify({
                // options
                icon: 'glyphicon glyphicon-ok',
                title: '',
                message: "Image Upload Successful",
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
        }
    });
}
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
// para: none
// sends GET request to get user's email. Sets value of userEmail element.
// return: none
function setUserEmail() {
    var ID = document.getElementById("userEmail");
    var userEmail = document.getElementById("userEmail2");
    $.get('/user/email', function (data) {
        ID.value = data.toString();
    });
}
// para: none
// sends GET request to get user's email. Sets value of userEmail element.
// return: none
function setUserEmails() {
    var ID = document.getElementById("userEmail");
    var userEmail = document.getElementById("userEmail2");
    $.get('/user/email', function (data) {
        ID.value = data.toString();
        userEmail.textContent = "Welcome " + data.toString() + " to our Comic Maker!";
    });
}
// para: none
// sends GET request to get user's type. Sets value of userType element.
// return: none
function setUserType() {
    $.get('/user/type', function (data) {
        userType = data.toString();
    });
}
// para: none
// sends GET request to get user's type. Sets value of userType element. Renders comic after.
// return: none
function setUserTypeAndRender(id) {
    $.get('/user/type', function (data) {
        userType = data.toString();
        renderEditComic(id);
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
function setDataAndRenderComic(id) {
    setUserType();
    setUserEmail();
}
// para: id for comic to get
// sends GET request to get comic JSON object. Sets value of comicStr element.
// renders comic onto page.
// return: none
function renderEditComic(id) {
    var hiddenString = document.getElementById("comicStr");
    var comicStr;
    $.get('/comic/' + id, function (data) {
        comicJSONObj = JSON.parse(data);
        var comicTitle = document.getElementById("comicTitle");
        comicTitle.value = comicJSONObj.Title;
        var publicPrivate = document.getElementById("optradio");
        if (comicJSONObj.Public) {
            var publicPrivate = document.getElementById("publicBtn");
            publicPrivate.checked = true;
        }
        else {
            var publicPrivate = document.getElementById("privateBtn");
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
function renderViewComic(id) {
    var hiddenString = document.getElementById("comicStr");
    var comicStr;
    $.get('/comic/' + id, function (data) {
        comicJSONObj = JSON.parse(data);
        var comicTitle = document.getElementById("comicTitle");
        if (comicJSONObj.Public) {
            comicTitle.value = comicJSONObj.Title;
            //console.log(comicJSONObj.Panels);
            renderContributors(comicJSONObj);
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
function saveComic(notify) {
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
    $.ajax({
        type: "PUT",
        url: "/comic/" + comicID.value,
        contentType: "application/json; charset=utf-8",
        data: comic,
        async: true,
        dataType: 'json',
        timeout: 4000,
        success: function (data) {
            if (notify) {
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
            }
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
    var el = document.getElementById("NewComicbtn");
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
// creates panels and adds them to the element corresponding to the given id
// return: none
function renderPanels(elId, jsonPanels, edit) {
    var el = document.getElementById(elId);
    var panels = jsonPanels;
    var length = lengthJSON(panels);
    for (var i = 1; i <= length; i++) {
        var url = panels['Panel_' + i].Image_URL;
        var desc = panels['Panel_' + i].Text;
        if (url != "" || desc != "") {
            createPanel(url, desc, i.toString(), edit, el);
        }
    }
}
function createPanel(url, desc, numStr, edit, container) {
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
    if (edit) {
        // create "Swap Left" button
        var button1 = document.createElement("button");
        button1.id = "buttonSwapL_" + numStr;
        button1.className = "btn btn-primary";
        button1.innerHTML = "Swap Left";
        button1.setAttribute("role", "button");
        button1.setAttribute("onclick", "swapPanelLeft(this)");
        // create "Swap Right" button
        var button2 = document.createElement("button");
        button2.id = "buttonSwapR_" + numStr;
        button2.className = "btn btn-primary";
        button2.innerHTML = "Swap Right";
        button2.setAttribute("role", "button");
        button2.setAttribute("onclick", "swapPanelRight(this)");
        // create " Edit Panel" button
        var button3 = document.createElement("button");
        button3.id = "button_" + numStr;
        button3.className = "btn btn-primary";
        button3.innerHTML = "Edit Panel";
        button3.setAttribute("data-toggle", "modal");
        button3.setAttribute("role", "button");
        button3.setAttribute("href", "#modal-container-94539");
        button3.setAttribute("onclick", "updateModal(this)");
        // create "Delete Panel" button
        var button4 = document.createElement("button");
        button4.id = "buttonRem_" + numStr;
        button4.className = "btn btn-primary";
        button4.innerHTML = "Delete Panel";
        button4.setAttribute("role", "button");
        button4.setAttribute("onclick", "removePanel(this)");
        // buttons are held within a "p" element
        var par1 = document.createElement("p");
        caption.appendChild(par);
        caption.appendChild(par1);
        par1.appendChild(button1);
        par1.appendChild(button2);
        par1.appendChild(button3);
        par1.appendChild(button4);
    }
    container.appendChild(panel);
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
    var hiddenCloudinary = document.getElementById("cloudinary_database");
    hiddenInput.value = num;
    urlEle.value = img.getAttribute("src");
    if (urlEle.value.indexOf("cloudinary.com") > -1) {
        hiddenCloudinary.value = urlEle.value;
    }
    else {
        hiddenCloudinary.value = "";
    }
    descEle.value = desc;
}
// para: none
// creates default panal and adds to
// return: none
function addPanel() {
    var i = document.getElementsByClassName("panel").length;
    var numStr = (i + 1).toString();
    if (i > 8) {
        var note = $.notify({
            // options
            icon: 'glyphicon glyphicon-remove',
            title: '',
            message: 'Only 9 Panels are Allowed in a Comic',
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
    else {
        var url = "http://strategyjournal.ru/wp-content/themes/strategy/img/default-image.jpg";
        var desc = "enter text here";
        var el = document.getElementById("pictureContainer");
        createPanel(url, desc, numStr, true, el);
        // update comicJSONObj and save
        comicJSONObj["Panels"]["Panel_" + numStr].Image_URL = url;
        comicJSONObj["Panels"]["Panel_" + numStr].Text = desc;
        saveComic(true);
    }
}
// para: none
// Checks the cloudinary_database element, if the url present there doesn't match the modalURL
// then delete tell cloudinary to delete the image at the cloudinary_database url.
// return: none
function cleanUpCloudinary() {
    var cloud = document.getElementById("cloudinary_database").value;
    var modal = document.getElementById("modalURL").value;
    if (cloud.toString() != modal.toString() && cloud.toString() != ("" || undefined)) {
        var pattern = /[\w\d]+\.jpg/;
        var cloudPattern = new RegExp('res.cloudinary.com');
        var cloud_occurance = modal.search(cloudPattern);
        if (cloud_occurance < 1) {
            var id = pattern.exec(cloud)[0];
            if (id != null) {
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
function removePanel(ele) {
    var i = Number(ele.id.substring(10)); // id is of form: "buttonRem_#"
    var count = countPanels();
    if (i > 0) {
        var id = "panel_" + i;
        removeElement(document.getElementById(id));
        for (var j = i; j < count; j++) {
            //shift all panel elements on the page (change their identifying number)
            document.getElementById("panel_" + (j + 1)).id = "panel_" + (j);
            document.getElementById("panelImg_" + (j + 1)).id = "panelImg_" + (j);
            document.getElementById("desc_" + (j + 1)).id = "desc_" + (j);
            document.getElementById("button_" + (j + 1)).id = "button_" + (j);
            document.getElementById("buttonRem_" + (j + 1)).id = "buttonRem_" + (j);
            // shift all panels down one slot in the comicJSONObj
            comicJSONObj['Panels']["Panel_" + j].Image_URL = comicJSONObj['Panels']["Panel_" + (j + 1)].Image_URL;
            comicJSONObj['Panels']["Panel_" + j].Text = comicJSONObj['Panels']["Panel_" + (j + 1)].Text;
        }
        comicJSONObj['Panels']["Panel_" + count].Image_URL = "";
        comicJSONObj['Panels']["Panel_" + count].Text = "";
        console.log(comicJSONObj);
        saveComic(true);
    }
    else {
        var note = $.notify({
            // options
            icon: 'glyphicon glyphicon-remove',
            title: '',
            message: 'There Are No Panels To Remove',
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
}
// para: none
// swaps the panel with the panel one index larger than it.
// return: number of panels in use in comicJSONObj
function swapPanelRight(ele) {
    var num = Number(ele.id.substring(12)); // id is of form: "buttonSwapR_#"
    var count = countPanels();
    if (num < count) {
        var tempURL = comicJSONObj["Panels"]["Panel_" + num].Image_URL;
        var tempText = comicJSONObj["Panels"]["Panel_" + num].Text;
        // set given ele to larger index ele
        comicJSONObj["Panels"]["Panel_" + num].Image_URL = comicJSONObj["Panels"]["Panel_" + (num + 1)].Image_URL;
        comicJSONObj["Panels"]["Panel_" + num].Text = comicJSONObj["Panels"]["Panel_" + (num + 1)].Text;
        // set larger index ele with given ele
        comicJSONObj["Panels"]["Panel_" + (num + 1)].Image_URL = tempURL;
        comicJSONObj["Panels"]["Panel_" + (num + 1)].Text = tempText;
        // delete the panels and re-render
        removeNodeList(document.getElementById("pictureContainer").children);
        // re-render the panels
        renderPanels("pictureContainer", comicJSONObj["Panels"], true);
        saveComic(false);
    }
}
// para: none
// swaps the panel with the panel one index smaller than it.
// return: number of panels in use in comicJSONObj
function swapPanelLeft(ele) {
    var num = Number(ele.id.substring(12)); // id is of form: "buttonSwapR_#"
    if (num > 1) {
        var tempURL = comicJSONObj["Panels"]["Panel_" + num].Image_URL;
        var tempText = comicJSONObj["Panels"]["Panel_" + num].Text;
        // set given ele to larger index ele
        comicJSONObj["Panels"]["Panel_" + num].Image_URL = comicJSONObj["Panels"]["Panel_" + (num - 1)].Image_URL;
        comicJSONObj["Panels"]["Panel_" + num].Text = comicJSONObj["Panels"]["Panel_" + (num - 1)].Text;
        // set larger index ele with given ele
        comicJSONObj["Panels"]["Panel_" + (num - 1)].Image_URL = tempURL;
        comicJSONObj["Panels"]["Panel_" + (num - 1)].Text = tempText;
        // delete the panels and re-render
        removeNodeList(document.getElementById("pictureContainer").children);
        // re-render the panels
        renderPanels("pictureContainer", comicJSONObj["Panels"], true);
        saveComic(false);
    }
}
// para: none
// iterates through panels in comicJSONObj and counts panels in use
// return: number of panels in use in comicJSONObj
function countPanels() {
    var panels = comicJSONObj.Panels;
    var count = 0;
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
// para: none
// updates/changes the panel url and text when the modal applys changes
// return: none
function updatePanel(elId) {
    var url = document.getElementById("modalURL").value;
    var desc = document.getElementById("modalDesc").value;
    var numStr = document.getElementById("panelNum").value;
    var panelImg = document.getElementById("panelImg_" + numStr);
    panelImg.src = url;
    document.getElementById("desc_" + numStr).innerHTML = desc;
    comicJSONObj["Panels"]["Panel_" + numStr].Image_URL = url;
    comicJSONObj["Panels"]["Panel_" + numStr].Text = desc;
    saveComic(true);
}
// para: none
// Uses the id parameter in the url to redirect the user to the edit page of the comic
// with that id
// return: none
function paramToEditComic() {
    var id = getURLParameterByName("id");
    window.location.replace("/edit?id=" + id);
}
// para: none
// Uses the id parameter in the url to redirect the user to the view page of the comic
// with that id
// return: none
function paramToViewComic() {
    var id = getURLParameterByName("id");
    window.location.replace("/view?id=" + id);
}
// para: none
// Sends user to /account
// return: none
function gotoAccount() {
    window.location.replace("/account");
}
// para: element to be removed
// removes given element
// return: none
function removeElement(doc) {
    doc.parentElement.removeChild(doc);
}
// para: NodeList of items to be removed
// loops through given list and removes each element
// return: none
function removeNodeList(doc) {
    for (var i = doc.length - 1; i >= 0; i--) {
        if (doc[i] && doc[i].parentElement) {
            doc[i].parentElement.removeChild(doc[i]);
        }
    }
}
// para: HTMLCollection of items to be removed
// loops through given collection and removes each element
// return: none
function removeHTMLCollection(doc) {
    for (var i = doc.length - 1; i >= 0; i--) {
        if (doc[i] && doc[i].parentElement) {
            doc[i].parentElement.removeChild(doc[i]);
        }
    }
}
// para: none
// Used on the View Page to hide the Edit button from a Viewer
// Does a GET request to check what type the user is, if Viewer
// Then remove the Edit button
// return: none
function checkIfViewer() {
    $.get('/user/type', function (data) {
        if (data.toString() == "Viewer") {
            var id = document.getElementById("Edit-Button");
            id.remove();
        }
    });
}
// para: none
// Used on the Edit Page to redirect a Viewer to the View Page
// Does a GET request to check if the user is a Viewer, if so then redirect user
// to the view page of that comic.
// return: none
function checkIfContributor() {
    $.get('/user/type', function (data) {
        if (data.toString() == "Viewer") {
            var id = document.getElementById("comicID").value;
            window.location.replace("/view?id=" + id);
        }
    });
}
// para: none
// Changes the color of the Favourite button, send PUT request to server with indication
// of whether to add or remove the given comic ID to the Favourite list kept on the Server
// return: none
function saveFavourites() {
    var id = document.getElementById("comicID").value;
    // return: 1 = Icon is yellow (favourite); 0 = Icon is white (not a favourite)
    var color = changeFavIcon();
    var favouriteComic = {
        "favourite": id,
        "action": color
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
function renderViewFavourites(id) {
    renderThumbnails(id, "fav", "view");
}
// para: id of favourites container
// renders thumbnails inside the container corresponding to the given id for the edit page
// return: none
function renderEditFavourites(id) {
    renderThumbnails(id, "fav", "edit");
}
// para: id of contributed container
// renders thumbnails inside the container corresponding to the given id for the edit page
// return: none
function renderContributed(id) {
    renderThumbnails(id, "contributed", "edit");
}
// para: none
// Delete a comic in the database then redirect user to the account page.
// return: none
function deleteComic() {
    var id = document.getElementById("comicID").value;
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
function renderThumbnails(id, type, page) {
    var container = document.getElementById(id);
    // returns list of comic JSON objects
    $.get('/user/' + type, function (data) {
        JSONObj = JSON.parse(data);
        var length = lengthJSON(JSONObj);
        for (var i = 0; i < length; i++) {
            var title = JSONObj[i].Title;
            var url = JSONObj[i].Panels.Panel_1.Image_URL;
            var desc = JSONObj[i].Panels.Panel_1.Text;
            if (url != "" || desc != "") {
                var thumbnail = document.createElement("div");
                thumbnail.className = "thumbnail";
                thumbnail.className += " " + type;
                thumbnail.id = type + "_" + (i + 1).toString();
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
                for (var j = 1; j <= 5; j++) {
                    if (JSONObj[i].Contributors['Contributor_' + j]) {
                        if (first) {
                            p1.innerHTML = "Contributors: " + JSONObj[i].Contributors['Contributor_' + j];
                            first = false;
                        }
                        else {
                            p1.innerHTML += ", " + JSONObj[i].Contributors['Contributor_' + j];
                        }
                    }
                }
                caption.appendChild(p1);
                var p2 = document.createElement("p");
                var a2 = document.createElement("a");
                a2.className = "btn btn-primary";
                a2.href = "/" + page + "?id=" + JSONObj[i]._id;
                if (page == "edit") {
                    a2.innerHTML = "Edit";
                }
                else {
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
function renderContributors(json) {
    var container = document.getElementById("contributors");
    for (var i = 1; i <= 5; i++) {
        var contributor = json["Contributors"]["Contributor_" + i];
        if (contributor != "") {
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
function addUserToComic() {
    var currcontrib = document.getElementById("userEmail").value;
    var contains = false;
    for (var i = 1; i <= 5; i++) {
        if (comicJSONObj["Contributors"]["Contributor_" + i.toString()] == currcontrib) {
            contains = true;
        }
    }
    if (!contains) {
        for (var i = 1; i <= 5; i++) {
            var cname = "Contributor_" + i;
            var thiscontrib = comicJSONObj["Contributors"][cname];
            if (thiscontrib != currcontrib && thiscontrib == "") {
                comicJSONObj["Contributors"][cname] = currcontrib;
                saveComic(false);
                break;
            }
        }
    }
}
// NEEDS TO BE IMPROVED
// para: none
// Attempts to determine if a photo on the cloudinary database is no longer being used, if so
// delete the unused image.
// return: none
function removeUnusedPhoto() {
    var cloudinary_url = document.getElementById("cloudinary_URL").value;
    var modal_url = document.getElementById("modalURL").value;
    if (cloudinary_url.toString() != modal_url.toString() && cloudinary_url.toString() != ("" || undefined)) {
        var pattern = /[\w\d]+\.jpg/;
        var id = pattern.exec(cloudinary_url)[0];
        if (id != null) {
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
    var id = document.getElementById("comicID").value;
    var conComic = {
        "comicID": id
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
        /*
        success:
            function (data) {
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
        */
        error: function (xhr, ajaxOptions, thrownError) {
        }
    });
}
//# sourceMappingURL=typescripts.js.map