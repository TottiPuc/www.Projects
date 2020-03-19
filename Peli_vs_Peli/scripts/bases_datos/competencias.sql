DROP TABLE IF EXISTS `competencias`;
CREATE TABLE `competencias` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(700) NOT NULL,
  `genero_id` int(11) unsigned DEFAULT NULL,
  `director_id`  varchar(700)  DEFAULT NULL,
  `actor_id` int(11) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`)
  ) ENGINE=InnoDB AUTO_INCREMENT=1024 DEFAULT CHARSET=latin1;
  INSERT INTO `competencias` 
  VALUES (1,'¿Cuál es la mejor película?',2,null,null),
  (2,'¿Qué drama te hizo llorar más?',null,null,null),
  (3,'¿Cuál es la peli más bizarra?',null,null,null),
  (4,'¿Que pelicula tiene los mejores actores?',null,3215,null),
  (5,'¿Cual es la pelicula mas divertida?',null,null,10),
  (6,'¿Cual fue la mejor pelicula del 2019?',6,null,401);

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