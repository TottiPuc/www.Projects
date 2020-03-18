CREATE DATABASE peliculas;

USE peliculas;

CREATE TABLE `pelicula` (
    `id` int NOT NULL AUTO_INCREMENT,
    `titulo` VARCHAR(100) NOT NULL,
    `duracion` int(5) NOT NULL,
    `director` VARCHAR(400) NOT NULL,
    `anio` int(5) NOT NULL,
    `fecha_lanzamiento` DATE NOT NULL,
    `puntuacion`int(2) NOT NULL,
    `poster` VARCHAR(300) NOT NULL,
    `trama` VARCHAR(700) NOT NULL,
    PRIMARY KEY (`id`)
)