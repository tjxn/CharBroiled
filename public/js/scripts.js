// Empty JS for your own code to be here
function renderPictures(elId, urls) {

    var el = document.getElementById(elId);

    for (var i=0; i<urls.length; i++) {
        var img = document.createElement("img");
        img.src = urls[i];
        img.style.height = "300px";
        img.style.width = "300px";
        el.appendChild(img);
    }
}

function renderPanels(elId, jsonPanels) {
    var el = document.getElementById(elId);

    var TESTJSON = JSON.stringify({
        Panel_1 : {
            "Image_URL": "http://www.potatoes.com/files/5713/4202/4172/07.jpg",
            "Text": "TEST TEXT"
        },
        Panel_2 : {
            "Image_URL": "http://www.potatoes.com/files/5713/4202/4172/07.jpg",
            "Text": "TEST TEXT2"
        },
        Panel_3 : {
            "Image_URL": "http://www.potatoes.com/files/5713/4202/4172/07.jpg",
            "Text": "TEST TEXT3"
        }
    });

    var panelObj = JSON.parse(TESTJSON);
    //alert(JSON.stringify(panelObj));
    var panels = Object.keys(panelObj).map(function(k) { return panelObj[k] });
    //alert(panels.length);

    for (var i=0; i<panels.length; i++) {

        var panel = document.createElement("div");
        panel.className = "col-md-4";
        panel.id = "panel_"+(i+1).toString();
        //panel.style.height = "500px";
        //panel.style.width = "500px";

        var thumbnail = document.createElement("div");
        thumbnail.className = "thumbnail";
        panel.appendChild(thumbnail);

        var img = document.createElement("img");
        img.alt = "Bootstrap Thumbnail First";
        img.src = panels[i].Image_URL;
        img.id = "panelImg_"+(i+1).toString();
        //img.style.height = "300px";
        //img.style.width = "300px";
        thumbnail.appendChild(img);

        var caption = document.createElement("div");
        caption.className = "caption";
        thumbnail.appendChild(caption);

        var par = document.createElement("p");
        par.innerHTML = panels[i].Text;
        par.id = "desc_"+(i+1).toString();
        caption.appendChild(par);

        var button = document.createElement("button");
        button.id = "button_"+(i+1).toString();
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

function updateModal(ele) {

    var button = document.getElementById(ele.id);
    var num = button.id.substring(7);  // gets panel number = button number
    var img = document.getElementById("panelImg_"+num);
    var desc = document.getElementById("desc_"+num).innerHTML;
    //var modal = document.getElementById(button.getAttribute("href").substring(1));
    var urlEle = document.getElementById("modalURL");
    var descEle = document.getElementById("modalDesc");

    urlEle.value = img.getAttribute("src");
    descEle.value = desc;
}


function addPanel(){
    //comic.ts
    comic.addPanel("Add your custom text here...","http://33.media.tumblr.com/tumblr_luknndtrik1qkq0wr.gif")
    saveComic(this.comic);
    renderPanels("pictureContainer");
}

function updateTitle(comicTitle){
    var newTitle = document.getElementById(elId).value;
    //comic.ts
    comic.setTitle(newTitle);
    saveComic(this.comic);
}

function renderTitle(elID){
    //comic.ts
    var el = document.getElementById(elId);
    el.value = comic.title();
}