
function shopTodo() {
    let filtros = JSON.parse(localStorage.getItem('filtros')) || false; 
    
    let filtro_final = null;

    if (filtros) {
        console.log("SHOP:", filtros);
        filtro_final = filtros;
    } else {
        console.log("No hay filtros, cargando todo...");
        filtro_final = null;
    }

    
    $('#content_shop_evento').addClass('hidden');
    loadEventos(filtro_final);
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

function ajaxForSearch(url, filtro, limit = 4, offset = 0) {
    ajaxPromise(url, 'POST', 'JSON', { 'filtro': filtro, 'limit': limit, 
        'offset': offset })
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

                if (data !== "error" && data.length > 0) {
                    mapa(data);
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

    $(document).on('change', '.dynamic-filter-input', function() {
        update_count();
        aplicar_filtros_auto();
        pagination();
    });

    $(document).on('slidestop', '#slider-range', function() {
        update_count();
        aplicar_filtros_auto();
        pagination();
    });

    $(document).on('click', '#Remove_filter', function() {
        localStorage.removeItem('filtros');
        location.reload();
    });

    $(document).on('input', '#price-slider', function() {
        let val = $(this).val();
        $('#price-display').text(val + '€');
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

       const imagenes_html = data[1][0].map(img => `
            <div class='date_img_dentro'>
                <img src='${img.image_url}' class='banner-img' style='width: 100%; border-radius: 12px; aspect-ratio: 16/9; object-fit: cover; display:block;'>
            </div>
        `).join('');

        $('.date_evento').empty(); 

        $(`<div id='${data[0].id_torn}' class='date_car_dentro'></div>`)
            .appendTo('.date_evento')
            .html(`
                <button class='btn-back-shop' onclick='window.location.reload()' style='margin-bottom: 20px; color:#256af4; font-weight:bold; cursor:pointer; background:none; border:none;'>
                    <span class='material-symbols-outlined' style='vertical-align: middle;'>arrow_back</span> 
                    Volver a la Tienda
                </button>

                <div class='details-grid'>
                    <div class='details-left'>
                        <div class='banner-wrapper'>
                            <div class='date_img'>${imagenes_html}</div> 
                            
                            <div class='banner-overlay' style='pointer-events: none;'>
                                <span class='banner-badge'>${data[0].type_name || 'TORNEO'}</span>
                                <h1 class='banner-title' style='margin: 0;'>${data[0].title}</h1>
                                <p class='banner-subtitle'>Juegos: ${data[0].game_names}</p>
                                <div class='slick-arrows-details'></div>
                            </div>
                        </div>
                    </div>

                    <aside class='details-right'>
                        <div class='info-card'>
                            <h3><span class='material-symbols-outlined text-primary' style='color:#256af4; vertical-align:middle;'>event_note</span> Detalles del Evento</h3>
                            <hr class='hr-shop'> <br>
                            <div class='info-row'>
                                <div class='info-icon'><span class='material-symbols-outlined'>calendar_today</span></div>
                                <div><p class='info-text-label'>Fecha</p><p class='info-text-value'>${data[0].start_date}</p></div>
                            </div>
                            <div class='info-row'>
                                <div class='info-icon'><span class='material-symbols-outlined'>location_on</span></div>
                                <div><p class='info-text-label'>Ubicación</p><p class='info-text-value'>${data[0].venue_name}, ${data[0].city_name}</p></div>
                            </div>
                            <hr class='hr-shop'><br>
                            <div class='info-row'>
                                <div><p class='info-text-label'>Precio Entrada</p><p class='price-value'>${data[0].price}€</p></div>
                            </div>
                            <button id='${data[0].id_torn}' class='btn-buy-large'>COMPRAR ENTRADA</button>
                        </div>
                    </aside>
                </div>

                <div class='details-bottom-grid' style='display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-top: 20px;'>
                    <div class='info-card'>
                        <h3><span class='material-symbols-outlined' style='color:#256af4; vertical-align:middle;'>gavel</span> Más Detalles</h3>
                        ${detalles_extra}
                    </div>
                    <div class='info-card'>
                        <h3><span class='material-symbols-outlined' style='color:#256af4; vertical-align:middle;'>military_tech</span> Premios</h3>
                        ${premios}
                    </div>
                    <div class='info-card'>
                        <h3><span class='material-symbols-outlined text-primary' style='color:#256af4; vertical-align:middle;'>map</span> Mapa</h3>
                        <div id='map-details' style='width:100%; height:300px; background:#1b1f27; border-radius:8px;'></div>
                    </div>
                </div>
                <div id='related_anchor'></div>
            `);

        
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
        mapatDetails(data[0], data[1][0]);
        setTimeout(function() {
            $('<div id="related_anchor"></div>').appendTo('.container_extras_det');
            more_events_related(data[0].platform_name, data[0].id_torn);
        }, 500);

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

// function print_filtros() {
//     $('.filtros').html(`
//         <aside class="w-full lg:w-64 flex-shrink-0 bg-[#0f172a] p-6 rounded-xl border border-slate-800 shadow-2xl">
//             <div class="mb-8">
//                 <h1 class="text-2xl font-bold tracking-tight text-white mb-1">Eventos Actuales</h1>
//                 <p class="text-slate-400 text-xs font-medium">Encuentra tu nueva experiencia</p>
//             </div>

//             <div class="space-y-8">
//                 <div class="space-y-3">
//                     <h3 class="text-xs font-semibold uppercase tracking-widest text-slate-500">Categoría</h3>
//                     <select id="select_cat" class="w-full bg-[#1e293b] border border-slate-700 text-slate-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 transition-all outline-none">
//                         <option value="">Todas las categorías</option>
//                         <option value="FPS">FPS / Shooters</option>
//                         <option value="MOBA">MOBA</option>
//                         <option value="Deporte">Deporte</option>
//                         <option value="Lucha">Lucha</option>
//                         <option value="Carreras">Carreras</option>
//                         <option value="Estrategia">Estrategia</option>
//                     </select>
//                 </div>

//                 <div class="space-y-4">
//                     <h3 class="text-xs font-semibold uppercase tracking-widest text-slate-500">Plataforma</h3>
//                     <div class="flex flex-col gap-3">
//                         <label class="flex items-center gap-3 cursor-pointer group">
//                             <input type="radio" name="plataforma" value="PC" class="w-4 h-4 text-blue-600 bg-transparent border-slate-700 focus:ring-blue-600 focus:ring-offset-[#0f172a]">
//                             <span class="text-sm text-slate-300 group-hover:text-blue-500 transition-colors">PC Gaming</span>
//                         </label>
//                         <label class="flex items-center gap-3 cursor-pointer group">
//                             <input type="radio" name="plataforma" value="PS5" class="w-4 h-4 text-blue-600 bg-transparent border-slate-700 focus:ring-blue-600 focus:ring-offset-[#0f172a]">
//                             <span class="text-sm text-slate-300 group-hover:text-blue-500 transition-colors">PlayStation 5</span>
//                         </label>
//                         <label class="flex items-center gap-3 cursor-pointer group">
//                             <input type="radio" name="plataforma" value="Xbox" class="w-4 h-4 text-blue-600 bg-transparent border-slate-700 focus:ring-blue-600 focus:ring-offset-[#0f172a]">
//                             <span class="text-sm text-slate-300 group-hover:text-blue-500 transition-colors">Xbox Series X</span>
//                         </label>
//                         <label class="flex items-center gap-3 cursor-pointer group">
//                             <input type="radio" name="plataforma" value="Nintendo" class="w-4 h-4 text-blue-600 bg-transparent border-slate-700 focus:ring-blue-600 focus:ring-offset-[#0f172a]">
//                             <span class="text-sm text-slate-300 group-hover:text-blue-500 transition-colors">Nintendo</span>
//                         </label>
//                     </div>
//                 </div>

//                 <div class="space-y-4">
//                     <h3 class="text-xs font-semibold uppercase tracking-widest text-slate-500">Ciudades</h3>
//                     <div id="container-ciudades" class="flex flex-col gap-2">
//                         <label class="flex items-center gap-3 cursor-pointer group">
//                             <input type="checkbox" name="city" value="Madrid" class="filter-checkbox">
//                             <span class="text-sm text-slate-300 group-hover:text-blue-500 transition-colors">Madrid</span>
//                         </label>
//                         <label class="flex items-center gap-3 cursor-pointer group">
//                             <input type="checkbox" name="city" value="Barcelona" class="filter-checkbox">
//                             <span class="text-sm text-slate-300 group-hover:text-blue-500 transition-colors">Barcelona</span>
//                         </label>
//                          <label class="flex items-center gap-3 cursor-pointer group">
//                             <input type="checkbox" name="city" value="Galicia" class="filter-checkbox">
//                             <span class="text-sm text-slate-300 group-hover:text-blue-500 transition-colors">Galicia</span>
//                         </label>
//                          <label class="flex items-center gap-3 cursor-pointer group">
//                             <input type="checkbox" name="city" value="Valencia" class="filter-checkbox">
//                             <span class="text-sm text-slate-300 group-hover:text-blue-500 transition-colors">Valencia</span>
//                         </label>
//                          <label class="flex items-center gap-3 cursor-pointer group">
//                             <input type="checkbox" name="city" value="Sevilla" class="filter-checkbox">
//                             <span class="text-sm text-slate-300 group-hover:text-blue-500 transition-colors">Sevilla</span>
//                         </label>
//                          <label class="flex items-center gap-3 cursor-pointer group">
//                             <input type="checkbox" name="city" value="Extremadura" class="filter-checkbox">
//                             <span class="text-sm text-slate-300 group-hover:text-blue-500 transition-colors">Extremadura</span>
//                         </label>
//                     </div>
//                 </div>

//                 <div class="space-y-4">
//                     <div class="flex justify-between items-center">
//                         <h3 class="text-xs font-semibold uppercase tracking-widest text-slate-500">Rango de Precio</h3>
//                         <span id="price-display" class="text-sm font-bold text-blue-500">0€ - 500€</span>
//                     </div>
//                     <div class="px-2 pt-2">
//                         <div id="slider-range" class="h-1.5 bg-slate-700 rounded-lg border-none"></div>
                        
//                         <div class="flex justify-between text-[10px] text-slate-500 mt-3">
//                             <span>Mín: 0€</span>
//                             <span>Máx: 100€</span>
//                         </div>
//                     </div>
//                 </div>

//                 <div class="pt-6 border-t border-slate-800 flex flex-col gap-3">
//                     <button id="Button_filter" class="w-full py-3 px-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg transition-all transform active:scale-95 shadow-lg shadow-blue-900/20">
//                         Aplicar Filtros
//                     </button>
//                     <button id="Remove_filter" class="w-full py-2 px-4 bg-slate-800/50 hover:bg-slate-700 text-slate-400 hover:text-white font-semibold rounded-lg transition-colors text-xs">
//                         Limpiar Todo
//                     </button>
//                 </div>
//             </div>
//         </aside>
//     `);
// }

function print_filtros() {
    ajaxPromise('module/shop/controller/controller_shop.php?op=get_filters_config', 'GET', 'JSON')
    .then(function(data) {
        let html = `
            <aside class="w-full lg:w-64 flex-shrink-0 bg-[#0f172a] p-6 rounded-xl border border-slate-800 shadow-2xl">
                <div class="mb-8">
                    <h1 class="text-2xl font-bold tracking-tight text-white mb-1">Eventos Actuales</h1>
                    <br>
                    <p id="container-active-filters" style="display: none;">
                        Filtros Activos: <span id="count-active-filters" class="badge">0</span>
                    </p>
                   
                    
                </div>
                <div class="space-y-8">`;

        data.forEach(filtro => {
            html += `<div class="space-y-3">
                        <h3 class="text-xs font-semibold uppercase tracking-widest text-slate-500">${filtro.display_name}</h3>`;

            if (filtro.html_type === 'select') {
                html += `<select id="select_${filtro.db_column}" class="dynamic-filter-input dynamic-select w-full bg-[#1e293b] border border-slate-700 text-slate-200 text-sm rounded-lg p-2.5 outline-none">
                            <option value="">Todas</option>`;
                filtro.valores.forEach(v => { html += `<option value="${v}">${v}</option>`; });
                html += `</select>`;
            } 
            else if (filtro.html_type === 'radio') {
                html += `<div class="flex flex-col gap-3">`;
                filtro.valores.forEach(v => {
                    html += `<label class="flex items-center gap-3 cursor-pointer group">
                                <input type="radio" class="dynamic-filter-input" name="${filtro.db_column}" value="${v}" class="w-4 h-4 text-blue-600 bg-transparent border-slate-700">
                                <span class="text-sm text-slate-300 group-hover:text-blue-500">${v}</span>
                             </label>`;
                });
                html += `</div>`;
            }
            else if (filtro.html_type === 'check') {
                html += `<div class="flex flex-col gap-2">`;
                filtro.valores.forEach(v => {
                    html += `<label class="flex items-center gap-3 cursor-pointer group">
                                <input type="checkbox" class="dynamic-filter-input" name="${filtro.db_column}" value="${v}" class="filter-checkbox">
                                <span class="text-sm text-slate-300 group-hover:text-blue-500">${v}</span>
                             </label>`;
                });
                html += `</div>`;
            }
            else if (filtro.html_type === 'slider') {
                html += `<div class="flex justify-between items-center">
                            <span id="price-display" class="text-sm font-bold text-blue-500">${filtro.valores.min}€ - ${filtro.valores.max}€</span>
                         </div>
                         <div id="slider-range" class="dynamic-filter-input" data-column="${filtro.db_column}" data-min="${filtro.valores.min}" data-max="${filtro.valores.max}" class="h-1.5 bg-slate-700 rounded-lg border-none mt-4"></div>`;
            }
            html += `</div>`;
        });

        html += `
                <div class="pt-6 border-t border-slate-800 flex flex-col gap-3">
                    <button id="Button_filter" class="w-full py-3 px-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg shadow-lg">
                        <span>Num Resultados:</span>
                        <span id="count-results" class="bg-blue-800 text-xs py-1 px-2 rounded-full">--</span>
                    </button>
                    <button id="Remove_filter" class="w-full py-2 px-4 bg-slate-800/50 hover:bg-slate-700 text-slate-400 font-semibold rounded-lg text-xs">Limpiar Todo</button>
                </div>
            </div></aside>`;

        
        $('.filtros').html(html);

        
        if ($("#slider-range").length > 0) {
            let minVal = parseInt($("#slider-range").attr('data-min'));
            let maxVal = parseInt($("#slider-range").attr('data-max'));
            
            $("#slider-range").slider({
                range: true,
                min: minVal,
                max: maxVal,
                values: [minVal, maxVal], 
                slide: function(event, ui) {
                    $("#price-display").text(ui.values[0] + "€ - " + ui.values[1] + "€");
                }
            });
        }
        highlightFilters();
        update_count();
        
    }).catch(error => console.error("Error cargando configuración:", error));
}

function filter_button() {
    
    $(document).on('click', '#Button_filter', function() {
        var filtro = [];

        
        $('.dynamic-select').each(function() {
            let val = $(this).val();
            if (val && val !== "") {
                let db_col = $(this).attr('id').replace('select_', '');
                filtro.push([db_col, val]);
            }
        });

        $('input[type="radio"]:checked').each(function() {
            let db_col = $(this).attr('name'); 
            let val = $(this).val();
            filtro.push([db_col, val]);
        });

        let checks_temporales = {};
        $('input[type="checkbox"]:checked').each(function() {
            let db_col = $(this).attr('name');
            let val = $(this).val();
            
            if (!checks_temporales[db_col]) {
                checks_temporales[db_col] = [];
            }
            checks_temporales[db_col].push(val);
        });
        
        for (let columna in checks_temporales) {
            filtro.push([columna, checks_temporales[columna]]);
        }

        let sliderDiv = $("#slider-range");
        if (sliderDiv.length > 0 && sliderDiv.hasClass('ui-slider')) {
            let rangeValues = sliderDiv.slider("values");
            let db_col = sliderDiv.attr('data-column'); 
            filtro.push([db_col, rangeValues]);
        }

        console.log("Filtros :", filtro); 
        if (filtro.length > 0) {
            localStorage.setItem('filtros', JSON.stringify(filtro));
        } else {
            localStorage.removeItem('filtros');
        }
        
        location.reload(); 
        
    });
}

function highlightFilters() {
    var filtros = JSON.parse(localStorage.getItem('filtros'));

    if (filtros) {
        filtros.forEach(function(item) {
            let columna = item[0]; 
            let valor = item[1];

            if ($(`#select_${columna}`).length > 0) {
                $(`#select_${columna}`).val(valor);
            }

            let inputs = $(`input[name="${columna}"]`);
            if (inputs.length > 0) {
                if (Array.isArray(valor)) {
                    valor.forEach(v => {
                        $(`input[name="${columna}"][value="${v}"]`).prop('checked', true);
                    });
                } else {
                    
                    $(`input[name="${columna}"][value="${valor}"]`).prop('checked', true);
                }
            }

            
            if (columna === 'price' || $(`div[data-column="${columna}"]`).length > 0) {
                let sliderElem = $(`#slider-range`); 
                if (sliderElem.hasClass('ui-slider')) {
                    sliderElem.slider("values", [valor[0], valor[1]]);
                    $("#price-display").text(valor[0] + "€ - " + valor[1] + "€");
                }
            }
        });
    }
}

function get_active_filters() {
    let filtros = [];

    $('.dynamic-filter-input').filter('select').each(function() {
        let valor = $(this).val();
        if (valor && valor !== "") {
            
            let columna = $(this).attr('id').replace('select_', '');
            filtros.push([columna, valor]);
        }
    });

    let agrupados = {};
    $('input.dynamic-filter-input:checked').each(function() {
        let columna = $(this).attr('name');
        let valor = $(this).val();

        if (!agrupados[columna]) {
            agrupados[columna] = [];
        }
        agrupados[columna].push(valor);
    });

    for (let columna in agrupados) {
        let valorFinal = (agrupados[columna].length > 1) ? agrupados[columna] : agrupados[columna][0];
        filtros.push([columna, valorFinal]);
    }

    if ($("#slider-range").length > 0 && $("#slider-range").hasClass('ui-slider')) {
        let minOriginal = parseInt($("#slider-range").attr('data-min'));
        let maxOriginal = parseInt($("#slider-range").attr('data-max'));
        let valoresActuales = $("#slider-range").slider("values");

        if (valoresActuales[0] !== minOriginal || valoresActuales[1] !== maxOriginal) {
            filtros.push([$("#slider-range").attr('data-column'), valoresActuales]);
        }
    }

    return filtros;
}

function aplicar_filtros_auto() {
    let filtros = get_active_filters();
    
   if (filtros.length > 0) {
        localStorage.setItem('filtros', JSON.stringify(filtros));
        console.log("LocalStorage:", filtros);
    } else {
        localStorage.removeItem('filtros');
    }

    ajaxForSearch('module/shop/controller/controller_shop.php?op=filtros', filtros);
    pagination();
}

function update_count() {
    let filtros = get_active_filters(); 

    let total_filtros_activos = 0;
    filtros.forEach(f => {
        let valor = f[1];
        
        total_filtros_activos += Array.isArray(valor) ? valor.length : 1;
    });

    const $container = $('#container-active-filters');
    const $badge = $('#count-active-filters');

    if (total_filtros_activos > 0) {
        $badge.text(total_filtros_activos);
        $container.fadeIn(300); 
    } else {
        $container.fadeOut(300); 
    }

    // if (filtros.length === 0) {
    //     $('#count-results').text('0'); 
    //     return; 
    // }

    ajaxPromise('module/shop/controller/controller_shop.php?op=count_filters', 'POST', 'JSON', { 'filtros': filtros })
    .then(function(data) {
        $('#count-results').text(data);
    })
    .catch(function() {
        $('#count-results').text('0');
    });
}


let mapInstance = null;

function mapa(data) {
    
    if (mapInstance !== null) {
        mapInstance.remove();
    }

    mapInstance = L.map('map').setView([40.4167, -3.7037], 5);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(mapInstance);

    data.forEach(row => {
        if (row.latitud && row.longitud) {
            
            
            let slidesHtml = '';
            
            let images = Array.isArray(row.tournament_images) 
                         ? row.tournament_images 
                         : row.tournament_images.split(', ');

            images.forEach(imgUrl => {
                slidesHtml += `
                    <div class="swiper-slide">
                        <img src="${imgUrl}" class="map-img-carousel">
                    </div>`;
            });

            const popupContent = `
                <div class="popup-card">
                    <div id="map-carousel-${row.id_torn}" class="swiper map-swiper-container">
                        <div class="swiper-wrapper">${slidesHtml}</div>
                        <div class="swiper-button-prev"></div>
                        <div class="swiper-button-next"></div>
                    </div>

                    <div class="popup-body">
                        <h3 class="popup-title">${row.title}</h3>
                        
                        <div class="popup-info-item">
                            <span class="material-symbols-outlined">calendar_month</span>
                            <span>${row.start_date.split(' ')[0]}</span> </div>
                        
                        <div class="popup-info-item">
                            <span class="material-symbols-outlined">location_on</span>
                            <span>${row.city_name}</span> </div>

                        <div class="popup-footer">
                            <div>
                                <p class="popup-price-value">${row.price}€</p>
                            </div>
                            <button class="popup-btn more_info_list" id="${row.id_torn}">
                                Entradas
                            </button>
                        </div>
                    </div>
                </div>
            `;

            const marker = L.marker([row.latitud, row.longitud]).addTo(mapInstance);
            marker.bindPopup(popupContent);
        }
    });

    
    mapInstance.on('popupopen', function(e) {
        
        const container = e.popup._contentNode.querySelector('.map-swiper-container');
        
        if (container) {
            new Swiper(container, {
                speed: 600,
                loop: container.querySelectorAll('.swiper-slide').length > 1,
                autoplay: {
                    delay: 2500,
                    disableOnInteraction: false,
                },
                slidesPerView: 1,
                observer: true,
                observeParents: true,
                navigation: {
                    nextEl: container.querySelector('.swiper-button-next'),
                    prevEl: container.querySelector('.swiper-button-prev'),
                },
            });
        }
    });
}

function mapatDetails(row, galleryImages) {
    if (!row || !row.latitud || !row.longitud) return;

    const mapDetails = L.map('map-details', {
        zoomControl: false, 
        scrollWheelZoom: false 
    }).setView([row.latitud, row.longitud], 15);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(mapDetails);

    let slidesHtml = '';
    if (galleryImages && galleryImages.length > 0) {
        galleryImages.forEach(img => {
            slidesHtml += `<div class="swiper-slide"><img src="${img.image_url}" class="img-pop"></div>`;
        });
    } else {
        slidesHtml = `<div class="swiper-slide"><img src="${row.img || row.image_url}" class="img-pop"></div>`;
    }

    const popupContent = `
        <div class="simple-popup">
            <div class="swiper swiper-details-pop">
                <div class="swiper-wrapper">${slidesHtml}</div>
                <div class="swiper-button-prev"></div>
                <div class="swiper-button-next"></div>
            </div>
            <div class="pop-title-wrapper">
                <h3>${row.title}</h3>
            </div>
        </div>`;

    const marker = L.marker([row.latitud, row.longitud]).addTo(mapDetails);

    marker.bindPopup(popupContent, {
        closeButton: false,    
        autoClose: false,      
        closeOnClick: false,  
        className: 'custom-pop' 
    }).openPopup();            

    const swiperPop = new Swiper('.swiper-details-pop', {
        loop: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        autoplay: {
                    delay: 2500,
                    disableOnInteraction: false,
        },
        observer: true,
        observeParents: true
    });

    setTimeout(() => { mapDetails.invalidateSize(); }, 400);
}

function pagination(filtros = null) {
    var filtros = filtros || JSON.parse(localStorage.getItem('filtros')) || null;
    
    var url_count = "";
    var data_count = {};

    if (filtros) {
        url_count = "module/shop/controller/controller_shop.php?op=count_filters";
        data_count = { 'filtros': filtros };
    } else {
        url_count = "module/shop/controller/controller_shop.php?op=contar_eventos";
        data_count = {};
    }

    ajaxPromise(url_count, 'POST', 'JSON', data_count)
        .then(function(data) {
            console.log(data);


            var total_items = 0; 

            if (data && typeof data === 'object' && data.total !== undefined) {
                total_items = parseInt(data.total);
            }else{
                total_items = parseInt(data);
            }
            if (isNaN(total_items)) {
                total_items = 0;
            }

            var items_per_page = 4; 
            var total_pages = Math.ceil(total_items / items_per_page);

            if (total_items <= items_per_page) {
                $('#pagination').hide(); 
            } else {
                $('#pagination').show(); 
            }

            if (total_pages < 1) total_pages = 1

            $('#pagination').empty();

            $('#pagination').bootpag({
                total: total_pages,
                page: 1, 
                maxVisible: 5,
                leaps: true,
                firstLastUse: true,
                first: '←',
                last: '→',
                wrapClass: 'pagination',
                activeClass: 'active',
                disabledClass: 'disabled',
                nextClass: 'next',
                prevClass: 'prev',
                lastClass: 'last',
                firstClass: 'first'
            }).on('page', function(event, num) {
                
                var offset = (num - 1) * items_per_page;
                
                if (filtros) {
                    ajaxForSearch("module/shop/controller/controller_shop.php?op=filtros", filtros, items_per_page, offset);
                } else {
                    ajaxForSearch("module/shop/controller/controller_shop.php?op=all_eventos", null, items_per_page, offset);
                }

                // $('html, body').animate({ scrollTop: 0 }, 500);
            });

        }).catch(function(err) {
            console.error("Error al calcular el total de páginas" + err);
        });
}

function events_related(loadeds = 0, platform_name, total_items, id_torn) {
    let items = 4;
    let loaded = loadeds;
    let total_item = total_items;

    ajaxPromise("module/shop/controller/controller_shop.php?op=events_related", 'POST', 'JSON', {
        'platform_name': platform_name,
        'id_torn': id_torn,
        'loaded': loaded,
        'items': items
    })
    .then(function(data) {

        if (loaded == 0) {
            $('<div></div>').attr({ 'id': 'related_content', 'class': 'related_content' }).appendTo('#related_anchor')
                .html('<h2 class="cat">Torneos Relacionados</h2>');

            for (row in data) {
                if (data[row].id_torn != undefined) {
                    console.log(data);

                    $('<div class="flex-item more_info_list" id="' + data[row].id_torn + '"></div>')
                        .appendTo('#related_content')
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
            }

            $('<div></div>').attr({ 'id': 'more_related_button', 'class': 'more_related_button' }).appendTo('#related_content')
                .html('<button class="load_more_button" id="load_more_related_btn">CARGAR MÁS</button>');
        }

        if (loaded >= 4) {
            for (row in data) {
                if (data[row].id_torn != undefined) {

                    $('<div class="flex-item more_info_list" id="' + data[row].id_torn + '"></div>')
                        .insertBefore('#more_related_button')
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
            }

            let total_restante = total_item - 4;
            if (total_restante <= loaded) {
                $('#more_related_button').empty();
            } else {
                $('#more_related_button').empty();
                $('#more_related_button').html('<button class="load_more_button" id="load_more_related_btn">CARGAR MÁS</button>');

                $('#load_more_related_btn').off('click').on('click', function() {
                    loaded += 4;
                    events_related(loaded, platform_name, total_item, id_torn);
                });
            }
        }

       
        if (loaded == 0) {
            $('#load_more_related_btn').off('click').on('click', function() {
                loaded += 4;
                events_related(loaded, platform_name, total_item, id_torn);
            });
        }

    }).catch(function() {
        console.log("error events_related");
    });
}

function more_events_related(platform_name, id_torn) {
    var items = 0;

    ajaxPromise('module/shop/controller/controller_shop.php?op=count_events_related', 'POST', 'JSON', {
        'platform_name': platform_name,
        'id_torn': id_torn
    })
    .then(function(data) {
        console.log(data);
        var total_items = data.total;
        events_related(0, platform_name, total_items, id_torn);

        $(document).on('click', '#load_more_related_btn', function() {
            items = items + 4;
            $('#more_related_button').empty();
            events_related(items, platform_name, total_items, id_torn);
        });

    }).catch(function() {
        console.log('error more_events_related');
    });
}

$(document).ready(function() {
    loadEventos();
    clicks();
    print_filtros();
    filter_button();
    // highlightFilters();
    shopTodo();
    pagination();
    
    const params = new URLSearchParams(window.location.search);
    const detalle = params.get('detalle');
    if (detalle) {
        loadDetails(detalle);
    }
});
