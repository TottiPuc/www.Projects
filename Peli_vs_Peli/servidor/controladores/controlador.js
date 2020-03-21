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

function traerCompetenciasPeliculas(req,res) {
    var sql = "select distinct id , titulo, poster  from pelicula order by rand() limit 2;"
    con.query(sql,(error,resultado)=>{
        if (error) {
            console.log("Hubo un error en la consulta " + error);
            return res.status(404).send("Hubo un error en la consulta");
        }
        if (resultado.length>0) {
            var response ={
                peliculas : resultado
            }
        }
        res.send(JSON.stringify(response))
    })

} 


function votarPelicula(req,res) {
    var idCompetencia = req.params.idCompetencia;
    var voto = req.body.idPelicula;

    var sql = "insert into `votos` values (NULL, " + idCompetencia + ", " + voto + ")"

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

module.exports ={
    traerCompetencias:traerCompetencias,
    traerCompetenciasPeliculas:traerCompetenciasPeliculas,
    votarPelicula:votarPelicula,
    obtenerResultados:obtenerResultados
}