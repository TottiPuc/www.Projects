// paquetes necesarios para el proyecto
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var controlador = require('./controladores/controlador')


var app = express();

app.use(cors());

app.use(bodyParser.urlencoded({
    extended:true
}));

app.use(bodyParser.json());


app.get("/competencias", controlador.traerCompetencias)
app.get("/competencias/:id/peliculas",controlador.traerCompetenciasPeliculas)


app.post("/competencias/:idCompetencia/voto", controlador.votarPelicula)



//seteamos el puerto en el cual va escuchar los pedidos la aplicación
var puerto = '8080';

app.listen(puerto,function() {
    console.log("Escuchando en el puerto " + puerto);
});