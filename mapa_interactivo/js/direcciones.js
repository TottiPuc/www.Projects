direccionesModulo = (function () {
  var servicioDirecciones // Servicio que calcula las direcciones
  var mostradorDirecciones // Servicio muestra las direcciones

    // Calcula las rutas cuando se cambian los lugares de desde, hasta o algun punto intermedio
  function calcularRutasConClic () {
    document.getElementById('comoIr').addEventListener('change', function () {
      direccionesModulo.calcularYMostrarRutas()
    })

    document.getElementById('calcularMuchos').addEventListener('click', function () {
      if (document.getElementById('desde').value != '' && document.getElementById('desde').value != '') {
        direccionesModulo.calcularYMostrarRutas()
      }
    })

    document.getElementById('borrarIntermedios').addEventListener('click', function () {
      direccionesModulo.borrarIntermedios();
    })

    document.getElementById('borrarIntermedios').addEventListener('click', function () {
      direccionesModulo.borrarIntermedios();
    })

  }

    // Agrega la dirección en las lista de Lugares Intermedios en caso de que no estén
  function agregarDireccionEnLista (direccion, coord) {
    var lugaresIntermedios = document.getElementById('puntosIntermedios')

    var haceFaltaAgregar = true
    for (i = 0; i < lugaresIntermedios.length; ++i) {
      if (lugaresIntermedios.options[i].text.replace(/\r?\n|\r/g, ' ') === direccion.replace(/\r?\n|\r/g, ' ')) {
        haceFaltaAgregar = false
      }
    }
    if (haceFaltaAgregar) {
      var opt = document.createElement('option');
      opt.value = coord;
      opt.innerHTML = direccion;
      lugaresIntermedios.appendChild(opt);
    }
  }

    // Agrega la dirección en las listas de puntos intermedios y lo muestra con el street view
  function agregarDireccionYMostrarEnMapa (direccion, ubicacion) {
    that = this;
    var ubicacionTexto = ubicacion.lat() + ',' + ubicacion.lng();
    agregarDireccionEnLista(direccion, ubicacionTexto);
    mapa.setCenter(ubicacion);
    streetViewModulo.fijarStreetView(ubicacion);
    marcadorModulo.mostrarMiMarcador(ubicacion);
  }

  function agregarDireccion (direccion, ubicacion) {
    that = this;
    var ubicacionTexto = ubicacion.lat() + ',' + ubicacion.lng();
    agregarDireccionEnLista(direccion, ubicacionTexto);
    mapa.setCenter(ubicacion);
  }

    // Inicializo las variables que muestra el panel y el que calcula las rutas//
  function inicializar () {
    calcularRutasConClic()
        // Agrega la direccion cuando se presioná enter en el campo agregar
    $('#agregar').keypress(function (e) {
      if (e.keyCode == 13) {
        var direccion = document.getElementById('agregar').value
        geocodificadorModulo.usaDireccion(direccion, direccionesModulo.agregarDireccion)
      }
    })
        // Calcula las rutas cuando se presioná enter en el campo desde y hay un valor disitnto a vacío en 'hasta'
    $('#desde').keypress(function (e) {
      if (e.keyCode == 13 && document.getElementById('hasta').value != '') {
        direccionesModulo.calcularYMostrarRutas()
      }
    })

        // Calcula las rutas cuando se presioná enter en el campo hasta y hay un valor disitnto a vacío en 'desde'
    $('#hasta').keypress(function (e) {
      if (e.keyCode == 13 && document.getElementById('desde').value != '') {
        direccionesModulo.calcularYMostrarRutas()
      }
    })

    servicioDirecciones = new google.maps.DirectionsService()
    mostradorDirecciones = new google.maps.DirectionsRenderer({
      draggable: true,
      map: mapa,
      panel: document.getElementById('directions-panel-summary'),
      suppressMarkers: true
    })
  }

    // Calcula la ruta entre los puntos Desde y Hasta con los puntosIntermedios
    // dependiendo de la formaDeIr que puede ser Caminando, Auto o Bus/Subterraneo/Tren
  function calcularYMostrarRutas () {

    var start = document.getElementById('desde').value;
    var end = document.getElementById('hasta').value;
    //creo los marcadores
      marcadorModulo.agregarMarcadorRuta(start,"A",true)
      marcadorModulo.agregarMarcadorRuta(end,"B",false)
    //Cargo modo de viaje
    var modoViaje = $("#comoIr").val();
      
    /* Leo los waypoints!  */
      var waypts = [];
      var checkboxArray = document.getElementById('puntosIntermedios');
      for (var i = 0; i < checkboxArray.length; i++) {
        if (checkboxArray.options[i].selected) {
          waypts.push({
            location: checkboxArray[i].value,
            stopover: true
          });
          marcadorModulo.agregarMarcadorRuta(checkboxArray[i].value,"I",false)
        }
      }
      /* Creo el request completo */
      var DirectionsRequest = {
        origin: start,
        destination: end,
        travelMode: modoViaje,
        waypoints: waypts,
        optimizeWaypoints: true
        };

    servicioDirecciones.route(DirectionsRequest,function(result, status) {
        if (status == 'OK') {
          mostradorDirecciones.setDirections(result);
        }
      });
  }

  function borrarIntermedios(){
    $("#puntosIntermedios").html("");
  }

  return {
    inicializar,
    agregarDireccion,
    agregarDireccionEnLista,
    agregarDireccionYMostrarEnMapa,
    calcularYMostrarRutas,
    borrarIntermedios
  }
}())
