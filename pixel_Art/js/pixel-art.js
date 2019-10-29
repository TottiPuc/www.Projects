var nombreColores = ['White', 'LightYellow',
  'LemonChiffon', 'LightGoldenrodYellow', 'PapayaWhip', 'Moccasin', 'PeachPuff', 'PaleGoldenrod', 'Bisque', 'NavajoWhite', 'Wheat', 'BurlyWood', 'Tan',
  'Khaki', 'Yellow', 'Gold', 'Orange', 'DarkOrange', 'OrangeRed', 'Tomato', 'Coral', 'DarkSalmon', 'LightSalmon', 'LightCoral', 'Salmon', 'PaleVioletRed',
  'Pink', 'LightPink', 'HotPink', 'DeepPink', 'MediumVioletRed', 'Crimson', 'Red', 'FireBrick', 'DarkRed', 'Maroon',
  'Brown', 'Sienna', 'SaddleBrown', 'IndianRed', 'RosyBrown',
  'SandyBrown', 'Goldenrod', 'DarkGoldenrod', 'Peru',
  'Chocolate', 'DarkKhaki', 'DarkSeaGreen', 'MediumAquaMarine',
  'MediumSeaGreen', 'SeaGreen', 'ForestGreen', 'Green', 'DarkGreen', 'OliveDrab', 'Olive', 'DarkOliveGreen', 'YellowGreen', 'LawnGreen',
  'Chartreuse', 'GreenYellow', 'Lime', 'SpringGreen', 'LimeGreen',
  'LightGreen', 'PaleGreen', 'PaleTurquoise',
  'AquaMarine', 'Cyan', 'Turquoise', 'MediumTurquoise', 'DarkTurquoise', 'DeepSkyBlue',
  'LightSeaGreen', 'CadetBlue', 'DarkCyan', 'Teal', 'Steelblue', 'LightSteelBlue', 'Honeydew', 'LightCyan',
  'PowderBlue', 'LightBlue', 'SkyBlue', 'LightSkyBlue',
  'DodgerBlue', 'CornflowerBlue', 'RoyalBlue', 'SlateBlue',
  'MediumSlateBlue', 'DarkSlateBlue', 'Indigo', 'Purple', 'DarkMagenta', 'Blue',
  'MediumBlue', 'DarkBlue', 'Navy', 'Thistle',
  'Plum', 'Violet', 'Orchid', 'DarkOrchid', 'Fuchsia', 'Magenta', 'MediumOrchid',
  'BlueViolet', 'DarkViolet', 'DarkOrchid',
  'MediumPurple', 'Lavender', 'Gainsboro', 'LightGray', 'Silver', 'DarkGray', 'Gray',
  'DimGray', 'LightSlateGray', 'DarkSlateGray', 'Black'
];

var paleta = document.getElementById("paleta");
var grilla = document.getElementById("grilla-pixeles")

iniciar();

// Variable para guardar el elemento 'color-personalizado'
// Es decir, el que se elige con la rueda de color.
var colorPersonalizado = document.getElementById('color-personalizado');
var indicadorColor = document.getElementById("indicador-de-color");

colorPersonalizado.addEventListener('change', 
  (function() {
    // Se guarda el color de la rueda en colorActual
    colorActual = colorPersonalizado.value;
    indicadorColor.style.backgroundColor = colorActual;
      //funcionalidad de agregar el nombre del color al texto
  document.getElementById("texto").innerHTML = colorActual;
    })
);


//################### EVENTOS #####################################

// eventos sobre paleta de colores que cambia el color seleccionado

$("#paleta").click(elegirColor);

//$("#grilla-pixeles").mouseover(colorear)

// evento para cargar super heroes desde imagenes

$("#batman").click(function(){
  cargarSuperheroe(batman)
})

$("#wonder").click(function(){
  cargarSuperheroe(wonder)
})

$("#flash").click(function(){
  cargarSuperheroe(flash)
})

$("#invisible").click(function(){
  cargarSuperheroe(invisible)
})

//Evento para guardar las imagenes en el computador

$("#guardar").click(function () {
  guardarPixelArt()
})


//############### FUNCIONES AUXILIARES ############################

var starTime, endTime
// funcion que permite elegir el color de la paleta de colores
function elegirColor(e) {
  indicadorColor.style.backgroundColor = e.target.style.backgroundColor 
  //funcionalidad de agregar el nombre del color al texto
  document.getElementById("texto").innerHTML = e.target.style.backgroundColor
}/*
//funcion de verificacion e implementacion del modo de pintar 
var paintMode = true;
verificar()

function verificar() {
  var $elementoTotal = $("#grilla-pixeles");
  var $elementoIndividual = $("#grilla-pixeles div");
  $elementoTotal.unbind();
  $elementoIndividual.unbind();
  if (paintMode) {
    $elementoTotal.click(colorear)
    console.log("pintar haciendo click");
  } else{
    $elementoIndividual.mouseover(colorear)
    $elementoTotal.css({'cursor': 'url(https://i.ibb.co/TRrNbyD/cursor.png),auto'});
    console.log("pintar con click sostenido");
  }
 $elementoTotal.dblclick(invertirModoDePintar) // evento doble click para cambiar de modo de pintar
}
*/

//funcion para pintar haciendo click sostenido o clickeando cada elemento
var paintMode = true;
verificar()

function verificar() {
  var $elementoTotal = $("#grilla-pixeles");
  var $elementoIndividual = $("#grilla-pixeles div");
  $elementoTotal.unbind();
  $elementoIndividual.unbind();
  if (paintMode) {
    $elementoTotal.click(colorear)
    console.log("pintar haciendo click");
  } else{
    $elementoTotal.mouseover(colorear)
    
    console.log("pintar con click sostenido");
  }
 $elementoTotal.mousedown(presionar) // evento doble click para cambiar de modo de pintar
 $elementoTotal.mouseup(soltar)
}


function presionar() {
  paintMode = false;
  console.log("El modo de pintar es con click sostenido")
  verificar()
}

//funcion para soltar click
function soltar() {
  paintMode = true;
  console.log("el click se solto")
  endTime = new Date();
  var timeDiff = endTime - starTime; //en ms
  console.log("Se hizo clic durante:\n" + timeDiff);
  verificar()
  
}

// funcion que permite colorear con el color elegido de la paleta de colores
function colorear(e) {
  e.target.style.backgroundColor = indicadorColor.style.backgroundColor;
  }

 /* 
// funcion que identifica que modo de pintar se ha seleccionado si simple o sostenido
  function invertirModoDePintar() {
  console.log(paintMode)
  paintMode = !paintMode
  console.log("El modo de pintar es " + paintMode)
  verificar()
}
*/
 

// funcion que crea la paleta de colores
function colores() {
  for (let i = 0; i < nombreColores.length; i++) {
    let color = nombreColores[i]; 
    let square = document.createElement('div')
    square.style.backgroundColor=color;
    square.className = "color-paleta";
    paleta.appendChild(square);
  }
}

// funcion para crear la grilla de pixeles para colorear
function pixeles() {
  for (let i = 0; i < 1751; i++) {
    let pix = document.createElement("div");
    pix.className = "grilla-pixeles";
    grilla.appendChild(pix);    
  }
}

function iniciar() {
  colores(nombreColores);
  pixeles();
}

