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
    var sql = "select distinct id , titulo, poster  from pelicula order by rand() limit 2;"
    
    con.query(sql,(error,resultado)=>{
        if (error) {
            console.log("Hubo un error en la consulta " + error);
            return res.status(404).send("Hubo un error en la consulta");
        }
        if (resultado.length>0) {
            var response ={
               peliculas: resultado
            }
        }
        res.send(JSON.stringify(response))
    })

} 




function votarPelicula(req,res) {
    var idCompetencia = req.params.idCompetencia;
    var voto = req.body.idPelicula;

    var sql = "INSERT INTO `votos` VALUES (NULL," + idCompetencia + "," + voto +");"

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
    console.log(idCompetencia)
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

    var sql = "INSERT INTO `competencias` VALUES (NULL,'"+ competencia.nombre +"',"+ competencia.genero +","+competencia.director +","+competencia.actor+")";

        con.query(sql,(error,resultado)=>{
            if (error) {
                console.log("Hubo un error en la consulta " + error);
                return res.status(404).send("No pudo crearse la competencia");
            } 
            res.send("competencia creada con exito...")  
        });
    
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