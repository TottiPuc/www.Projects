/* El objeto jugador es un objeto literal que se encuentra incompleto.
 Solo tiene asignadas algunas de sus propiedades y ningun metodo */
var Jugador = {
  /* el sprite contiene la ruta de la imagen
  */
  sprite: 'imagenes/auto_rojo_abajo.png',
  x: 130,
  y: 160,
  ancho: 15,
  alto: 30,
  velocidad: 10,
  vidas: 5,
  vidaInicial:5,

  mover:function(movX,movY){
    this.x = this.x + movX;
    this.y = this.y +movY;
    // cambiar la direccion del jugador
      if (movX<0) {
          this.sprite= 'imagenes/auto_rojo_izquierda.png';
          this.ancho= 30;
          this.alto= 15;
      }
        if (movX>0) {
          this.sprite= 'imagenes/auto_rojo_derecha.png';
          this.ancho= 30;
          this.alto= 15;
      }
        if (movY<0) {
          this.sprite= 'imagenes/auto_rojo_arriba.png';
          this.ancho= 15;
          this.alto= 30;
      }
      if (movY>0) {
        this.sprite= 'imagenes/auto_rojo_abajo.png';
        this.ancho= 15;
        this.alto= 30;
      }
  },
  perderVidas:function(cantVidas) {
    console.log("inicio con " + this.vidaInicial + "vidas")
    this.vidas = this.vidas - cantVidas;
    console.log("me restan "+ this.vidas) 
  }


}
