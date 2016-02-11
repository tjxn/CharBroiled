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
        panel.id = "panel_"+ toString(i+1);
        panel.style.height = "500px";
        panel.style.width = "500px";

        var img = document.createElement("img");
        img.src = panels[i].Image_URL;
        img.style.height = "300px";
        img.style.width = "300px";
        panel.appendChild(img);

        el.appendChild(panel);
    }
}

window.onload = function (event) {
    renderPanels("pictureContainer", ["http://www.potatoes.com/files/5713/4202/4172/07.jpg","http://3.bp.blogspot.com/-k6mmw9BbX4E/VXtPzM22rgI/AAAAAAAAAp0/axlLjiF-QKI/s1600/potato.gif","http://images.wisegeek.com/bag-of-potatoes.jpg"]);
};