var key = "4b3a8ac954735b9f0c9a33d78ffd1e4589c04194831f11609db577ad";
var lang = "es";
var urlIndex =  "pages/datos-ip/index.html";
document.getElementById("content").innerHTML = leerArchivo(urlIndex);

$.getJSON('https://api.ipify.org?format=json', function(data){
    ip = data.ip;
    $.ajax({
        type: "GET",
        url: "https://api.ipdata.co/"+ ip + "/" + lang + "?api-key=" + key,
        dataType: "json",
        success: function (dataIp) {
            document.getElementById("ip").innerHTML = dataIp.ip;
            document.getElementById("pais").innerHTML = dataIp.country_name;
            document.getElementById("prov").innerHTML = dataIp.region;
            document.getElementById("loca").innerHTML = dataIp.city;
            document.getElementById("bandera").src = dataIp.flag;
            document.getElementById("bandera").style.width = "50px";
            document.getElementById("provInt").innerHTML = dataIp.asn.name;
            idiomas = "";
            cant = Object.keys(dataIp.languages).length;
            for(var i=0; i < cant;i++){
                idiomas += dataIp.languages[i].name;
                if(cant>1 && i <cant-1){
                    idiomas += ", ";
                }
            }
            document.getElementById("idiomas").innerHTML = idiomas;
            document.getElementById("moneda").innerHTML = dataIp.currency.name + " " + dataIp.currency.native;
            document.getElementById("tor").innerHTML = dataIp.threat.is_tor?"Si":"No";
            document.getElementById("proxy").innerHTML = dataIp.threat.is_proxy?"Si":"No";
        },
        error: function (jqXHR, textStatus, errorThrown) {
          console.log(errorThrown);
        }
      });
});

function leerArchivo(url) {
    var xhr = new XMLHttpRequest();
    var text;
    xhr.open("GET", url, false);
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            text = this.responseText;
        }
    };
    xhr.send(null);
    return text;
  }