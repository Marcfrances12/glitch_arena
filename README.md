# 🎮 Glitch Arena

**Glitch Arena** es una plataforma web de gestión y compra de entradas para **torneos de esports**, donde los usuarios pueden descubrir eventos competitivos, filtrarlos por categoría, plataforma, ciudad, juego o precio, y acceder a los detalles de cada torneo.

---

## 📸 Capturas

### 🏠 Home — Hero Carousel
<img width="1909" height="828" alt="image" src="https://github.com/user-attachments/assets/07834dae-8863-4446-a79f-499a15753105" />

### 🔥 Home — Eventos Populares & Categorías
<img width="1907" height="811" alt="image" src="https://github.com/user-attachments/assets/4f7c9c55-4c6d-4a46-88b4-011e76dde017" />

### 🛒 Shop — Filtros + Mapa + Order By
<img width="1919" height="920" alt="image" src="https://github.com/user-attachments/assets/96ba40b8-e000-4630-9b4c-7792b01fa370" />

### 🔐 Auth — Login & Register
<img width="1919" height="923" alt="Auth" src="https://github.com/user-attachments/assets/20c27049-29c9-438d-a2c7-7ad3263c3cd6" />

### 👤 Profile — Datos de Usuario
<img width="1917" height="910" alt="Perfil" src="https://github.com/user-attachments/assets/3e1e5aec-92e9-4f45-b74e-55e4175c00ab" />

### ❤️ Profile — Torneos con Like
<img width="1898" height="859" alt="Likes" src="https://github.com/user-attachments/assets/c86e0dea-f428-4c52-a0e1-68616dce10cf" />

---

## 🧩 Tecnologías Utilizadas

- **Frontend:** HTML5 + CSS3 + JavaScript (jQuery)
- **Backend:** PHP (arquitectura MVC modular)
- **Base de Datos:** MySQL
- **Estilos:** Tailwind CSS + CSS personalizado
- **Mapas:** Leaflet.js
- **Carruseles:** Swiper.js
- **UI:** jQuery UI (slider de precio, paginación bootpag)
- **Peticiones AJAX:** Fetch API con promesas personalizadas
- **Autenticación:** JWT (JSON Web Tokens) con firma HMAC-SHA256
- **Alertas:** SweetAlert2

---

## 📁 Estructura del Proyecto

Arquitectura **MVC modular** — cada módulo tiene su propio controlador, modelo (DAO) y vista.

```text
GLITCH_ARENA/
├── DB/                        # Dump SQL
├── model/                     # Recursos globales del backend
│   ├── connect.php            # Conexión PDO a MySQL
│   ├── JWT.php                # Clase JWT (encode/decode con HMAC-SHA256)
│   ├── jwt.ini                # Clave secreta y configuración del token
│   └── middleware_auth.php    # Funciones globales: create_token, decode_token
├── module/
│   ├── auth/                  # Módulo de autenticación (MVC)
│   ├── home/                  # Módulo home (MVC)
│   ├── profile/               # Módulo de perfil de usuario (MVC)
│   ├── search/                # Módulo búsqueda (MVC)
│   └── shop/                  # Módulo shop (MVC)
├── view/                      # CSS, JS e imágenes globales
└── index.php                  # Punto de entrada y router de módulos
```

---

## 🔐 Módulo de Autenticación (Auth)

- **Register:** Validación en cliente (JS) + validación en servidor. Comprueba email y username duplicados antes de insertar. Avatar generado automáticamente con DiceBear Pixel Art.
- **Login:** Autenticación con `password_verify` (bcrypt). Genera un **JWT** firmado con HMAC-SHA256 y lo guarda en `localStorage`.
- **Logout:** Destruye la sesión PHP y elimina el token del `localStorage`.
- **Sesión persistente:** El menú llama a `data_user` con el token para pintar el avatar y username del usuario logueado en cada carga de página.

### 🔑 Sistema JWT

- Clase `JWT.php` con encode/decode usando HMAC-SHA256.
- Funciones globales en `middleware_auth.php`:
  - `create_token($username)` — genera el token con `iat`, `exp` (10 min) y `username`.
  - `decode_token($token)` — verifica la firma y devuelve el payload como array.
- El token se almacena en `localStorage` bajo la clave `token_JWT`.
- Cada operación protegida (likes, perfil, etc.) envía el token y lo decodifica en el servidor.

---

## 🏠 Home

- Carrusel hero con eventos destacados y autoplay
- **Sección de eventos populares** ordenados por visitas, con badge de visitas y zoom en hover
- Sección de categorías con filtro directo al shop
- Sección de plataformas con filtro directo al shop
- Sección de juegos con carrusel interno de imágenes por juego
- Sección de ciudades con venue incluido
- Sección de tipos de torneo
- Click en cualquier sección redirige al shop con el filtro ya aplicado

---

## 🔍 Módulo de Búsqueda

- Barra de búsqueda en el header con **autocompletado**
- Búsqueda en tiempo real sin recargar la página
- Resultados filtrados por nombre de torneo, ciudad o categoría
- Accesible desde cualquier sección de la app

---

## 🛒 Shop / Marketplace

- Listado dinámico de torneos cargado via AJAX
- **Filtros dinámicos** generados desde base de datos (`config_filters`):
  - Categoría (select)
  - Plataforma (radio)
  - Ciudades (checkbox)
  - Rango de precio (slider)
  - Tipos (select)
  - Juego (select)
- **Order By dinámico** con dirección ASC/DESC:
  - Precio: menor a mayor / mayor a menor
  - Fecha: más próxima / más lejana
  - Más populares / Menos populares (por likes)
- Paginación dinámica con bootpag
- Scroll suave entre páginas
- Mapa interactivo con Leaflet mostrando ubicaciones de torneos
- Contador de filtros activos
- Persistencia de filtros y orden en `localStorage`
- Restauración automática de filtros y order al volver al shop

---

## ❤️ Sistema de Likes

- Los usuarios logueados pueden dar/quitar like a cualquier torneo desde el shop o el detalle.
- Los corazones se pintan en rojo al cargar si el usuario ya dio like (consulta `load_likes_user`).
- Si un usuario no logueado intenta dar like, se guarda el `pending_like` en `localStorage`, se redirige al login y al volver se ejecuta el like automáticamente y hace scroll a la carta correspondiente.
- Los torneos se pueden ordenar por número de likes en el shop (Más populares / Menos populares).

---

## 🗺️ Mapa Interactivo

- Marcadores por cada torneo visible en pantalla
- Se actualiza automáticamente con cada búsqueda o filtrado

---

## 📊 Sistema de Visitas

- Cada vez que un usuario hace click en un torneo, el campo `visits` se incrementa en 1
- Los torneos más populares se muestran ordenados por visitas en el home y en el shop

---

## 👤 Módulo de Perfil

- Muestra el avatar, username y email del usuario logueado cargados dinámicamente desde el token JWT.
- **Account Settings:** Formulario para actualizar username y email. Al guardar, se regenera el token JWT con el nuevo username y se actualiza en `localStorage`.
- **Security:** Sección para cambiar la contraseña. La nueva contraseña se re-encripta con bcrypt antes de guardar.
- **Liked Tournaments:** Galería de los torneos a los que el usuario ha dado like, con carrusel de imágenes y botón de compra. Los corazones aparecen pintados en rojo. Al quitar un like desde el perfil también se actualiza en tiempo real.

---

## 💡 Propuesta de Valor

- 🎮 Plataforma especializada en esports con tecnología moderna
- 🔐 Autenticación segura con JWT y bcrypt
- 🚀 Experiencia rápida y fluida gracias a carga dinámica con AJAX
- 🗺️ Navegación geolocalizada con mapa interactivo en tiempo real
- 🔎 Búsqueda y filtrado avanzado sin recargas de página
- 📊 Sistema de popularidad basado en visitas y likes reales de usuarios
- ❤️ Sistema de likes con persistencia y redirección inteligente

---

## ⚙️ Instalación

### Prerrequisitos

- PHP 8.x
- MySQL 8.x / MariaDB
- Servidor local: XAMPP, WAMP, Laragon o similar
