/*
 * Modelo
 */
var Modelo = function() {
  this.preguntas = [];
  this.ultimoId = 0;

  //inicializacion de eventos
  this.preguntaAgregada = new Evento(this);
  this.preguntaBorrada = new Evento(this);
  this.preguntaeditada = new Evento(this);
  this.respuestaVotada = new Evento(this);
  this.borrarTodo = new Evento(this);
  
  
};

Modelo.prototype = {
  //se obtiene el id más grande asignado a una pregunta
  obtenerUltimoId: function() {
    if (this.preguntas.length>0) {
      var newId = this.preguntas.length
      this.ultimoId = newId;
      return newId
    } else {
      return 0;
    }
    
  },

  //se agrega una pregunta dado un nombre y sus respuestas
  agregarPregunta: function(nombre, respuestas) {
    var id = this.obtenerUltimoId();
    id++;
    //console.log(id)
    var nuevaPregunta = {'textoPregunta': nombre, 'id': id, 'cantidadPorRespuesta': respuestas};
    this.preguntas.push(nuevaPregunta);
    this.guardar();
    this.preguntaAgregada.notificar();
  },

  borrarPregunta: function (idPregunta) {
    
    this.preguntas = _.filter(this.preguntas, function(preg) { return !(preg.id==idPregunta); });
    
    this.guardar();
    this.preguntaBorrada.notificar();
    //console.log(this.preguntas)
  },

  borrarPreguntasAll: function() {
    this.preguntas = [];
    this.guardar();
    this.borrarTodo.notificar();
  },

  editarPregunta: function (idPregunta,nuevoTexto,nuevaRespuesta) {
    var buscarPregunta= this.buscarPreguntaPorId(idPregunta);
    //cambiar el encabezado
    buscarPregunta.textoPregunta=nuevoTexto;
        
    //Filtro el array viejo a travez de nuevaRespuesta
    var RespuestasAnterioresFiltradas = buscarPregunta.cantidadPorRespuesta.filter(function(resp) {
      return nuevaRespuesta.includes(resp.textoRespuesta);
    });

      //nuevaRespuesta es un array que contiene las nuevas respuestas
      //Recorro las respuestas nuevas, agregando las no existentes en el array de respuestas existentes
      for (let index = 0; index < nuevaRespuesta.length; index++) {
        var respNew = nuevaRespuesta[index];
        //si el array de respuestas no incluye a la nueva respuesta, hay que agregarla al final
        if (!(RespuestasAnterioresFiltradas.some(respAnt => respAnt.textoRespuesta === respNew))){
          //La agrego al final con cant 0
          RespuestasAnterioresFiltradas.push({textoRespuesta: respNew, cantidad: 0});
        }
      }
      //CAMBIO LAS RESPUESTAS
      buscarPregunta.cantidadPorRespuesta = RespuestasAnterioresFiltradas;
    //Cambio las respuestas. respuestas es un array de esta forma:
    // [{textoRespuesta: "asd", cantidad: 0},{textoRespuesta: "qwe", cantidad: 2}]
    this.guardar();
    this.preguntaeditada.notificar();
  },

  sumarVoto: function(idPregunta,respuestaTexto) {
    //Busco la pregunta en la que esta la respuesta elegida
    var preguntaParaSumar = this.buscarPreguntaPorId(idPregunta);
    //Busco la respuesta elegida dentro de la pregunta
    console.log("esto es", idPregunta, respuestaTexto)
    var respuestaParaSumar = this.buscarRespuestaPorTexto(preguntaParaSumar,respuestaTexto);
    //Le sumo a la cantidad de la respuesta +1
    respuestaParaSumar.cantidad +=1;
    this.guardar();
    this.respuestaVotada.notificar();
  },

    // aditional functions
buscarPreguntaPorId:function (idPregunta) {
  return this.preguntas.find(function (pregunta) {
    return pregunta.id== idPregunta
  })
},

  //Devuelve la respuesta {texto:xxx ,cantidad:xxx} de una determinada pregunta que sea igual al texto pasado por param
  buscarRespuestaPorTexto: function(pregunta,respuestaTexto){
    return pregunta.cantidadPorRespuesta.find(function(respuesta) {
            return respuesta.textoRespuesta == respuestaTexto;
    });
  },

    //se guardan las preguntas
    guardar: function(){
      localStorage.setItem('preguntas',JSON.stringify(this.preguntas));
    },
  
    precargarLocal:function(){
      if (localStorage.getItem('preguntas')!==null){
        this.preguntas = JSON.parse(localStorage.getItem('preguntas'));
      }
  },
};


