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
);

CREATE TABLE `genero` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(30) NOT NULL,
    PRIMARY KEY (`id`)
    
);

ALTER TABLE pelicula 
ADD `genero_id` int(11) NOT NULL; 

CREATE TABLE `actor` (
    `id` INT(11) NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(70) NOT NULL,
    PRIMARY KEY(`id`)
);

CREATE TABLE `actor_pelicula` (
    `id` INT(11) NOT NULL AUTO_INCREMENT,
    `actor_id` INT(11) NOT NULL,
    `pelicula_id` INT(11) NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`actor_id`) REFERENCES `actor` (`id`),
    FOREIGN KEY (`pelicula_id`) REFERENCES `pelicula` (`id`)

);