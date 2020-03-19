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

module.exports ={
    traerCompetencias:traerCompetencias
}