DROP DATABASE IF EXISTS glitch_arena;
CREATE DATABASE glitch_arena;
USE glitch_arena;

SET NAMES utf8mb4;
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;

-- ==================================
-- 1. TABLA: platforms
-- ==================================
CREATE TABLE platforms (
    id_platform INT AUTO_INCREMENT PRIMARY KEY,
    platform_name VARCHAR(100) NOT NULL,
    platform_logo VARCHAR(200)
);

-- ==================================
-- 2. TABLA: categories (Géneros: FPS, MOBA, etc.)
-- ==================================
CREATE TABLE categories (
    id_category INT AUTO_INCREMENT PRIMARY KEY,
    cat_name VARCHAR(100) NOT NULL,
    cat_img VARCHAR(200) -- Imagen de la categoría
);

-- ==================================
-- 3. TABLA: cities
-- ==================================
CREATE TABLE cities (
    id_city INT AUTO_INCREMENT PRIMARY KEY,
    city_name VARCHAR(100) NOT NULL,
    city_img VARCHAR(200) -- Imagen de la ciudad (ej. Skyline)
);

-- ==================================
-- 4. TABLA: venues (Recintos)
-- ==================================
CREATE TABLE venues (
    id_venue INT AUTO_INCREMENT PRIMARY KEY,
    venue_name VARCHAR(200) NOT NULL,
    id_city INT,
    address VARCHAR(200),
    venue_img VARCHAR(200), -- Imagen del local o arena
    FOREIGN KEY (id_city) REFERENCES cities(id_city)
);

-- ==================================
-- 5. TABLA: games (Sustituye a 'artists')
-- ==================================
CREATE TABLE games (
    id_game INT AUTO_INCREMENT PRIMARY KEY,
    game_name VARCHAR(200) NOT NULL,
    developer VARCHAR(100),
    game_img VARCHAR(200) -- Imagen del juego (Box art o Logo)
);

-- ==================================
-- 6. TABLA: tournament_types (Modalidad)
-- ==================================
CREATE TABLE tournament_types (
    id_type INT AUTO_INCREMENT PRIMARY KEY,
    type_name ENUM('Presencial', 'Online', 'Híbrido') NOT NULL,
    type_img VARCHAR(200) -- Icono representativo del tipo
);

-- ==================================
-- 7. TABLA: tournaments (La tabla central)
-- ==================================
CREATE TABLE tournaments (
    id_torn INT AUTO_INCREMENT PRIMARY KEY, -- Renombrado según tu petición
    title VARCHAR(200) NOT NULL,
    description TEXT,
    start_date DATETIME NOT NULL,
    end_date DATETIME,
    price DECIMAL(10,2) DEFAULT 0.00,
    capacity INT,
    organizer VARCHAR(100),
    status ENUM('Abierto','Cerrado','En curso','Finalizado','Cancelado') DEFAULT 'Abierto',
    prizes JSON, 
    id_city INT,
    id_venue INT,
    id_type INT,
    visits INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_city) REFERENCES cities(id_city),
    FOREIGN KEY (id_venue) REFERENCES venues(id_venue),
    FOREIGN KEY (id_type) REFERENCES tournament_types(id_type)
);

-- ==================================
-- 8. RELACIONES MANY-TO-MANY (Tablas Pivot)
-- ==================================

-- Relación Torneo <-> Juegos
CREATE TABLE torn_games (
    id_torn INT,
    id_game INT,
    PRIMARY KEY (id_torn, id_game),
    FOREIGN KEY (id_torn) REFERENCES tournaments(id_torn) ON DELETE CASCADE,
    FOREIGN KEY (id_game) REFERENCES games(id_game) ON DELETE CASCADE
);

-- Relación Torneo <-> Plataformas
CREATE TABLE torn_platforms (
    id_torn INT,
    id_platform INT,
    PRIMARY KEY (id_torn, id_platform),
    FOREIGN KEY (id_torn) REFERENCES tournaments(id_torn) ON DELETE CASCADE,
    FOREIGN KEY (id_platform) REFERENCES platforms(id_platform) ON DELETE CASCADE
);

-- Relación Torneo <-> Categorías
CREATE TABLE torn_categories (
    id_torn INT,
    id_category INT,
    PRIMARY KEY (id_torn, id_category),
    FOREIGN KEY (id_torn) REFERENCES tournaments(id_torn) ON DELETE CASCADE,
    FOREIGN KEY (id_category) REFERENCES categories(id_category)
);

-- ==================================
-- 9. TABLA: torn_images (Galería del torneo)
-- ==================================
CREATE TABLE torn_images (
    id_image INT AUTO_INCREMENT PRIMARY KEY,
    id_torn INT,
    image_url VARCHAR(300),
    FOREIGN KEY (id_torn) REFERENCES tournaments(id_torn) ON DELETE CASCADE
);

-- ==================================
-- VOLCADO DE DATOS (INSERTS)
-- ==================================

INSERT INTO platforms (platform_name, platform_logo) VALUES
('PC', 'view/img/plataforma/pc.jpg'), ('PS5', 'view/img/plataforma/ps5.jpg'), ('Xbox', 'view/img/plataforma/xbox.png'), ('Nintendo', 'view/img/plataforma/nintendo.jpg');

INSERT INTO categories (cat_name, cat_img) VALUES
('FPS', 'view/img/categ/fps.png'), ('MOBA', 'view/img/categ/moba.png'), ('Deporte', 'view/img/categ/sports.png'), ('Lucha', 'view/img/categ/sports.png'), ('Carreras', 'view/img/categ/sports.png'), ('Estrategia', 'view/img/categ/sports.png');

INSERT INTO cities (city_name, city_img) VALUES
('Madrid', 'img/madrid.jpg'), ('Barcelona', 'img/bcn.jpg');

INSERT INTO venues (venue_name, id_city, address, venue_img) VALUES
('Gaming Arena Madrid', 1, 'Calle del Gaming 10', 'img/arena_mad.jpg'),
('Gaming Hub Barcelona', 2, 'Av. Digital 45', 'img/hub_bcn.jpg');

INSERT INTO games (game_name, developer, game_img) VALUES
('Counter-Strike 2', 'Valve', 'view/img/games/cs2.jpg'),
('Rocket League', 'Psyonix', 'view/img/games/rocket.jpg'),
('League of Legends', 'Riot Games', 'view/img/games/lol.jpg'),
('Dota 2', 'Valve', 'view/img/games/dota.png'),
('Valorant', 'Riot Games', 'view/img/games/val.jpg'),
('F1', 'Electronics Arts', 'view/img/games/f1.jpg'),
('FC 26', 'Electronics Arts', 'view/img/games/fc.jpg'),
('Smash Bros Ultimate', 'Nintendo', 'view/img/games/smash.jpg');

INSERT INTO tournament_types (type_name, type_img) VALUES
('Presencial', 'img/pres.png'), ('Online', 'img/online.png');

-- Torneo 1: CS2
INSERT INTO tournaments (id_torn, title, description, start_date, price, capacity, organizer, id_city, id_venue, id_type) 
VALUES (1, 'CS2 Summer Cup', 'Torneo de CS2 presencial', '2026-06-20 10:00:00', 20.00, 100, 'Valve', 1, 1, 1);

-- Torneo 2: Rocket League
INSERT INTO tournaments (id_torn, title, description, start_date, price, capacity, organizer, id_city, id_venue, id_type) 
VALUES (2, 'RL Winter Cup', 'Torneo online', '2026-02-15 12:00:00', 0.00, 50, 'Psyonix', 2, 2, 2);

-- Torneo 3: LOL
INSERT INTO tournaments (id_torn, title, description, start_date, end_date, price, capacity, organizer, status, prizes, id_city, id_venue, id_type) 
VALUES (3, 'LoL Spring Clash', 'Torneo competitivo de League of Legends para equipos amateur.', '2026-04-05 11:00:00', '2026-04-07 16:00:00', 15.00, 60, 'Summoners League', 'Abierto', '{"1st": "1500€", "MVP": "Skin Mítica"}', 1, 1, 1);

-- Relaciones Torneo 1 (CS2)
INSERT INTO torn_games (id_torn, id_game) VALUES (1, 1);
INSERT INTO torn_platforms (id_torn, id_platform) VALUES (1, 1);
INSERT INTO torn_categories (id_torn, id_category) VALUES (1, 1);

-- Relaciones Torneo 2 (Rocket League)
INSERT INTO torn_games (id_torn, id_game) VALUES (2, 2);
INSERT INTO torn_platforms (id_torn, id_platform) VALUES (2, 1), (2, 2); -- PC y PS5
INSERT INTO torn_categories (id_torn, id_category) VALUES (2, 3);

-- Relaciones Torneo 3 (lol)
INSERT INTO torn_games (id_torn, id_game) VALUES (3, 3);
INSERT INTO torn_platforms (id_torn, id_platform) VALUES (3, 1);
INSERT INTO torn_categories (id_torn, id_category) VALUES (3, 2);
INSERT INTO torn_images (id_torn, image_url) VALUES (3, 'img/tournaments/lol_clash_banner.jpg');

COMMIT;