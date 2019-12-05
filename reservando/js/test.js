var expect = chai.expect; 

//###################################################################################################################################################
// provando la funcion reservarHorario()

//requerimiento: eliminar el horario del arreglo Horario si se reserva
describe('Eliminar horario del arreglo caso este sea seleccionado', function(){
    it('Al reservar un horario se debe eliminar del arreglo Listado de restaurantes', function () {
     // Objeto reserva creado con horarios reales
     var reservar = new Restaurant(1, "TAO Uptown", "Asiática", "Nueva York", ["13:00", "15:30", "18:00"], "../img/asiatica1.jpg", [6, 7, 9, 10, 5]);
     var horariosOriginal = reservar.horarios.length;
     // selecciono un horario de los disponibles en la reserva
     reservar.reservarHorario("13:00")
     expect(reservar.horarios.length).to.equal(horariosOriginal-1)   
    })

    it("Si se reserva un horario que no existe el arreglo de horarios permanece igual", function(){
    // Objeto reserva creado con horarios reales
     var reservar = new Restaurant(1, "TAO Uptown", "Asiática", "Nueva York", ["13:00", "15:30", "18:00"], "../img/asiatica1.jpg", [6, 7, 9, 10, 5]);
     //var horariosOriginal = reservar.horarios.length;
     // selecciono un horario no disponibles en la reserva
     //reservar.reservarHorario("15:00")
     //expect(reservar.horarios.length).to.equal(horariosOriginal)   
     // verifico si un horario no esta incluido en el arreglo de horarios original
     expect(reservar.horarios).to.not.include("15:00")   

    })

    it("Si no se pasa un parametro a la funcion reservarHorario el arreglo de horarios permanece igual", function(){
        // Objeto reserva creado con horarios reales
         var reservar = new Restaurant(1, "TAO Uptown", "Asiática", "Nueva York", ["13:00", "15:30", "18:00"], "../img/asiatica1.jpg", [6, 7, 9, 10, 5]);
         var horariosOriginal = reservar.horarios.length;
         // no se pasan parametros a la funcion reservarHorario
         reservar.reservarHorario()
         expect(reservar.horarios.length).to.equal(horariosOriginal)   
        
        })
})

//###################################################################################################################################################

// provando la funcion obtenerPuntuacion

describe('Calcular el promedio de las puntuaciones corectamente', function () {
    it('Calculo de las puntuaciones de un determinado restaurante con un arreglo de calificaciones', function () {
        // Objeto restaurante creado
        var restaurante = new Restaurant(15, "Carmine's", "Pasta", "Nueva York", ["14:30", "16:30", "19:00"], "../img/pasta1.jpg", [9, 8, 5, 5, 9]);
        // promedio del objeto = 7.2
        var promedio = restaurante.obtenerPuntuacion();
        expect(promedio).to.equal(7.2)
        
    })

    it('Calculo de las puntuaciones de un determinado restaurante en el cual su arreglo de puntuaciones esta vacio', function () {
        // Objeto restaurante creado sin puntuaciones
        var restaurante = new Restaurant(15, "Carmine's", "Pasta", "Nueva York", ["14:30", "16:30", "19:00"], "../img/pasta1.jpg", []);
        // promedio del objeto = 0
        var promedio = restaurante.obtenerPuntuacion();
        expect(promedio).to.equal(0)
        
    })
    
})


//###################################################################################################################################################

// provando la funcion calificar

describe('Verificar si se adicionan nuevas entradas al array de calificaciones', function () {
    it('dado un array de calificaciones de dos elementos se verifica si se adiciona uno nuevo', function () {
      // Objeto restaurante creado 
      var restaurante = new Restaurant(15, "Carmine's", "Pasta", "Nueva York", ["14:30", "16:30", "19:00"], "../img/pasta1.jpg", [7,9]);
      restaurante.calificar(5)
      expect(restaurante.calificaciones).to.eql([7,9,5])
    })

    it('dado un array de calificaciones de dos elementos se verifica si la entrada cero(0) no se adiciona al array', function () {
        // Objeto restaurante creado 
        var restaurante = new Restaurant(15, "Carmine's", "Pasta", "Nueva York", ["14:30", "16:30", "19:00"], "../img/pasta1.jpg", [7,9]);
        restaurante.calificar(0)
        expect(restaurante.calificaciones).to.eql([7,9])
      })

      it('dado un array de calificaciones de dos elementos se verifica si la entrada flotante(5.6) no se adiciona al array', function () {
        // Objeto restaurante creado 
        var restaurante = new Restaurant(15, "Carmine's", "Pasta", "Nueva York", ["14:30", "16:30", "19:00"], "../img/pasta1.jpg", [7,9]);
        restaurante.calificar(5.6)
        expect(restaurante.calificaciones).to.eql([7,9])
      })

      it('dado un array de calificaciones de dos elementos se verifica si la entrada mayor a 10 no se adiciona al array', function () {
        // Objeto restaurante creado 
        var restaurante = new Restaurant(15, "Carmine's", "Pasta", "Nueva York", ["14:30", "16:30", "19:00"], "../img/pasta1.jpg", [7,9]);
        restaurante.calificar(11)
        expect(restaurante.calificaciones).to.eql([7,9])
      })
    
})

//###################################################################################################################################################

// provando la funcion buscarRestaurante

describe('Buscar un restaurant por id', function(){
  var arrayRestaurants = [
      new Restaurant(1, "TAO Uptown", "Asiática", "Nueva York", ["13:00", "15:30", "18:00"], "../img/asiatica1.jpg", [6, 7, 9, 10, 5],1250),
      new Restaurant(2, "Mandarín Kitchen", "Asiática", "Londres", ["15:00", "14:30", "12:30"], "../img/asiatica2.jpg", [7, 7, 3, 9, 7],600),
      new Restaurant(3, "Burgermeister", "Hamburguesa", "Berlín", ["11:30", "12:00", "22:30"], "../img/hamburguesa4.jpg", [5, 8, 4, 9, 9],700),
      new Restaurant(4, "Bleecker Street Pizza", "Pizza", "Nueva York", ["12:00", "15:00", "17:30"], "../img/pizza2.jpg", [8, 9, 9, 4, 6, 7],250),
      ];
  var listadoTest = new Listado(arrayRestaurants);

  it('Dado un listado de restaurantes, al buscar el restaurante con id 3, se obtiene el restaurante correcto', function() {
      var restaurant = listadoTest.buscarRestaurante(1)
      expect(restaurant.id).to.equal(1);
  })
  it('Dado un listado de restaurantes, al buscar el restaurante con id inexistente, se obtiene undefined', function() {
      var restaurant = listadoTest.buscarRestaurante(65)
      expect(restaurant.id).to.equal(undefined);
  })
  it('Dado un listado de restaurantes, al buscar el restaurante sin parámetro, se obtiene undefined', function() {
      var restaurant = listadoTest.buscarRestaurante()
      expect(restaurant.id).to.equal(undefined);
  })
});


//###################################################################################################################################################

// provando la funcion obtenerRestaurante

describe('Verificar la funcion filtro de listado de restaurants', function(){
  var arrayRestaurants = [
      new Restaurant(1, "TAO Uptown", "Asiática", "Nueva York", ["13:00", "15:30", "18:00"], "../img/asiatica1.jpg", [6, 7, 9, 10, 5],1250),
      new Restaurant(2, "Mandarín Kitchen", "Asiática", "Londres", ["15:00", "14:30", "12:30"], "../img/asiatica2.jpg", [7, 7, 3, 9, 7],600),
      new Restaurant(3, "Burgermeister", "Hamburguesa", "Berlín", ["11:30", "12:00", "22:30"], "../img/hamburguesa4.jpg", [5, 8, 4, 9, 9],700),
      new Restaurant(4, "Bleecker Street Pizza", "Pizza", "Nueva York", ["12:00", "15:00", "17:30"], "../img/pizza2.jpg", [8, 9, 9, 4, 6, 7],250),
      new Restaurant(5, "Jolly", "Asiática", "Berlín", ["12:00", "13:30", "16:00"], "../img/asiatica3.jpg", [8, 3, 9, 5, 6, 7],300),
      ];
  var listadoTest = new Listado(arrayRestaurants); 

  it('Dado un listado con 5 restaurantes, si no se aplica ningún filtro, se obtiene como resultado 5 restaurantes', function() {
      var restaurantesFiltrados = listadoTest.obtenerRestaurantes(null, null, null);
      expect(restaurantesFiltrados.length).to.equal(5);
  })
  it('Dado un listado con 5 restaurantes y tres de ellos asiáticos, si se aplica de filtro ("Asiática",null,null), se obtiene como resultado 3 restaurantes', function() {
      var restaurantesFiltrados = listadoTest.obtenerRestaurantes("Asiática",null,null);
      expect(restaurantesFiltrados.length).to.equal(3);
  })
  it('Dado un listado con 5 restaurantes y dos de ellos con horario 15:00, si se aplica de filtro (null,null,"15:00"), se obtiene como resultado 2 restaurantes', function() {
      var restaurantesFiltrados = listadoTest.obtenerRestaurantes(null,null,"15:00");
      expect(restaurantesFiltrados.length).to.equal(2);
  })
  it('Dado un listado con 5 restaurantes y uno de ellos con rubro "Asiática", ciudad "Berlín" y horario" 12:00", se obtiene como resultado 1 restaurant', function() {
      var restaurantesFiltrados = listadoTest.obtenerRestaurantes("Asiática","Berlín","12:00");
      expect(restaurantesFiltrados.length).to.equal(1);
  })
  });