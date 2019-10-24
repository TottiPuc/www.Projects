// Abre una ventana para guardar nuestro arte en un archivo pixel-art.png
function guardarPixelArt() {
  html2canvas($("#grilla-pixeles") , {
    onrendered: function(canvas) {
      theCanvas = canvas;
      canvas.toBlob(function(blob) {
        saveAs(blob, "pixel-art.png");
      });
    }
  });
}

// Carga a un superheroe predefinido
function cargarSuperheroe(superheroe) {
  var $pixeles = $("#grilla-pixeles div");
  for (var i = 0; i < superheroe.length; i++) {
    $pixeles[i].style.backgroundColor = superheroe[i];
  }
}

// Borrar todo lo que esta dibujado dentro  del cuadro principal con efecto de opacity
$("#borrar").click(eliminar)

function eliminar() {
  var $pixeles = $("#grilla-pixeles div");
  $pixeles.each(function(idx,el){
    //console.log("elemento " + idx)
    $(el).animate({opacity:10, backgroundColor:"#FFF"},2000);
  })
}