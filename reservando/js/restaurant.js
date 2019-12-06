var Restaurant = function(id, nombre, rubro, ubicacion, horarios, imagen, calificaciones) {
    this.id = id;
    this.nombre = nombre;
    this.rubro = rubro;
    this.ubicacion = ubicacion;
    this.horarios = horarios;
    this.imagen = imagen;
    this.calificaciones = calificaciones;
}

Restaurant.prototype.reservarHorario = function(horarioReservado) {
    //refactoring
    var nuevoHorario = this.horarios.filter(horario => horario !== horarioReservado )
    this.horarios = nuevoHorario;
   
    /* funcion original
    for (var i = 0; i < this.horarios.length; i++) {
        if (this.horarios[i] === horarioReservado) {
            this.horarios.splice(i, 1);
            return;
        }
    }
    */
}

Restaurant.prototype.calificar = function(nuevaCalificacion) {
    if (Number.isInteger(nuevaCalificacion) && nuevaCalificacion > 0 && nuevaCalificacion < 10) {
        this.calificaciones.push(nuevaCalificacion);
    }
}

Restaurant.prototype.obtenerPuntuacion = function() {
    /*funcion Original
    if (this.calificaciones.length === 0) {
        return 0;
    } else {
        var sumatoria = 0;
        for (var i = 0; i < this.calificaciones.length; i++) {
            sumatoria += this.calificaciones[i]
        }
        var promedio = sumatoria / this.calificaciones.length;
        return Math.round(promedio * 10) / 10;
    }
    */
   //funcion refactorizada
   if (this.calificaciones.length === 0) {
    return 0;}

    return Math.round(promedioArray(this.calificaciones) * 10) / 10;
}

//funciones genericas

var sumatoriArray = function(ArrayCalificaciones) {
    
return ArrayCalificaciones.reduce(function(acum, newValue){return acum + newValue;});
}

var promedioArray = function(array) {
    
    return sumatoriArray(array)/ array.length;
}

