/*
 * Controlador
 */
var Controlador = function(modelo) {
  this.modelo = modelo;
};

Controlador.prototype = {
  agregarPregunta: function(pregunta, respuestas) {
      this.modelo.agregarPregunta(pregunta, respuestas);
  },

  borrarPregunta: function(idPregunta){
    if (idPregunta >0) this.modelo.borrarPregunta(idPregunta);
  },

  borrarPreguntasAll: function() {
    this.modelo.borrarPreguntasAll();
  },

  editarPregunta: function(idPregunta,nuevoTexto,nuevaRespuesta){
    this.modelo.editarPregunta(idPregunta,nuevoTexto,nuevaRespuesta);
  },

  precargarLocal:function(){
    this.modelo.precargarLocal();
  },
  
  llenarModal: function(idPregunta){
    //Limpio las respuestas existentes
    $('#containerRespuestas').empty();
    //Esta es la pregunta según el ID seleccionado como "active"
    var preguntaEditar = this.modelo.buscarPreguntaporId(idPregunta);

    //Este es el texto de la pregunta. Lo ingreso en el modal:
    var cuadroDePregunta = document.getElementById("pregunta-text");

    //Seteo por default el "value" del input del modal
    cuadroDePregunta.setAttribute("value", preguntaEditar.textoPregunta);
    cuadroDePregunta.setAttribute("idPregunta", idPregunta);

    var respuestashtml = "";
    //Este ciclo recorrerá las respuestas creando el codigo html correspondiente
    for (let index = 0; index < preguntaEditar.cantidadPorRespuesta.length; index++) {
      var respTexto = preguntaEditar.cantidadPorRespuesta[index].textoRespuesta;
      respuestashtml = respuestashtml + this.prepararRespuestaModal(respTexto,index,idPregunta);
    }
    //Selecciono el contenedor de respuestas y le inserto el codigo html preparado en el ciclo
    var containerResp = document.getElementById("containerRespuestas");
    containerResp.innerHTML = respuestashtml;

   //Asigno eventos a botones de autoborrado al modal de Edit
    this.asignarEventoAutoborradoRespModal();
  },

  //Devuelve el texto html a agregar al modal segun la cantidad de respuestas que haya
  prepararRespuestaModal: function(textoRespuesta,idRespuesta,idPregunta){
    return '<div idPregunta="' + idPregunta + '"><input type="text" class="form-control" value="'+ textoRespuesta +'" idRespuesta ="' + idRespuesta +'" idPregunta="' + idPregunta + '"></input><img class="modalDelete" src="img/deleteButton.png" alt="No Image"></img></div>';
  },

  //Asigno eventos a botones de autoborrado al modal de Edit
  asignarEventoAutoborradoRespModal: function(){
    $("#containerRespuestas").find("img").click(function() {
      $(this).parent().remove();
    });
  },

  agregarVotos:function(idPregunta,respuestaSeleccionada){
    this.modelo.sumarVoto(idPregunta,respuestaSeleccionada);
  }
};
