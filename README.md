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

---

## 📁 Estructura del Proyecto

Arquitectura **MVC modular** — cada módulo tiene su propio controlador, modelo (DAO) y vista.

```text
GLITCH_ARENA/
├── DB/                  # Dump SQL
├── model/               # Conexión PDO global
├── module/
│   ├── home/            # Módulo home (MVC)
│   ├── search/          # Módulo búsqueda (MVC)
│   └── shop/            # Módulo shop (MVC)
├── view/                # CSS, JS, imágenes globales
└── index.php            # Punto de entrada
```

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
  - Más populares / Menos populares
- Paginación dinámica con bootpag
- Scroll suave entre páginas
- Mapa interactivo con Leaflet mostrando ubicaciones de torneos
- Contador de filtros activos
- Persistencia de filtros y orden en `localStorage`
- Restauración automática de filtros y order al volver al shop

---

## 🗺️ Mapa Interactivo

- Marcadores por cada torneo visible en pantalla
- Se actualiza automáticamente con cada búsqueda o filtrado

---

## 📊 Sistema de Visitas

- Cada vez que un usuario hace click en un torneo, el campo `visits` se incrementa en 1
- Los torneos más populares se muestran ordenados por visitas en el home y en el shop

---

## 💡 Propuesta de Valor

- 🎮 Plataforma especializada en esports con tecnología moderna
- 🚀 Experiencia rápida y fluida gracias a carga dinámica con AJAX
- 🗺️ Navegación geolocalizada con mapa interactivo en tiempo real
- 🔎 Búsqueda y filtrado avanzado sin recargas de página
- 📊 Sistema de popularidad basado en visitas reales de usuarios

---

## ⚙️ Instalación

### Prerrequisitos

- PHP 8.x
- MySQL 8.x / MariaDB
- Servidor local: XAMPP, Laragon o similar


