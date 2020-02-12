//voy a traerme su contenido completo
var key = "c131eeeb2005badd0d710e139f0c9795";
var id = "3435910";
var lang = "es";
var keyIp = "4b3a8ac954735b9f0c9a33d78ffd1e4589c04194831f11609db577ad";
var urlIndex =  "pages/clima/index.html";
document.getElementById("content").innerHTML = leerArchivo(urlIndex);
$.getJSON('https://api.ipify.org?format=json', function(data){
  ip = data.ip;

  $.ajax({
      type: "GET",
      url: "https://api.ipdata.co/"+ ip + "/" + lang + "?api-key=" + keyIp,
      dataType: "json",
      success: function (dataIp) {
        $.ajax({
          type: "GET",
          url: "http://api.openweathermap.org/data/2.5/weather?lat="+ dataIp.latitude + "&lon=" + dataIp.longitude + "&APPID=" + key + "&lang=" + lang,
          dataType: "json",
          success: function (vars) {
            document.getElementById("pais").innerHTML = dataIp.country_name;
            document.getElementById("prov").innerHTML = dataIp.region;
            document.getElementById("loca").innerHTML = dataIp.city;
            document.getElementById("cielo").innerHTML = vars.weather[0].description[0].toUpperCase() + vars.weather[0].description.slice(1);
        
            dato = (vars.main.temp - 273.15).toPrecision(4);
            if(dato > 30){
              document.getElementById("temp").classList.add("bg-danger");
              document.getElementById("temp").classList.add("text-light");
            }else if(dato < 20){
              document.getElementById("temp").classList.add("bg-info");
              document.getElementById("temp").classList.add("text-light");
            }else{
              document.getElementById("temp").classList.add("bg-success");
              document.getElementById("temp").classList.add("text-light");
            }
            document.getElementById("temp").innerHTML = dato + "°";
        
            dato = (vars.main.temp_max - 273.15).toPrecision(4);
            document.getElementById("tempMax").innerHTML = dato + "°";
        
            dato = (vars.main.temp_min - 273.15).toPrecision(4);
            document.getElementById("tempMin").innerHTML = dato + "°";
        
            dato = (vars.main.feels_like - 273.15).toPrecision(4);
            if(dato > 27){
              document.getElementById("sens").classList.add("bg-danger");
              document.getElementById("sens").classList.add("text-light");
            }else if(dato < 20){
              document.getElementById("sens").classList.add("bg-info");
              document.getElementById("sens").classList.add("text-light");
            }else{
              document.getElementById("sens").classList.add("bg-success");
              document.getElementById("sens").classList.add("text-light");
            }
            document.getElementById("sens").innerHTML = dato + "°";
        
            document.getElementById("hume").innerHTML = vars.main.humidity + "%";
          },
          error: function (jqXHR, textStatus, errorThrown) {
            console.log(errorThrown);
          }
        });
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