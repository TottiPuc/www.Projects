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
    })
);


//################### EVENTOS #####################################

// eventos sobre paleta de colores que cambia el color seleccionado

$("#paleta").click(elegirColor);

//$("#grilla-pixeles").mouseover(colorear)
var paintMode = true;
verificar()
//############### FUNCIONES AUXILIARES ############################

function elegirColor(e) {
  indicadorColor.style.backgroundColor = e.target.style.backgroundColor 
}

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
    console.log("pintar con click sostenido");
  }

  $elementoTotal.dblclick(invertirModoDePintar)
}


function colorear(e) {
  e.target.style.backgroundColor = indicadorColor.style.backgroundColor;
  }

function soltar(e) {
  var mouse = "off";
  e.target.style.backgroundColor = "red";
  console.log(mouse);
}

function invertirModoDePintar() {
  console.log(paintMode)
  paintMode = !paintMode
  console.log("El modo de pintar es " + paintMode)
  verificar()
}





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

