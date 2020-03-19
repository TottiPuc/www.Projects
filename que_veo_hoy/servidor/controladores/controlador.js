var con = require('../lib/conexionbd');

function pedirPeliculas(req,res) {

    var anio = req.query.anio;
    var titulo = req.query.titulo;
    var genero = req.query.genero;
    var pagina = parseInt(req.query.pagina);
    var cantidad = parseInt(req.query.cantidad);
    

    // cuadrar la paginacion 
    if (pagina == 1) {
        desdeFila = 0;
    } else{
        desdeFila = (pagina -1) *52;
    }

    // query principal
    var sql_principal =  "select * from pelicula"
    
    if (anio) {
        sql_principal += "where anio = " + anio; // concateno el año si es solicitado como filtro
    }

    if (genero && sql_principal !== "select * from pelicula") {
        sql_principal += " and genero_id = " + genero; // en caso de que ya exista un filtro previo
    }else if (genero && sql_principal == "select * from pelicula") {
        sql_principal +=" where genero_id = " + genero;
    };

    if (titulo && sql_principal !== "select * from pelicula") {
        sql_principal += " and tituo LIKE '%" + titulo +"%'"; // en caso de que ya exista un filtro previo
    }else if (titulo && sql_principal == "select * from pelicula") {
        sql_principal += " where titulo LIKE '%" + titulo + "'";
    }

    //ordenar y paginar
    sql_principal = sql_principal + " ORDER BY " + req.query.columna_orden + " " + req.query.tipo_orden + " LIMIT " + desdeFila + " , " + cantidad;


    con.query(sql_principal, (error,resultado,fields)=> {
        if (error) {
            console.log("Hubo un error en la consulta "+error.message);
            return res.status(404).send("Hubo un error en la consulta");
        };
        var response ={
            'peliculas' : resultado 
        };

        // total de resultados en back end
        var sql_total = sql_principal.lastIndexOf("LIMIT");
        sql_limitada = sql_principal.slice(0,sql_total).replace("*","COUNT(*) as limiteTotal") // se pagina el resultado y se hace un conteo
        con.query(sql_limitada, (error2,resultado2,fields2) => {
            if (error2) {
                console.log("Hubo un error en la consulta "+error2.message);
                return res.status(404).send("Hubo un error en la consulta");
            }
            response.total = resultado2[0].limiteTotal
            res.send(JSON.stringify(response));
        })
       // res.send(JSON.stringify(response));
        
    });
};


function pedirGeneros(req,res) {
    var sql = "select * from genero"
    con.query(sql,(error,resultado,fields) =>{
        if (error) {
            console.log("Hubo un error en la consulta "+error.message);
            return res.status(404).send("Hubo un error en la consulta");
        };
        var response={
            'generos' : resultado
        };
        res.send(JSON.stringify(response));
    });
};


function pedirPeliculaId(req,res) {
    var id = req.params.id
    var sql = "select pelicula.id as 'peliculaId', pelicula.titulo, pelicula.duracion, pelicula.director, pelicula.anio,"
    + "pelicula.fecha_lanzamiento, pelicula.puntuacion, pelicula.poster, pelicula.trama, genero.id as 'generoId',"
    + "genero.nombre as 'generoNombre', GROUP_CONCAT(actor.nombre SEPARATOR ',') as 'actorNombre', GROUP_CONCAT(actor.id SEPARATOR ',') as 'actorId'"
    + " from pelicula join genero on pelicula.genero_id=genero.id"
    + " join actor_pelicula on pelicula.id = actor_pelicula.pelicula_id"
    + " join actor on actor_pelicula.actor_id = actor.id where pelicula.id = " + id;
    con.query(sql,(error,resultado,fields) =>{
        if (error) {
            console.log("hubo un error en la consulta "+ error.message);
            return res.status(404).send("Hubo un error en la consulta");

        };
        var response = {
            'pelicula' : resultado[0],
            'genero' : resultado[0].generoNombre,
            'actores' : resultado[0].actorNombre            
        };
        res.send(JSON.stringify(response))
    });
}


function pedirRecomendacion(req,res) {
    var anio_inicio = req.query.anio_inicio;
    var anio_fin = req.query.anio_fin
    var genero = req.query.genero
    var puntuacion = req.query.puntuacion

    var sql = "select * from pelicula join genero on pelicula.genero_id = genero.id"

    if (genero) {
        sql += " where genero.nombre = '"+ genero + "'" ;
    }

    if (anio_inicio && sql !== "select * from pelicula join genero on pelicula.genero_id=genero.id") {
        sql += " and pelicula.anio >" + anio_inicio;
    }else if (anio_inicio && sql == "select * from pelicula join genero on pelicula.genero_id=genero.id"){
        sql += " where pelicula.anio >" + anio_inicio;
    }

    if (anio_fin && sql !== "select * from pelicula join genero on pelicula.genero_id=genero.id") {
        sql += " and pelicula.anio <" + anio_fin;
    }else if (anio_fin && sql == "select * from pelicula join genero on pelicula.genero_id=genero.id"){
        sql += " where pelicula.anio <" + anio_fin;
    }

    if (puntuacion && sql !== "select * from pelicula join genero on pelicula.genero_id=genero.id") {
        sql += " and pelicula.puntuacion >" + puntuacion;
    }else if (puntuacion && sql == "select * from pelicula join genero on pelicula.genero_id=genero.id"){
        sql += " where pelicula.puntuacion <" + puntuacion;
    }

    con.query(sql, function(error, resultado, fields) {
        if (error) {
            console.log("Hubo un error en la consulta", error.message);
            return res.status(404).send("Hubo un error en la consulta");
            }
        var response = {
           'peliculas': resultado
            };
    
            res.send(JSON.stringify(response))
        })

}


module.exports ={
    pedirPeliculas:pedirPeliculas,
    pedirGeneros:pedirGeneros,
    pedirPeliculaId:pedirPeliculaId,
    pedirRecomendacion:pedirRecomendacion
}