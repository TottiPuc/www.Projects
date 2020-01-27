geocodificadorModulo = (function () {
  var geocodificador// Geocodificador que dada una dirección devuelve una coordenada
      // Permite obtener las coordenadas y las usa con la función llamada por parámtero
  function usaDireccion (direccion, funcionALlamar) {
    /* Completar la función usaDireccion(dirección,funcionALlamar)
     para que se obtengan las coordenadas a partir de la dirección pasada por parámetro
     y que llame a la función pasada por parámetro con los siguientes parámetros
     dirección: la dirección pasada por parámetro
     coordenada: la ubicación de tipo google.maps.LatLng */
    //Obtener coordenadas de la direccion pasada por parametro 
    geocodificador.geocode({'address':direccion},function (results, status) {
        if (status == 'OK') {
          var resultadosBusqueda = results[0].geometry.location;
          funcionALlamar(direccion,resultadosBusqueda)
        }
        else{
          var mensajeError = "";
          if (status == 'ZERO_RESULTS') {
            mensajeError = "No se encontraron resultados para la direccion solicitada.";
              }
          else if (status == "OVER_QUERY_LIMIT" || status == "REQUEST_DENIED" || status == "UNKNOWN_ERROR") {
            mensajeError = "Error 100, mapa con errores";            
          }
          else if (status == "INVALID_REQUEST") {
            mensajeError = "Error de la web.";
          }
          alert(mensajeError);
        }
      
    })
     
  }

    // Inicializo el geocoder que obtiene las corrdenadas a partir de una dirección
    // La variable dirección es igual al texto ingresado por el usuario
    // Llama a la función usaDirecciin para agregarla a los listados y mostrarlo en el mapa
  function inicializar () {
    var that = this
    geocodificador = new google.maps.Geocoder()

        // cuando se presiona la tecla enter en el campo direccion, se agrega la dirección y se muestra en el mapa
    document.querySelector('#direccion').addEventListener('keypress', function (e) {
      var key = e.which || e.keyCode
      if (key === 13) { // 13 is enter
                // code for enter
        var direccion = document.getElementById('direccion').value
        that.usaDireccion(direccion, direccionesModulo.agregarDireccionYMostrarEnMapa)
      }
    })
  }

  return {
    usaDireccion,
    inicializar
  }
})()
