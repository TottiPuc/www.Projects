var con = require('../lib/conexionbd');

function pedirPeliculas(req,res) {
    var sql =  "select * from pelicula"
    con.query(sql, (error,resultado,fields)=> {
        if (error) {
            console.log("Hubo un error en la consulta "+error.message);
            return res.status(404).send("Hubo un error en la consulta");
        };
        var response ={
            'peliculas' : resultado 
        };
        res.send(JSON.stringify(response));
    });
};



module.exports ={
    pedirPeliculas:pedirPeliculas
}