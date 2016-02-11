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
        panel.id = "panel_"+ toString(i+1);
        //panel.style.height = "500px";
        //panel.style.width = "500px";

        var thumbnail = document.createElement("div");
        thumbnail.className = "thumbnail";
        panel.appendChild(thumbnail);

        var img = document.createElement("img");
        img.alt = "Bootstrap Thumbnail First";
        img.src = panels[i].Image_URL;
        //img.style.height = "300px";
        //img.style.width = "300px";
        thumbnail.appendChild(img);

        var caption = document.createElement("div");
        caption.className = "caption";
        thumbnail.appendChild(caption);

        var par = document.createElement("p");
        par.innerHTML = panels[i].Text;
        caption.appendChild(par);

        var button = document.createElement("button");
        button.id = "button_"+ toString(i+1);
        button.className = "btn btn-primary";
        button.innerHTML = "Edit Panel";
        button.setAttribute("data-toggle", "modal");
        button.setAttribute("role", "button");
        button.setAttribute("href", "#modal-container-94539");


        var par1 = document.createElement("p");
        caption.appendChild(par);
        caption.appendChild(par1);
        par1.appendChild(button);

        el.appendChild(panel);
    }
}

