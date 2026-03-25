
function shopTodo() {
    var filtro = JSON.parse(localStorage.getItem('filtros')) || null;
    console.log(" filtros:", filtro);
    
    
    $('#content_shop_evento').addClass('hidden');
    loadEventos(filtro);
}

function loadEventos(filtro) {
    var url;
   
    if (filtro && filtro.length > 0) {
        url = "module/shop/controller/controller_shop.php?op=filtros";
    } else {
        url = "module/shop/controller/controller_shop.php?op=all_eventos";
    }
    ajaxForSearch(url, filtro);
}




function ajaxForSearch(url, filtro) {
    ajaxPromise(url, 'POST', 'JSON', { 'filtro': filtro })
        .then(function(data) {
            console.log(data);
           $('#content_shop_evento').empty().removeClass('hidden');

            if (data === "error" || data.error || data.length === 0) {
                $('#content_shop_evento').html(`
                    <div class="col-span-full flex flex-col items-center justify-center py-20 px-6 border-2 border-dashed border-slate-800 rounded-3xl bg-slate-900/20">
                        <div class="mb-4 p-4 bg-slate-800/50 rounded-full">
                            <span class="material-symbols-outlined text-slate-500" style="font-size: 3rem">search_off</span>
                        </div>
                        <h3 class="text-xl font-bold text-white uppercase tracking-wider">No hay eventos con ese filtro</h3>
                        <p class="text-slate-500 mt-2 text-center max-w-xs">
                            No hemos encontrado torneos que coincidan con tu búsqueda. Intenta cambiar los filtros o limpiar la selección.
                        </p>
                    </div>
                `);
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
        $('#eliminar-det').hide();
        $('.date_img').empty();
        $('.date_evento').empty();
        $('main').hide(); 
        $('main > div.flex').hide();

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

function print_filtros() {
    $('.filtros').html(`
        <aside class="w-full lg:w-64 flex-shrink-0 bg-[#0f172a] p-6 rounded-xl border border-slate-800 shadow-2xl">
            <div class="mb-8">
                <h1 class="text-2xl font-bold tracking-tight text-white mb-1">Eventos Actuales</h1>
                <p class="text-slate-400 text-xs font-medium">Encuentra tu nueva experiencia</p>
            </div>

            <div class="space-y-8">
                <div class="space-y-3">
                    <h3 class="text-xs font-semibold uppercase tracking-widest text-slate-500">Categoría</h3>
                    <select id="select_cat" class="w-full bg-[#1e293b] border border-slate-700 text-slate-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 transition-all outline-none">
                        <option value="">Todas las categorías</option>
                        <option value="FPS">FPS / Shooters</option>
                        <option value="MOBA">MOBA</option>
                        <option value="Deporte">Deporte</option>
                        <option value="Lucha">Lucha</option>
                        <option value="Carreras">Carreras</option>
                        <option value="Estrategia">Estrategia</option>
                    </select>
                </div>

                <div class="space-y-4">
                    <h3 class="text-xs font-semibold uppercase tracking-widest text-slate-500">Plataforma</h3>
                    <div class="flex flex-col gap-3">
                        <label class="flex items-center gap-3 cursor-pointer group">
                            <input type="radio" name="plataforma" value="PC" class="w-4 h-4 text-blue-600 bg-transparent border-slate-700 focus:ring-blue-600 focus:ring-offset-[#0f172a]">
                            <span class="text-sm text-slate-300 group-hover:text-blue-500 transition-colors">PC Gaming</span>
                        </label>
                        <label class="flex items-center gap-3 cursor-pointer group">
                            <input type="radio" name="plataforma" value="PS5" class="w-4 h-4 text-blue-600 bg-transparent border-slate-700 focus:ring-blue-600 focus:ring-offset-[#0f172a]">
                            <span class="text-sm text-slate-300 group-hover:text-blue-500 transition-colors">PlayStation 5</span>
                        </label>
                        <label class="flex items-center gap-3 cursor-pointer group">
                            <input type="radio" name="plataforma" value="Xbox" class="w-4 h-4 text-blue-600 bg-transparent border-slate-700 focus:ring-blue-600 focus:ring-offset-[#0f172a]">
                            <span class="text-sm text-slate-300 group-hover:text-blue-500 transition-colors">Xbox Series X</span>
                        </label>
                        <label class="flex items-center gap-3 cursor-pointer group">
                            <input type="radio" name="plataforma" value="Nintendo" class="w-4 h-4 text-blue-600 bg-transparent border-slate-700 focus:ring-blue-600 focus:ring-offset-[#0f172a]">
                            <span class="text-sm text-slate-300 group-hover:text-blue-500 transition-colors">Nintendo</span>
                        </label>
                    </div>
                </div>

                <div class="space-y-4">
                    <h3 class="text-xs font-semibold uppercase tracking-widest text-slate-500">Ciudades</h3>
                    <div id="container-ciudades" class="flex flex-col gap-2">
                        <label class="flex items-center gap-3 cursor-pointer group">
                            <input type="checkbox" name="id_city" value="1" class="filter-checkbox">
                            <span class="text-sm text-slate-300 group-hover:text-blue-500 transition-colors">Madrid</span>
                        </label>
                        <label class="flex items-center gap-3 cursor-pointer group">
                            <input type="checkbox" name="id_city" value="2" class="filter-checkbox">
                            <span class="text-sm text-slate-300 group-hover:text-blue-500 transition-colors">Barcelona</span>
                        </label>
                    </div>
                </div>

                <div class="pt-6 border-t border-slate-800 flex flex-col gap-3">
                    <button id="Button_filter" class="w-full py-3 px-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg transition-all transform active:scale-95 shadow-lg shadow-blue-900/20">
                        Aplicar Filtros
                    </button>
                    <button id="Remove_filter" class="w-full py-2 px-4 bg-slate-800/50 hover:bg-slate-700 text-slate-400 hover:text-white font-semibold rounded-lg transition-colors text-xs">
                        Limpiar Todo
                    </button>
                </div>
            </div>
        </aside>
    `);
}

function filter_button() {
    $(document).on('click', '#Button_filter', function() {
        var filtro = [];

    
        var catVal = $('#select_cat').val();
        if (catVal && catVal !== "") {
            filtro.push(['cat_name', catVal]);
        }

  
        var radioVal = $('input[name="plataforma"]:checked').val();
        if (radioVal) {
            filtro.push(['platform_name', radioVal]);
        }

        var ciudades = [];
        $('input[name="id_city"]:checked').each(function() {
            ciudades.push($(this).val());
        });
        
        if (ciudades.length > 0) {
            
            filtro.push(['t.id_city', ciudades.join(',')]); 
        }
      
        if (filtro.length > 0) {
            localStorage.setItem('filtros', JSON.stringify(filtro));
        } else {
            localStorage.removeItem('filtros');
        }
        
        location.reload(); 
    });
}

function remove_filters() {
    $(document).on('click', '#Remove_filter', function() {
        localStorage.removeItem('filtros');
        location.reload();
    });
}

function highlightFilters() {
    var filtros = JSON.parse(localStorage.getItem('filtros'));

    if (filtros) {
        filtros.forEach(function(item) {
            if (item[0] === 'cat_name') {
                $('#select_cat').val(item[1]);
            }
            if (item[0] === 'platform_name') {
                $('input[name="plataforma"][value="' + item[1] + '"]').prop('checked', true);
            }
        });
    }
}

$(document).ready(function() {
    loadEventos();
    clicks();
    print_filtros();
    filter_button();
    remove_filters();
    highlightFilters();
    shopTodo();
});