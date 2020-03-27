var con = require('../lib/conexiondb');

function traerCompetencias(req,res) {
    var sql = "select * from competencias";
    console.log(sql)
    con.query(sql,(error,resultado,fields) => {
        if (error) {
            console.log("Hubo un error en la consulta "+ error.message);
            return res.status(404).send("Hubo un error en la consulta");
        };
        res.send(JSON.stringify(resultado));
    });
    
}


function competencia(req, res) {
    var idCompetencia = req.params.id;
    var sql = "select competencias.nombre as 'nombre', genero.nombre as 'genero_nombre', actor.nombre as 'actor_nombre', director.nombre as 'director_nombre' from competencias "
            + "left outer join genero on competencias.genero_id = genero.id left outer join actor on competencias.actor_id = actor.id left outer join director on competencias.director_id = director.id "
            + " where competencias.id =" + idCompetencia
            con.query(sql, function(error, resultado) {
        if (error) {
            console.log("Hubo un error en la consulta", error.message);
            return res.status(404).send("Hubo un error en la consulta");
        }

        var response = {
            nombre : resultado[0].nombre,
            genero_nombre : resultado[0].genero_nombre,
            actor_nombre :  resultado[0].actor_nombre,
            director_nombre: resultado[0].director_nombre
        }
        res.send(JSON.stringify(response));
    });
}

function traerCompetenciasPeliculas(req,res) {
   // var sql = "select distinct id , titulo, poster  from pelicula order by rand() limit 2;"
    var idCompetencia = req.params.id;
     var sql = "SELECT DISTINCT pelicula.genero_string, pelicula.id AS id,tactores.actor_id AS actorId,pelicula.genero_id AS generoId,tdirectores.director_id AS directorId, "+
                "pelicula.titulo, pelicula.poster, pelicula.anio,tcompetencias.nombre AS nombreCompetencia,tcompetencias.id AS idCompetencia,tcompetencias.genero_id AS generoCompetencia,tcompetencias.director_id AS directorCompetencia, "+
                " tcompetencias.actor_id AS actorCompetencia  FROM pelicula " + 
                " JOIN (SELECT id, genero_id, director_id, actor_id, nombre FROM competencias) AS tcompetencias ON tcompetencias.id =  "+ idCompetencia +
                " JOIN (SELECT director_id, pelicula_id FROM director_pelicula) AS tdirectores ON tdirectores.pelicula_id = pelicula.id  "+
                " JOIN (SELECT actor_id, pelicula_id FROM actor_pelicula) AS tactores ON tactores.pelicula_id = pelicula.id  "+
                " WHERE  CASE WHEN (tcompetencias.genero_id = 0) THEN tcompetencias.genero_id = 0 ELSE tcompetencias.genero_id = pelicula.genero_id END  "+
                " AND CASE WHEN (tcompetencias.director_id = 0) THEN tcompetencias.director_id = 0 ELSE tcompetencias.director_id = tdirectores.director_id END "+
                " AND CASE WHEN (tcompetencias.actor_id = 0) THEN tcompetencias.actor_id = 0 ELSE tcompetencias.actor_id = tactores.actor_id END " +
                " group by pelicula.id  ORDER BY RAND() LIMIT 2";
    con.query(sql,(error,resultado)=>{
        if (error) {
            console.log("Hubo un error en la consulta " + error);
            return res.status(404).send("Hubo un error en la consulta");
        }
        if (resultado.length>0) {
            var response ={
               competencia : resultado[0].nombreCompetencia,
               peliculas: resultado
            }
        }
        res.send(JSON.stringify(response))
    })

} 




function votarPelicula(req,res) {
    var idCompetencia = req.params.idCompetencia;
    var voto = req.body.idPelicula;
    console.log(req.body)

    var sql = "INSERT INTO `votos` VALUES (NULL," + idCompetencia + "," + voto +");"
    console.log(sql)

    con.query(sql,(error,resultado)=>{
        if (error) {
            console.log("Hubo un error en la consulta " + error);
            return res.status(404).send("Hubo un error en la consulta");
        }

        res.send('Voto correcto, gracias por votar')
    });


}



function obtenerResultados(req,res) {
    var idCompetencia = req.params.id;
    var sql = "select competencias.nombre as 'compName', votos.competencia_id, votos.pelicula_id, "+
               " pelicula.poster, pelicula.titulo, count(*) as 'votos' from pelicula join votos on pelicula.id "+
               " = votos.pelicula_id join competencias on votos.competencia_id = competencias.id "+
               " group by votos.pelicula_id having competencia_id = " + idCompetencia +" order by count(*) limit 3"
    
               con.query(sql,(error,resultado) => {
        if (error) {
            console.log("Hubo un error en la consulta " + error);
            return res.status(404).send("Hubo un error en la consulta");
        }

        if (resultado.length>0) {
            var response ={
                competencia: resultado[0].compName,
                resultados:resultado
            }
        }

        res.send(response)
    })


}


function crearCompetencia(req,res) {
    var competencia = req.body
    
    var verificar = "SELECT DISTINCT  pelicula.id AS id,tactores.actor_id AS actorId,pelicula.genero_id AS generoId,tdirectores.director_id AS directorId FROM pelicula "+   
                     " JOIN (SELECT director_id, pelicula_id FROM director_pelicula) AS tdirectores ON tdirectores.pelicula_id = pelicula.id "+ 
                     " JOIN (SELECT actor_id, pelicula_id FROM actor_pelicula) AS tactores ON tactores.pelicula_id = pelicula.id  " +
                     " WHERE  CASE WHEN ( "+ competencia.genero + " = 0) THEN  " + competencia.genero + " = 0 ELSE pelicula.genero_id = " + competencia.genero + " END" +  
                     " AND CASE WHEN ( "+ competencia.director + " = 0) THEN " + competencia.director + " = 0 ELSE tdirectores.director_id = " + competencia.director + " END" + 
                     " AND CASE WHEN ( "+ competencia.actor + " = 0) THEN " + competencia.actor + " = 0 ELSE tactores.actor_id = " + competencia.director + " END" +  
                     " group by pelicula.id  limit 5";
    
     /*var verificar = "select * from competencias left outer join genero on competencias.genero_id = genero.id left outer join actor on competencias.actor_id = actor.id "+
                    " left outer join director on competencias.director_id = director.id where competencias.nombre is not NULL and genero.nombre is not NULL "+
                    " and actor.nombre is not NULL and director.nombre is not NULL"; */

                    con.query(verificar,(error,resul)=>{
                        //console.log(resul)
                        console.log("verificando que existan mas de dos competencias")
                        if (resul.length>2) {
                            
                            var sql = "INSERT INTO `competencias` VALUES (NULL,'"+ competencia.nombre +"',"+ competencia.genero +","+competencia.director +","+competencia.actor+")";   
                            con.query(sql,(error,resultado)=>{
                                if (error) {
                                    console.log("Hubo un error en la consulta " + error);
                                    return res.status(404).send("No pudo crearse la competencia");
                                } 
                                 console.log("creando competenecia")
                                res.send("competencia creada con exito...")  
                            });

                        }
                        else{
                            console.log("Debe existir por lo menos dos peliculas con los filtros elegidos")
                            return res.status(422).send("No pudo crearse la competencia, debe existir mas de dos peliculas con los filtros elegidos ");
                                                    
                        }
                    })

}


function traergeneros(req, res) {
    var sql = "select * from genero"
    con.query(sql, function(error, result) {
        if (error) {
            console.log(error)
            console.log("Hubo un error en la consulta", error.message);
            return res.status(404).send("No pudo crearse la competencia");
        }
        res.send(result);
    });
}

function traerdirectores(req, res) {
    var sql = "select * from director"
    con.query(sql, function(error, result) {
        if (error) {
            console.log(error)
            console.log("Hubo un error en la consulta", error.message);
            return res.status(404).send("No pudo crearse la competencia");
        }
        res.send(result);
    });
}

function traeractores(req, res) {
    var sql = "select * from actor"
    con.query(sql, function(error, result) {
        if (error) {
            console.log(error)
            console.log("Hubo un error en la consulta", error.message);
            return res.status(404).send("No pudo crearse la competencia");
        }
        res.send(result);
    });
}


function reiniciarVotos(req,res) {
    var idCompetencia = req.params.idCompetencia;
        console.log('este es el id '+idCompetencia)
        var sql = "DELETE FROM votos WHERE competencia_id = " + idCompetencia
        con.query(sql, function(error, result) {
            if (error) {
                console.log("Hubo un error en la consulta", error.message);
                return res.status(404).send("No existen botos para esta competencia");
            }
            res.send("Competencia Reiniciada exitosamente");
        });
}


function borrarCompetencia(req,res) {
    var idCompetencia = req.params.idCompetencia;
        console.log('este es el id '+idCompetencia)
        var sql = "DELETE FROM competencias WHERE id = " + idCompetencia +";"
        con.query(sql, function(error, result) {
            if (error) {
                console.log("Hubo un error en la consulta", error.message);
                return res.status(404).send("La competencia no existe");
            }
            
   
            res.send("Competencia eliminada exitosamente")
        });
}


function editarCompetencia(req,res) {
    var idCompetencia = req.params.idCompetencia;
        console.log('este es el id '+idCompetencia)
        var competencia = req.body;
        var sql = "UPDATE competencias SET nombre = '" + competencia.nombre + "'"
                    + "WHERE id = " + idCompetencia +";"

        con.query(sql, function(error, result) {
                if (error) {
                    console.log("Hubo un error en la consulta", error.message);
                    return res.status(404).send("No pudo editarse la competencia");
                }
                res.send("Competencia Editada Exitosamente");
            });
}



module.exports ={
    traerCompetencias:traerCompetencias,
    traerCompetenciasPeliculas:traerCompetenciasPeliculas,
    votarPelicula:votarPelicula,
    obtenerResultados:obtenerResultados,
    crearCompetencia:crearCompetencia,
    traergeneros:traergeneros,
    traerdirectores:traerdirectores,
    traeractores:traeractores,
    reiniciarVotos:reiniciarVotos,
    borrarCompetencia:borrarCompetencia,
    editarCompetencia:editarCompetencia,
    competencia:competencia


}