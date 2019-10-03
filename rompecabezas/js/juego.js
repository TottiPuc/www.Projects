// Arreglo que contiene las intrucciones del juego 
var instrucciones = ["Mover Arriba ↑", "Mover Abajo ↓", "Mover Izquierda ←", "Mover Derecha →"];
// Arreglo para ir guardando los movimientos que se vayan realizando
var movimientos = [];

// Representación de la grilla. Cada número representa a una pieza.
// El 9 es la posición vacía
var grilla = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];
//grilla2 para comparar cuando el juego a terminado.
var grilla2 = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];

/* Estas dos variables son para guardar la posición de la pieza vacía. 
Esta posición comienza siendo la [2, 2]*/
var filaVacia = 2;
var columnaVacia = 2;

/* Esta función deberá recorrer el arreglo de instrucciones pasado por parámetro. 
Cada elemento de este arreglo deberá ser mostrado en la lista con id 'lista-instrucciones'. 
Usar la función mostrarInstruccionEnLista().*/
function mostrarInstrucciones(instrucciones) {
    for (let i = 0; i < instrucciones.length; i++) {
      const elemento = instrucciones [i];
      mostrarInstruccionEnLista(elemento, "lista-instrucciones")
      console.log(elemento)
      
    }
}

/* función que agregue la última dirección al arreglo de movimientos
y utiliza actualizarUltimoMovimiento para mostrarlo en pantalla */

function agregarMovimientos (direccion,correcto){
  movimientos.push(direccion);
  actualizarUltimoMovimiento(direccion,correcto);
}


/* Esta función va a chequear si el Rompecabezas esta en la posicion ganadora. */
function chequearSiGano() {
    var control= true;
    var contador =0;
    for (let i = 0; i < grilla.length; i++) {
      for (let j = 0; j < grilla[i].length; j++) {
         if (grilla[i][j]==grilla2[i][j]) { 
            contador++
            console.log(grilla[i][j])
         }else {
             control= false;
             console.log("salga")
             break;
              }
      }
      if (control == false) {
          break;
        }
      
    }
    if (contador == 9) {
      return true;
    }
    else{
      return false;
    }
}

// Cartel que avise que el juego termino de forma exitosa y muestra los movimientos realizados.
function mostrarCartelGanador() {
    swal("Excelente Felicitaciones !!!!", "Tus habilidades son maravillosas. Acontinuacion puedes ver la lista total de los movimientos \n ====================== \n  Nomenclatura de movimientos\n 37 -> Izquierda \n 38 -> Arriba \n 39 -> Derecha \n 40 -> Abajo \n ======================\n Movimientos Realizados \n" + movimientos,"success")
}

// Función que intercambia dos posiciones en la grilla.

function intercambiarPosicionesGrilla(filaPos1, columnaPos1, filaPos2, columnaPos2) {
    var viejaPosicion = grilla[filaPos1][columnaPos1];
    var nuevaPosicion = grilla[filaPos2][columnaPos2];
    grilla[filaPos1][columnaPos1] = nuevaPosicion;
    grilla[filaPos2][columnaPos2] = viejaPosicion;
}

// Actualiza la posición de la pieza vacía
function actualizarPosicionVacia(nuevaFila, nuevaColumna) {
  console.log("La ficha vacia esta en la posicion (" + nuevaFila + " " + nuevaColumna+")");
    filaVacia = nuevaFila;
    columnaVacia = nuevaColumna;
}


// Para chequear si la posicón está dentro de la grilla.
function posicionValida(fila, columna) {
    if (fila > grilla.length-1 || fila < 0 || columna > grilla[1].length-1|| columna <0) {
      console.log("posicion invalida (" + fila +" "+ columna +")")
      return false;
    } else {
      return true;
    }
}

/* Movimiento de fichas, en este caso la que se mueve es la negra intercambiando su posición con otro elemento.
Las direcciones están dadas por números que representa: arriba (38), abajo (40), izquierda (37), derecha (39) */
function moverEnDireccion(direccion) {
  var nuevaFilaPiezaVacia;
  var nuevaColumnaPiezaVacia;

  // Mueve pieza hacia la abajo, reemplazandola con la negra
  if (direccion === codigosDireccion.ABAJO) {
    nuevaFilaPiezaVacia = filaVacia - 1;
    nuevaColumnaPiezaVacia = columnaVacia;
  }
    
  // Mueve pieza hacia arriba, reemplazandola con la negra
  else if (direccion === codigosDireccion.ARRIBA) {
    nuevaFilaPiezaVacia = filaVacia + 1;
    nuevaColumnaPiezaVacia = columnaVacia;
  }
    
  // Mueve pieza hacia la derecha, reemplazandola con la negra
  else if (direccion === codigosDireccion.DERECHA) {
    nuevaFilaPiezaVacia = filaVacia;
    nuevaColumnaPiezaVacia = columnaVacia-1;
 
  }
    
  // Mueve pieza hacia la izquierda, reemplazandola con la megra
  else if (direccion === codigosDireccion.IZQUIERDA) {
    nuevaFilaPiezaVacia = filaVacia ;
    nuevaColumnaPiezaVacia = columnaVacia +1;
  
  }

  // A continuación se chequea si la nueva posición es válida, si lo es, se intercambia. 


    if (posicionValida(nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia)) {
        intercambiarPosiciones(filaVacia, columnaVacia, nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia);
        actualizarPosicionVacia(nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia);

  // se agregar la dirección del movimiento al arreglo de movimientos y se muestra si es correcto
        var movCorrecto = true;
        agregarMovimientos(direccion,movCorrecto);
    }else{
      var movCorrecto = false;
      agregarMovimientos(direccion,movCorrecto);
    }
}


/* codigosDireccion es un objeto que permite reemplazar
el uso de números confusos en código. Para referirte a la dirección
izquierda, en vez de usar el número 37, se puede usar:
codigosDireccion.IZQUIERDA. */
var codigosDireccion = {
    IZQUIERDA: 37,
    ARRIBA: 38,
    DERECHA: 39,
    ABAJO: 40
}

/* Funcion que realiza el intercambio logico (en la grilla) y ademas actualiza
el intercambio en la pantalla (DOM). */
function intercambiarPosiciones(fila1, columna1, fila2, columna2) {
  // Intercambio posiciones en la grilla
  var pieza1 = grilla[fila1][columna1];
  var pieza2 = grilla[fila2][columna2];

  intercambiarPosicionesGrilla(fila1, columna1, fila2, columna2);
  intercambiarPosicionesDOM('pieza' + pieza1, 'pieza' + pieza2);

}

/* Intercambio de posiciones de los elementos del DOM que representan
las fichas en la pantalla */

function intercambiarPosicionesDOM(idPieza1, idPieza2) {
  // Intercambio posiciones en el DOM
  var elementoPieza1 = document.getElementById(idPieza1);
  var elementoPieza2 = document.getElementById(idPieza2);

  var padre = elementoPieza1.parentNode;

  var clonElemento1 = elementoPieza1.cloneNode(true);
  var clonElemento2 = elementoPieza2.cloneNode(true);

  padre.replaceChild(clonElemento1, elementoPieza2);
  padre.replaceChild(clonElemento2, elementoPieza1);
}

/* Actualiza la representación visual del último movimiento 
en la pantalla, representado con una flecha. */
function actualizarUltimoMovimiento(direccion,correcto) {
  ultimoMov = document.getElementById('flecha');
  if (correcto) {
   
        switch (direccion) {
          case codigosDireccion.ARRIBA:
            ultimoMov.textContent = '↑ movimiento correcto';
            break;
          case codigosDireccion.ABAJO:
            ultimoMov.textContent = '↓ movimiento correcto';
            break;
          case codigosDireccion.DERECHA:
            ultimoMov.textContent = '→ movimiento correcto';
            break;
          case codigosDireccion.IZQUIERDA:
            ultimoMov.textContent = '← movimiento correcto';
            break;
         }
   } else{
        switch (direccion) {
          case codigosDireccion.ARRIBA:
            ultimoMov.textContent = '↑ movimiento Incorrecto';
            break;
          case codigosDireccion.ABAJO:
            ultimoMov.textContent = '↓ movimiento Incorrecto';
            break;
          case codigosDireccion.DERECHA:
            ultimoMov.textContent = '→ movimiento Incorrecto';
            break;
          case codigosDireccion.IZQUIERDA:
            ultimoMov.textContent = '← movimiento Incorrecto';
            break;
   }
}
}

/* Esta función permite agregar una instrucción a la lista
con idLista. Se crea un elemento li dinámicamente con el texto 
pasado con el parámetro "instrucción". */
function mostrarInstruccionEnLista(instruccion, idLista) {
  var ul = document.getElementById(idLista);
  var li = document.createElement("li");
  li.textContent = instruccion;
  ul.appendChild(li);
}

/* Función que mezcla las piezas del tablero una cantidad de veces dada.
Se calcula una posición aleatoria y se mueve en esa dirección. De esta forma
se mezclará todo el tablero. */

function mezclarPiezas(veces) {
  if (veces <= 0) {
    return;
  }
  
  var direcciones = [codigosDireccion.ABAJO, codigosDireccion.ARRIBA,
      codigosDireccion.DERECHA, codigosDireccion.IZQUIERDA
    ];

  var direccion = direcciones[Math.floor(Math.random() * direcciones.length)];
  moverEnDireccion(direccion);

  setTimeout(function() {
      mezclarPiezas(veces - 1);
    }, 100);
    /*eliminar los movimientos de la mezcla*/
    movimientos=[]; 
}

/* capturarTeclas: Esta función captura las teclas presionadas por el usuario. Cuando una tecla es presionada  en 
base a eso hacer algo.  cuando se toca una tecla se hace algo en respuesta, en este caso, un movimiento */
function capturarTeclas() {
  
  document.body.onkeydown = (function(evento) {
    if (evento.which === codigosDireccion.ABAJO ||
      evento.which === codigosDireccion.ARRIBA ||
      evento.which === codigosDireccion.DERECHA ||
      evento.which === codigosDireccion.IZQUIERDA) {

      moverEnDireccion(evento.which);

        var gano = chequearSiGano();
        if (gano) {
          setTimeout(function() {
              mostrarCartelGanador();
              
              }, 500);
            }
            evento.preventDefault();
        }
    })
}

/* Se inicia el rompecabezas mezclando las piezas 30 veces 
y ejecutando la función para que se capturen las teclas que 
presiona el usuario */
function iniciar() {
    mostrarInstrucciones(instrucciones);
    mezclarPiezas(30);
    capturarTeclas();
}

// Ejecutamos la función iniciar
iniciar();