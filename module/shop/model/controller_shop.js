function loadEventos() {
    //console.log('loadEventos() called');
    ajaxForSearch('module/shop/controller/controller_shop.php?op=all_eventos');
}

function ajaxForSearch(url) {
    ajaxPromise(url, 'POST', 'JSON')
        .then(function(data) {
            console.log(data);
           $('#content_shop_evento').empty();

            if (data === "error" || data.length === 0) {
                $('#content_shop_evento').html('<div class="col-span-full"><h3 class="text-center">No hay eventos disponibles.</h3></div>');
            } else {
                for (row in data) {
                    $('<div class="flex-item more_info_list" id="' + data[row].id_torn + '"></div>')
                    .appendTo('#content_shop_evento')
                        .html(`
                            <article class="card-evento">
                                <div class="evento-img-wrapper">
                                    <div id="list-carousel-${data[row].id_torn}" class="swiper">
                                        <div class="swiper-wrapper container_listCarousel"></div>
                                        <div class="swiper-button-prev"></div>
                                        <div class="swiper-button-next"></div>
                                    </div>
                                </div>

                                <div class="evento-body">
                                    <h3 class="evento-title">${data[row].title}</h3>
                                    
                                    <div class="evento-info-group">
                                        <div class="evento-info-item">
                                            <span class="material-symbols-outlined" style="font-size:1rem">calendar_month</span>
                                            <span>${data[row].start_date}</span>
                                        </div>
                                        <div class="evento-info-item">
                                            <span class="material-symbols-outlined" style="font-size:1rem">location_on</span>
                                            <span>${data[row].venue_name}, ${data[row].city_name}</span>
                                        </div>
                                    </div>

                                    <div class="evento-footer">
                                        <div class="evento-price-box">
                                            <p style="font-size: 0.75rem; color: #94a3b8; margin:0">Desde</p>
                                            <p class="evento-price-value">${data[row].price}€</p>
                                        </div>
                                        <button id="${data[row].id_torn}" class="evento-btn buy-ticket-btn">
                                            Comprar Entrada
                                        </button>
                                    </div>
                                </div>
                            </article>
                        `);

                    for (img in data[row].tournament_images) {
                        $('<div></div>')
                            .attr('class', 'carousel-item-c swiper-slide')
                            .attr('id', data[row].tournament_images[img])
                            .appendTo(`#list-carousel-${data[row].id_torn} .container_listCarousel`)
                            .html(`
                                <img src="${data[row].tournament_images[img]}" alt="${data[row].title}" class="evento-img">
                            `);
                    }
                   
                    
                   
                }
                

                    document.querySelectorAll('.swiper').forEach((el) => {

                        new Swiper(el, {
                            speed: 600,
                            loop: el.querySelectorAll('.swiper-slide').length > 1,
                            autoplay: {
                                delay: 2500,
                                disableOnInteraction: false,
                            },
                            slidesPerView: 1,
                            observer: true,
                            observeParents: true,

                            navigation: {
                                nextEl: el.querySelector('.swiper-button-next'),
                                prevEl: el.querySelector('.swiper-button-prev'),
                            },
                        });

                    });

            
                 
                    
            }
        }).catch(function(err) {
            console.error("Detalle del error:", err);
            // window.location.href = "index.php?module=ctrl_exceptions&op=503&type=503&lugar=Function ajxForSearch SHOP";
        });
}
    
function clicks() {
    $(document).on("click", ".more_info_list", function(e) {

        if ($(e.target).closest(".swiper-button-prev").length) return;
        if ($(e.target).closest(".swiper-button-next").length) return;
        if ($(e.target).closest(".evento-btn").length) return;

        var id_torn = this.getAttribute('id');
        loadDetails(id_torn);
        loadExtras(id_torn);
    });
}

function loadDetails(id_torn) {
    console.log(id_torn);
    ajaxPromise('module/shop/controller/controller_shop.php?op=details_evento&id=' + id_torn, 'GET', 'JSON')
    .then(function(data) {
        console.log(data);
        console.log(data[1][0]);

        var premios = "";
                try {
                    var prizesObj = JSON.parse(data[0].prizes); 
                    for (var key in prizesObj) {
                        premios += "<div style='display:flex; justify-content:space-between; margin-bottom:15px; border-bottom:1px solid #1f2937; padding-bottom:8px;'>" +
                                        "<span style='color:#256af4; font-weight:bold; font-size:17px;'>" + key + "</span>" +
                                        "<span style='color:white; font-weight:600;'>" + prizesObj[key] + "</span>" +
                                    "</div>";
                    }
                } catch (e) {
                    premios = "<p style='color:#9ca6ba;'>Sin premios registrados</p>";
                }

        var detalles_extra = `
            <div style="display: flex; flex-direction: column; gap: 10px;">
                <div class="extra-item">
                    <span class="extra-label">DESCRIPCIÓN:</span>
                    <span class="extra-value">${data[0].description || 'Sin descripción'}</span>
                </div>
                <div class="extra-item">
                    <span class="extra-label">ORGANIZADOR:</span>
                    <span class="extra-value">${data[0].organizer || 'No especificado'}</span>
                </div>
                <div class="extra-item">
                    <span class="extra-label">CAPACIDAD:</span>
                    <span class="extra-value">${data[0].capacity} personas</span>
                </div>
                <div class="extra-item">
                    <span class="extra-label">ESTADO:</span>
                    <span class="extra-status">${data[0].status}</span>
                </div>
            </div>
        `;

        $('#content_shop_evento').empty();
        $('#eliminar-det').empty();
        $('.date_img').empty();
        $('.date_evento').empty();

        var imagenes_html = "";
        for (row in data[1][0]) {
            imagenes_html += "<div class='date_img_dentro'>" +
                                "<img src='" + data[1][0][row].image_url + "' class='banner-img' style='width: 100%; border-radius: 12px; aspect-ratio: 16/9; object-fit: cover; display:block;'>" +
                            "</div>";
        }

        $('<div></div>').attr({ 'id': data[0].id_torn, class: 'date_car_dentro' }).appendTo('.date_evento')
            .html(
                "<button class='btn-back-shop' onclick='window.location.reload()' style='margin-bottom: 20px; color:#256af4; font-weight:bold; cursor:pointer; background:none; border:none;'><span class='material-symbols-outlined' style='vertical-align: middle;'>arrow_back</span> Volver a la Tienda</button>" +
                
                "<div class='details-grid'>" +
                    "<!-- ZONA IZQUIERDA -->" +
                    "<div class='details-left'>" +
                        "<div class='banner-wrapper'>" +
                            "<div class='date_img'>" + imagenes_html + "</div>" + 
                            
                            "<div class='banner-overlay' style='pointer-events: none;'>" +
                                "<span class='banner-badge'>" + (data[0].type_name || 'TORNEO') + "</span>" +
                                    "<h1 class='banner-title' style='margin: 0;'>" + data[0].title + "</h1>" +
            
                                "<p class='banner-subtitle'>Juegos: " + data[0].game_names + "</p>" +
                                "<div class='slick-arrows-details'></div>" +
                            "</div>" +
                        "</div>" +
                        
                    "</div>" +

                    "<!-- ZONA DERECHA -->" +
                    "<aside class='details-right'>" +
                        "<div class='info-card'>" +
                            "<h3><span class='material-symbols-outlined text-primary' style='color:#256af4; vertical-align:middle;'>event_note</span> Detalles del Evento</h3>" +
                            "<hr class='hr-shop'> <br>" +
                            "<div class='info-row'><div class='info-icon'><span class='material-symbols-outlined'>calendar_today</span></div><div><p class='info-text-label'>Fecha</p><p class='info-text-value'>" + data[0].start_date + "</p></div></div>" +
                            "<div class='info-row'><div class='info-icon'><span class='material-symbols-outlined'>location_on</span></div><div><p class='info-text-label'>Ubicación</p><p class='info-text-value'>" + data[0].venue_name + ", " + data[0].city_name + "</p></div></div>" +
                            "<hr class='hr-shop'><br>" +
                            "<div class='info-row'><div><p class='info-text-label'>Precio Entrada</p><p class='price-value'>" + data[0].price + "€</p></div></div>" +
                            "<button id='" + data[0].id_torn + "' class='btn-buy-large'>COMPRAR ENTRADA</button>" +
                        "</div>" +
                    "</aside>" +
                "</div>" +

                "<!-- ZONA INFERIOR (Las 3 columnas que me dijiste) -->" +
                "<div class='details-bottom-grid' style='display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-top: 20px;'>" +
                    "<div class='info-card'><h3><span class='material-symbols-outlined' style='color:#256af4; vertical-align:middle;'>gavel</span>Más Detalles</h3>" + 
                    detalles_extra
                    + "</div>" +
                    "<div class='info-card'><h3><span class='material-symbols-outlined' style='color:#256af4; vertical-align:middle;'>military_tech</span> Premios</h3>" + premios + "</div>" +
                
                 "<!-- EL MAPA QUE FALTABA -->" +
                        "<div class='info-card'grid-template-columns: repeat(3, 1fr);>" +
                            "<h3><span class='material-symbols-outlined text-primary' style='color:#256af4; vertical-align:middle;'>map</span> Mapa</h3>" +
                            "<div style='width:100%; height:150px; background:#1b1f27; border-radius:8px; display:flex; align-items:center; justify-content:center; color:#64748b;'>Aquí irá tu mapa</div>" +
                        "</div>" +
                "</div>" 
            );

        
        if ($.fn.slick) {
            $('.date_img').slick({
                infinite: true,
                speed: 300, 
                slidesToShow: 1,
                autoplay: true,
                autoplaySpeed: 2500,
                arrows: true, 
                dots: false, 
                appendArrows: '.slick-arrows-details', 
                prevArrow: '<button type="button" class="slick-prev">&#10094;</button>', 
                nextArrow: '<button type="button" class="slick-next">&#10095;</button>'  
            });
        }


    }).catch(function(err) {
         console.error("Error al cargar Detalles", err);
    });
}

function loadExtras(id_torn) {
    ajaxPromise('module/shop/controller/controller_shop.php?op=extras&id=' + id_torn, 'GET', 'JSON')
    .then(function(data) {
        $('.container_extras_det').empty();

        // Estructura idéntica al bloque de arriba
        $('<div class="seccion_extras_vip_wrapper"></div>')
            .appendTo('.container_extras_det')
            .html(`
                <div class="extras_vip_header">
                    <h3>
                        <span class="material-symbols-outlined" style="color:#256af4; font-size:26px;">computer</span> 
                        Extras del Evento
                    </h3>
                    <p>Futuros eventos</p>
                </div>
                <div id="grid_extras_vip_items" class="extras_vip_grid_layout"></div>
            `);

        for (row in data) {
            $('<div class="extras_vip_card_unit"></div>')
                .appendTo('#grid_extras_vip_items')
                .html(`
                    <div class="extras_vip_flex_box" style="display:flex; align-items:center; gap:10px;">
                        <img src="${data[row].img_extra}" style="width:25px; height:25px; object-fit:contain;">
                        <div class="extras_vip_text_box">
                            <span>${data[row].nom_extra}</span>
                        </div>
                    </div>
                `);
        }

    }).catch(function(err) {
         console.error("Error extras:", err);
    });
}

$(document).ready(function() {
    loadEventos();
    clicks();
});