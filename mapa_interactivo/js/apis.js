var mapa // Mapa que vamos a modificar

/* Crear la variable posicionCentral con las coordenadas donde se va a centrar el mapa */

//var posicionCentral = {lat:4.570868, lng:-74.2973328} // forma sencilla  con las coordenadas dadas
// si no se conoce las cordenadas se puede obtener apartir de geocoder indicando la direccion en este caso el pais
var pais = "Colombia"
var xhttp = new XMLHttpRequest(); //creo objeto para realizar peido
var posicionCentral = "https://maps.googleapis.com/maps/api/geocode/json?address="+pais+"&key=AIzaSyByJX-Nz3GxODSr4q8qmod8zbpNFIU4Eso"

// Inicializa el mapa con un valor de zoom y una locación en el medio

function inicializarMapa () {
//Obtener coordenadas del lugar central  
xhttp.onreadystatechange = function () {
  if (this.readyState == 4 && this.status==200) {
    var datos = JSON.parse(this.responseText) // convertir a JSON
    //console.log(datos)
    var latitud = datos.results[0].geometry.location.lat;
    var longitud = datos.results[0].geometry.location.lng;
    var centro = {lat:latitud, lng:longitud}

/* Modificá la variable mapa con el constructor Map().
    Tendrás que asignarle un valor de zoom y
    un centro igual a la variable posicionCentral. */
    mapa = new google.maps.Map(document.getElementById("map"),{
      center: centro,
      zoom :6
    });
  
  geocodificadorModulo.inicializar()
  marcadorModulo.inicializar()
  direccionesModulo.inicializar()
  lugaresModulo.inicializar()
  streetViewModulo.inicializar()
}
}}

xhttp.open("GET",posicionCentral,true); // se inicializa el pedido
xhttp.send(); // se envia el pedido