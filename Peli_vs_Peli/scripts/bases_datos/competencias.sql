DROP TABLE IF EXISTS `competencias`;
CREATE TABLE `competencias` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(700) NOT NULL,
  `genero_id` int(11) unsigned DEFAULT 0,
  `director_id`  int(11)  DEFAULT 0,
  `actor_id` int(11) unsigned DEFAULT 0,
  PRIMARY KEY (`id`)
  ) ENGINE=InnoDB AUTO_INCREMENT=1024 DEFAULT CHARSET=latin1;
  INSERT INTO `competencias` 
  VALUES (1,'¿Cuál es la mejor película?',2,0,0),
  (2,'¿Qué drama te hizo llorar más?',0,0,0),
  (3,'¿Cuál es la peli más bizarra?',0,0,0),
  (4,'¿Que pelicula tiene los mejores actores?',0,3215,0),
  (5,'¿Cual es la pelicula mas divertida?',0,0,10),
  (6,'¿Cual fue la mejor pelicula del 2019?',6,0,401);

DROP TABLE IF EXISTS `votos`;
CREATE TABLE `votos` (
  `id` int unsigned AUTO_INCREMENT,
  `competencia_id` int(11) unsigned NOT NULL,
  `pelicula_id` int(11) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (competencia_id) REFERENCES competencias(id) ON DELETE CASCADE) 
  ENGINE=InnoDB AUTO_INCREMENT=1024 DEFAULT CHARSET=latin1;

  INSERT INTO `votos` VALUES (NULL,3,231),(NULL,1,543),(NULL,2,212);
  ALTER TABLE votos AUTO_INCREMENT=1;

  UNLOCK TABLES;


  
/* The simple way would be to disable the foreign key check; make the changes then re-enable foreign key check.

SET FOREIGN_KEY_CHECKS=0; -- to disable them
SET FOREIGN_KEY_CHECKS=1; -- to re-enable them */