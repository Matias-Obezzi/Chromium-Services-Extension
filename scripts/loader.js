function makeHttpObject()  {
    if (window.XMLHttpRequest) { // Mozilla, Safari, IE7+ ...
      return new XMLHttpRequest();
    }
    throw new Error("Could not create HTTP request object.");
}

var ant;
window.onload = () =>{
    ant = window.location.hash.substring(1).replace(" ","-");
    cambiarContenido();
};

// ie9 ve ie7 return true but never fire, lets remove ie less then 10
if(("onhashchange" in window) && navigator.userAgent.toLowerCase().indexOf('msie') == -1){ // event supported?
    window.onhashchange = function(){
        cambiarContenido();
    }
}

$("#reload").click(function(){
    cambiarContenido();
});

function cambiarContenido(){
    if(ant == ""){
        ant = "inicio";
    }
    ant = "link-"+ant;
    var urlPrin = window.location.hash.substring(1).replace(" ","-");
    var content = document.getElementById("content");
    var request = makeHttpObject();
    if(urlPrin == "inicio" || urlPrin==""){
        document.getElementById("menu").classList.remove("fixed-top");
        document.getElementById("reload").classList.add("d-none");
        urlPrin="inicio";
        var url = "pages/index.html";
        var request = makeHttpObject();
        request.open("GET", url, true);
        request.send(null);
        request.onreadystatechange = function() {
            // Si se establecion correctamente la conexion
            if (request.readyState === XMLHttpRequest.DONE) {
                // Si la respuesta es exitosa
                if (request.status === 200) {
                    // Inyectamos el texto html recibido
                    content.innerHTML = request.responseText;
                }
            }
        };
    }else{
        if(!$("#menu").hasClass("fixed-top")){
            document.getElementById("menu").classList.add("fixed-top");
            document.getElementById("reload").classList.remove("d-none");
        }
        var url = "pages/" + urlPrin + "/main.js";
        loadScript(url, null);
    }
    var nuevo = "link-" + urlPrin;
    if(null != document.getElementById(window.ant)){
        document.getElementById(window.ant).classList.remove("active");
    }
    document.getElementById(nuevo).classList.add("active");
    ant = urlPrin; 
}

function loadScript(url, callback){
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    script.onreadystatechange = callback;
    script.onload = callback;
    head.appendChild(script);
}

$("body").click(function(){
    $('#menu-responsive').collapse('hide');
});