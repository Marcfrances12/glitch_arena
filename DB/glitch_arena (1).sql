-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 17-03-2026 a las 17:49:10
-- Versión del servidor: 9.1.0
-- Versión de PHP: 8.3.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `glitch_arena`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categories`
--

DROP TABLE IF EXISTS `categories`;
CREATE TABLE IF NOT EXISTS `categories` (
  `id_category` int NOT NULL AUTO_INCREMENT,
  `cat_name` varchar(100) NOT NULL,
  `cat_img` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id_category`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `categories`
--

INSERT INTO `categories` (`id_category`, `cat_name`, `cat_img`) VALUES
(1, 'FPS', 'view/img/categ/fps.png'),
(2, 'MOBA', 'view/img/categ/moba.png'),
(3, 'Deporte', 'view/img/categ/deporte.png'),
(4, 'Lucha', 'view/img/categ/lucha.png'),
(5, 'Carreras', 'view/img/categ/carreras.png'),
(6, 'Estrategia', 'view/img/categ/estrategia.png');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cities`
--

DROP TABLE IF EXISTS `cities`;
CREATE TABLE IF NOT EXISTS `cities` (
  `id_city` int NOT NULL AUTO_INCREMENT,
  `city_name` varchar(100) NOT NULL,
  `city_img` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id_city`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `cities`
--

INSERT INTO `cities` (`id_city`, `city_name`, `city_img`) VALUES
(1, 'Madrid', 'view/img/city/madrid.jpg'),
(2, 'Barcelona', 'view/img/city/bc.png'),
(3, 'Galicia', 'view/img/city/galicia.jpg'),
(4, 'Valencia', 'view/img/city/val.jpg'),
(5, 'Sevilla', 'view/img/city/sevi.jpg'),
(6, 'Extremadura', 'view/img/city/extre.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `games`
--

DROP TABLE IF EXISTS `games`;
CREATE TABLE IF NOT EXISTS `games` (
  `id_game` int NOT NULL AUTO_INCREMENT,
  `game_name` varchar(200) NOT NULL,
  `developer` varchar(100) DEFAULT NULL,
  `game_img` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id_game`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `games`
--

INSERT INTO `games` (`id_game`, `game_name`, `developer`, `game_img`) VALUES
(1, 'Counter-Strike 2', 'Valve', 'view/img/games/cs2.jpg'),
(2, 'Rocket League', 'Psyonix', 'view/img/games/rocket.jpg'),
(3, 'League of Legends', 'Riot Games', 'view/img/games/lol.jpg'),
(4, 'Dota 2', 'Valve', 'view/img/games/dota.png'),
(5, 'Valorant', 'Riot Games', 'view/img/games/val.jpg'),
(6, 'F1', 'Electronics Arts', 'view/img/games/f1.jpg'),
(7, 'FC 26', 'Electronics Arts', 'view/img/games/fc.jpg'),
(8, 'Smahs Bros Ultimate', 'Nintendo', 'view/img/games/smash.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `game_images`
--

DROP TABLE IF EXISTS `game_images`;
CREATE TABLE IF NOT EXISTS `game_images` (
  `id_game_img` int NOT NULL AUTO_INCREMENT,
  `id_game` int NOT NULL,
  `game_img` varchar(255) NOT NULL,
  PRIMARY KEY (`id_game_img`),
  KEY `fk_game` (`id_game`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `game_images`
--

INSERT INTO `game_images` (`id_game_img`, `id_game`, `game_img`) VALUES
(1, 1, 'view/img/games/cs2.jpg'),
(2, 1, 'view/img/games/cs2_1.jpg'),
(3, 1, 'view/img/games/cs2_2.jpg'),
(4, 2, 'view/img/games/rocket.jpg'),
(5, 3, 'view/img/games/lol.jpg'),
(6, 4, 'view/img/games/dota.png'),
(7, 5, 'view/img/games/val.jpg'),
(8, 6, 'view/img/games/f1.jpg'),
(9, 7, 'view/img/games/fc.jpg'),
(10, 8, 'view/img/games/smash.jpg'),
(11, 2, 'view/img/games/rocket_1.jpg'),
(12, 2, 'view/img/games/rocket_2.jpg'),
(13, 3, 'view/img/games/lol_1.jpeg'),
(14, 3, 'view/img/games/lol_2.jpg'),
(15, 4, 'view/img/games/dota_1.jpg'),
(16, 4, 'view/img/games/dota_2.jpg'),
(17, 5, 'view/img/games/val_1.jpg'),
(18, 5, 'view/img/games/val_2.jpg'),
(19, 6, 'view/img/games/f1_1.jpg'),
(20, 6, 'view/img/games/f1_2.jpg'),
(21, 7, 'view/img/games/fc_1.jpg'),
(22, 7, 'view/img/games/fc_2.jpg'),
(23, 8, 'view/img/games/smash_1.jpg'),
(24, 8, 'view/img/games/smash_2.jpeg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `platforms`
--

DROP TABLE IF EXISTS `platforms`;
CREATE TABLE IF NOT EXISTS `platforms` (
  `id_platform` int NOT NULL AUTO_INCREMENT,
  `platform_name` varchar(100) NOT NULL,
  `platform_logo` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id_platform`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `platforms`
--

INSERT INTO `platforms` (`id_platform`, `platform_name`, `platform_logo`) VALUES
(1, 'PC', 'view/img/plataforma/pc.jpg'),
(2, 'PS5', 'view/img/plataforma/ps5.jpg'),
(3, 'Xbox', 'view/img/plataforma/xbox.png'),
(4, 'Nintendo', 'view/img/plataforma/nintendo.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `torn_categories`
--

DROP TABLE IF EXISTS `torn_categories`;
CREATE TABLE IF NOT EXISTS `torn_categories` (
  `id_torn` int NOT NULL,
  `id_category` int NOT NULL,
  PRIMARY KEY (`id_torn`,`id_category`),
  KEY `id_category` (`id_category`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `torn_categories`
--

INSERT INTO `torn_categories` (`id_torn`, `id_category`) VALUES
(1, 1),
(2, 3),
(3, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `torn_games`
--

DROP TABLE IF EXISTS `torn_games`;
CREATE TABLE IF NOT EXISTS `torn_games` (
  `id_torn` int NOT NULL,
  `id_game` int NOT NULL,
  PRIMARY KEY (`id_torn`,`id_game`),
  KEY `id_game` (`id_game`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `torn_games`
--

INSERT INTO `torn_games` (`id_torn`, `id_game`) VALUES
(1, 1),
(2, 2),
(3, 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `torn_images`
--

DROP TABLE IF EXISTS `torn_images`;
CREATE TABLE IF NOT EXISTS `torn_images` (
  `id_image` int NOT NULL AUTO_INCREMENT,
  `id_torn` int DEFAULT NULL,
  `image_url` varchar(300) DEFAULT NULL,
  PRIMARY KEY (`id_image`),
  KEY `id_torn` (`id_torn`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `torn_images`
--

INSERT INTO `torn_images` (`id_image`, `id_torn`, `image_url`) VALUES
(1, 3, 'view/img/torneos/lol_t.jpg'),
(2, 1, 'view/img/torneos/cs2_t.jpg'),
(3, 2, 'view/img/torneos/rl.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `torn_platforms`
--

DROP TABLE IF EXISTS `torn_platforms`;
CREATE TABLE IF NOT EXISTS `torn_platforms` (
  `id_torn` int NOT NULL,
  `id_platform` int NOT NULL,
  PRIMARY KEY (`id_torn`,`id_platform`),
  KEY `id_platform` (`id_platform`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `torn_platforms`
--

INSERT INTO `torn_platforms` (`id_torn`, `id_platform`) VALUES
(1, 1),
(2, 1),
(2, 2),
(3, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tournaments`
--

DROP TABLE IF EXISTS `tournaments`;
CREATE TABLE IF NOT EXISTS `tournaments` (
  `id_torn` int NOT NULL AUTO_INCREMENT,
  `title` varchar(200) NOT NULL,
  `description` text,
  `start_date` datetime NOT NULL,
  `end_date` datetime DEFAULT NULL,
  `price` decimal(10,2) DEFAULT '0.00',
  `capacity` int DEFAULT NULL,
  `organizer` varchar(100) DEFAULT NULL,
  `status` enum('Abierto','Cerrado','En curso','Finalizado','Cancelado') DEFAULT 'Abierto',
  `prizes` json DEFAULT NULL,
  `id_city` int DEFAULT NULL,
  `id_venue` int DEFAULT NULL,
  `id_type` int DEFAULT NULL,
  `visits` int DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_torn`),
  KEY `id_city` (`id_city`),
  KEY `id_venue` (`id_venue`),
  KEY `id_type` (`id_type`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `tournaments`
--

INSERT INTO `tournaments` (`id_torn`, `title`, `description`, `start_date`, `end_date`, `price`, `capacity`, `organizer`, `status`, `prizes`, `id_city`, `id_venue`, `id_type`, `visits`, `created_at`) VALUES
(1, 'CS2 Summer Cup', 'Torneo de CS2 presencial', '2026-06-20 10:00:00', NULL, 20.00, 100, 'Valve', 'Abierto', NULL, 1, 1, 1, 0, '2026-03-11 15:31:46'),
(2, 'RL Winter Cup', 'Torneo online', '2026-02-15 12:00:00', NULL, 0.00, 50, 'Psyonix', 'Abierto', NULL, 2, 2, 2, 0, '2026-03-11 15:31:46'),
(3, 'LoL Spring Clash', 'Torneo competitivo de League of Legends para equipos amateur.', '2026-04-05 11:00:00', '2026-04-07 16:00:00', 15.00, 60, 'Summoners League', 'Abierto', '{\"1st\": \"1500€\", \"MVP\": \"Skin Mítica\"}', 1, 1, 1, 0, '2026-03-11 15:31:47');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tournament_types`
--

DROP TABLE IF EXISTS `tournament_types`;
CREATE TABLE IF NOT EXISTS `tournament_types` (
  `id_type` int NOT NULL AUTO_INCREMENT,
  `type_name` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `type_img` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id_type`)
) ENGINE=MyISAM AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `tournament_types`
--

INSERT INTO `tournament_types` (`id_type`, `type_name`, `type_img`) VALUES
(1, 'Presencial', 'view/img/type/pre.PNG'),
(2, 'Online', 'view/img/type/onl.PNG'),
(3, 'Híbrido', 'view/img/type/hibri.PNG'),
(8, 'Liga Pro', 'view/img/type/ligpro.PNG'),
(9, 'Clasificatorio', 'view/img/type/clas.png'),
(10, 'Streamer Cup', 'view/img/type/strecup.PNG');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `venues`
--

DROP TABLE IF EXISTS `venues`;
CREATE TABLE IF NOT EXISTS `venues` (
  `id_venue` int NOT NULL AUTO_INCREMENT,
  `venue_name` varchar(200) NOT NULL,
  `id_city` int DEFAULT NULL,
  `address` varchar(200) DEFAULT NULL,
  `venue_img` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id_venue`),
  KEY `id_city` (`id_city`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `venues`
--

INSERT INTO `venues` (`id_venue`, `venue_name`, `id_city`, `address`, `venue_img`) VALUES
(1, 'Gaming Arena Madrid', 1, 'Calle del Gaming 10', 'img/arena_mad.jpg'),
(2, 'Gaming Hub Barcelona', 2, 'Av. Digital 45', 'img/hub_bcn.jpg'),
(3, 'Galicia E-Sports Center', 3, 'Rúa do Progreso 12', 'view/img/venues/gal_esc.jpg'),
(4, 'Valencia Battle Station', 4, 'Avinguda del Port 88', 'view/img/venues/val_bst.jpg'),
(5, 'Sevilla Gaming Palace', 5, 'Calle Sierpes 22', 'view/img/venues/sev_pal.jpg'),
(6, 'Extrema Gaming Zone', 6, 'Plaza Mayor 5', 'view/img/venues/ext_gz.jpg');

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `game_images`
--
ALTER TABLE `game_images`
  ADD CONSTRAINT `fk_game` FOREIGN KEY (`id_game`) REFERENCES `games` (`id_game`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
