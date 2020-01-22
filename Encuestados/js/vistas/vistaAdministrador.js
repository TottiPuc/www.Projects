/*
 * Vista administrador
 */
var VistaAdministrador = function(modelo, controlador, elementos) {
  this.modelo = modelo;
  this.controlador = controlador;
  this.elementos = elementos;
  var contexto = this;

  // suscripción de observadores
  this.modelo.preguntaAgregada.suscribir(function() {
    contexto.reconstruirLista();
  });

  this.modelo.preguntaBorrada.suscribir(function() {
    contexto.reconstruirLista();
  });

  this.modelo.preguntaeditada.suscribir(function() {
    contexto.reconstruirLista();
  });

  this.modelo.borrarTodo.suscribir(function() {
    contexto.reconstruirLista();
  });
};


VistaAdministrador.prototype = {
  //lista
  inicializar: function() {
    //llamar a los metodos para reconstruir la lista, configurar botones y validar formularios
    
    this.precargarLocal()
    this.reconstruirLista();
    this.configuracionDeBotones();
    validacionDeFormulario();
  },

  construirElementoPregunta: function(pregunta){
        //asignar a nuevoitem un elemento li con clase "list-group-item", id "pregunta.id" y texto "pregunta.textoPregunta"
    var nuevoItem =$('<li/>',{
      'html' : pregunta.textoPregunta,
      'class' : 'list-group-item',
      'id' : pregunta.id
    });

    var interiorItem = $('.d-flex');
    var titulo = interiorItem.find('h5');
    titulo.text(pregunta.textoPregunta);
    var respu = interiorItem.find('small');
    console.log(pregunta.cantidadPorRespuesta)
    respu.text(pregunta.cantidadPorRespuesta.map(function(resp){
      return " " + resp.textoRespuesta;
    }));
    nuevoItem.html($('.d-flex').html());
    return nuevoItem;
  },

  reconstruirLista: function() {
    var lista = this.elementos.lista;
    lista.html('');
    var preguntas = this.modelo.preguntas;
    for (var i=0;i<preguntas.length;++i){
      lista.append(this.construirElementoPregunta(preguntas[i]));
    }
  },

  configuracionDeBotones: function(){
    var e = this.elementos;
    var contexto = this;

    //asociacion de eventos a boton
    e.botonAgregarPregunta.click(function() {
      var value = e.pregunta.val();
      var respuestas = [];

      //$('[name="option[]"]').each(function()  con esta se genera siempre una respuesta vacia 
      $('div:not(#optionTemplate)>input[name="option[]"]').each(function(){
        var respuesta = {'textoRespuesta': $(this).val(),'cantidad':0}
        respuestas.push(respuesta)
      })
      contexto.limpiarFormulario();
      contexto.controlador.agregarPregunta(value, respuestas);
    });

    e.botonBorrarPregunta.click(function () {
      var id = parseInt($('.list-group-item.active').attr('id'));
      contexto.controlador.borrarPregunta(id);
    });



      //Cargo el MODAL
    e.botonEditarPregunta.click(function () {
      var id = parseInt($('.list-group-item.active').attr('id')) || 0;
      if (id==0) {
        return false
      }
      contexto.controlador.llenarModal(id);
      $('#editModal').modal('show');
    });

     //Cargo edito la pregunta al tocar confirmar en MODAL
     e.confirmarEdit.click(function() {
      //respuestasNuevas es un array que contiene las nuevas respuestas
      var idPregunta = parseInt($('.list-group-item.active').attr('id'));
      var nuevoTexto = $('#pregunta-text').val();
      var respuestasNuevas = [];

        var idRespuestaMaximo = $("#containerRespuestas div").length + 15; 
        //Ciclo que llena las respuestas en el array
        for (let index = 0; index < idRespuestaMaximo; index++) {
         var respuestaAPushear = $("input[idrespuesta='"+index + "']").val();
            if (respuestaAPushear!==undefined) {
                respuestasNuevas.push(respuestaAPushear);
            }
        };

      contexto.controlador.editarPregunta(idPregunta,nuevoTexto,respuestasNuevas);
      $('#editModal').modal('hide');
    });
    
    //Agregar pregunta en MODAL
    e.agregarRespModalButton.click(function(event) {
      var idPregunta = $(event.target).parent().find("#pregunta-text").attr("idpregunta");
      var idRespuesta= $(event.target).parent().find("#containerRespuestas").children().length;
      
      //Preparo la linea de DIV + INPUT
      var newRowInput = '<div idPregunta="' + idPregunta + '"><input type="text" class="form-control" value="" idRespuesta ="' + idRespuesta +'" idPregunta="' + idPregunta + '"></input><img class="modalDelete" src="img/deleteButton.png" width="5" alt="No Image"></img></div>';
      
      //Agrego el nuevo input al DOM
      $(event.target).parent().find("#containerRespuestas").append(newRowInput);

      //Asigno eventos a botones de autoborrado al modal de Edit
        contexto.controlador.asignarEventoAutoborradoRespModal();
    });
    
    e.borrarTodo.click(function() {
      contexto.controlador.borrarPreguntasAll();
    });
  },

  

  limpiarFormulario: function(){
    $('.form-group.answer.has-feedback.has-success').remove();
  },

  precargarLocal:function(){
    this.controlador.precargarLocal();
  },


};
