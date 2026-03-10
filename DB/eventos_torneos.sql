-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 19-02-2026 a las 14:11:21
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
-- Base de datos: `torneos_db`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `eventos_torneos`
--

DROP TABLE IF EXISTS `eventos_torneos`;
CREATE TABLE IF NOT EXISTS `eventos_torneos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre_evento` varchar(100) NOT NULL,
  `descripcion` varchar(500) DEFAULT NULL,
  `categoria` varchar(50) DEFAULT NULL,
  `juego` varchar(100) DEFAULT NULL,
  `plataforma_juego` varchar(100) DEFAULT NULL,
  `precio` varchar(50) DEFAULT NULL,
  `estado` enum('Abierto','Cerrado','En curso','Finalizado','Cancelado') NOT NULL,
  `premios` json DEFAULT NULL,
  `fecha_inicio` varchar(50) NOT NULL,
  `fecha_fin` varchar(50) DEFAULT NULL,
  `horario` varchar(50) DEFAULT NULL,
  `recinto` varchar(100) DEFAULT NULL,
  `ubicacion` varchar(100) DEFAULT NULL,
  `organizador` varchar(100) DEFAULT NULL,
  `capacidad` varchar(20) DEFAULT NULL,
  `creado_en` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `eventos_torneos`
--

INSERT INTO `eventos_torneos` (`id`, `nombre_evento`, `descripcion`, `categoria`, `juego`, `plataforma_juego`, `precio`, `estado`, `premios`, `fecha_inicio`, `fecha_fin`, `horario`, `recinto`, `ubicacion`, `organizador`, `capacidad`, `creado_en`) VALUES
(3, 'CS:GO Summer Showdown', 'Torneo competitivo de Counter-Strike: Global Offensive para equipos amateur y semi-pro.', 'FPS', 'Counter-Strike: Global Offensive', '[\"PC\"]', '15€ por equipo', 'Abierto', '\"\\\"{\\\\\\\"primero\\\\\\\": \\\\\\\"1000€\\\\\\\", \\\\\\\"segundo\\\\\\\": \\\\\\\"500€\\\\\\\", \\\\\\\"tercero\\\\\\\": \\\\\\\"250€\\\\\\\", \\\\\\\"mejor_jugador\\\\\\\": \\\\\\\"Trofeo + Skin exclusiva\\\\\\\"}\\\"\"', '15/07/2026', '18/07/2026', '14:00 - 18:00', 'Gaming Arena Madrid', 'Madrid, España', 'Pro Gaming League', '20', '2026-01-25 23:00:00'),
(4, 'Rocket League Winter Cup', 'Torneo online y presencial de Rocket League, abierto a jugadores de todas las edades.', 'Deporte', 'Rocket League', '[\"PC\",\"PlayStation\"]', 'Gratis', 'Abierto', '\"{\\\"primero\\\": \\\"500€ + Skins\\\", \\\"segundo\\\": \\\"250€ + Skins\\\", \\\"tercero\\\": \\\"100€\\\", \\\"mejor_jugador\\\": \\\"Trophy + Car Decal exclusivo\\\"}\"', '20/02/2026', '22/02/2026', '12:00 - 20:00', 'Gaming Hub Barcelona', 'Barcelona, España', 'Rocket League League', '120', '2026-01-25 23:00:00'),
(5, 'League of Legends Spring Clash', 'Torneo competitivo de League of Legends para equipos amateur y semi-profesionales.', 'MOBA', 'League of Legends', '[\"PC\",\"Xbox\"]', '20', 'Abierto', '\"\\\"\\\\\\\"{\\\\\\\\\\\\\\\"primero\\\\\\\\\\\\\\\": \\\\\\\\\\\\\\\"1500€\\\\\\\\\\\\\\\", \\\\\\\\\\\\\\\"segundo\\\\\\\\\\\\\\\": \\\\\\\\\\\\\\\"750€\\\\\\\\\\\\\\\", \\\\\\\\\\\\\\\"tercero\\\\\\\\\\\\\\\": \\\\\\\\\\\\\\\"300€\\\\\\\\\\\\\\\", \\\\\\\\\\\\\\\"mejor_jugador\\\\\\\\\\\\\\\": \\\\\\\\\\\\\\\"Trofeo + RP\\\\\\\\\\\\\\\"}\\\\\\\"\\\"\"', '05/04/2026', '07/04/2026', '11:00 - 16:00', 'Esports Arena Valencia', 'Valencia España', 'Summoners League', '12', '2026-01-25 23:00:00'),
(20, 'CS2 Summer Cup', 'Torneo por equipos de CS2', 'FPS', 'Counter Strike 2', '[\"PC\"]', '20', 'Abierto', '\"1r 2000€\\r\\n2n 500€\\r\\n3r 100€\"', '20/02/2026', '22/02/2026', '09:00', 'Arena War', 'Madrid España', 'Valve', '150', '2026-02-12 14:20:04'),
(12, 'dadad', 'ddddddddddd', '', 'eeeeee', '[\"PC\",\"PlayStation\"]', '123132', 'Abierto', '\"11111111111\"', '26/02/2026', '27/02/2026', '10:00', 'edede', 'dede', 'dede', '12', '2026-02-11 16:02:05'),
(13, 'aaaaaaaaa', 'ddddddddddd', '', 'eeeeee', '[\"PC\",\"PlayStation\"]', '123132', 'Abierto', '\"\\\"11111111111\\\"\"', '26/02/2026', '27/02/2026', '10:00', 'edede', 'dede', 'dede', '12', '2026-02-11 16:17:21'),
(14, 'dadada', 'dadadadada', '', 'deeeee', '[\"PC\"]', '1231', 'Abierto', '\"11111111111\"', '12/02/2026', '21/02/2026', '11:00', 'dddddd', 'dede', 'deed', '4141', '2026-02-11 16:19:43'),
(15, 'dadada', 'dadadadadada', 'MOBA', 'deeeeeeeeeeeeeee', '[\"PC\",\"Xbox\"]', '12313', 'Cerrado', '\"1111111111111111111111111d\"', '18/02/2026', '19/02/2026', '09:00', 'deee', 'eedede', 'edeed', '123131', '2026-02-11 16:24:26'),
(16, 'dadada', 'dadadadadada', 'MOBA', 'deeeeeeeeeeeeeee', '[\"PC\",\"Xbox\"]', '12313', 'Cerrado', '\"\\\"1111111111111111111111111d\\\"\"', '18/02/2026', '19/02/2026', '09:00', 'deee', 'eedede', 'edeed', '123131', '2026-02-11 16:24:36'),
(17, 'CSGO Summer Showdown', 'Torneo competitivo de Counter-Strike: Global Offensive para equipos amateur y semi-pro.', 'FPS', 'Counter-Strike: Global Offensive', '[\"PC\"]', '15', 'Abierto', '\"{\\\"primero\\\": \\\"1000€\\\", \\\"segundo\\\": \\\"500€\\\", \\\"tercero\\\": \\\"250€\\\", \\\"mejor_jugador\\\": \\\"Trofeo + Skin exclusiva\\\"}\"', '15/07/2026', '18/07/2026', '18:00', 'Gaming Arena Madrid', 'MadridEspaña', 'Pro Gaming League', '123', '2026-02-11 16:30:02');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
