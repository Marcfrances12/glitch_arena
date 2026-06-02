function update_user() {
    var token = localStorage.getItem('token_JWT');
    if (!token) return;

    var new_password    = $('#input_password').val();
    var old_password    = $('#input_password_old').val();

    
    if (new_password && !old_password) {
        Swal.fire({ icon: 'warning', title: 'Introduce tu contraseña actual', showConfirmButton: true });
        return;
    }

    var data = {
        token:        token,
        username:     $('#input_username').val(),
        password_old: old_password,
        password:     new_password,
        avatar:       $('#input_avatar').val()
    };

    ajaxPromise('module/profile/controller/controller_profile.php?op=update_user', 'POST', 'JSON', data)
        .then(function(result) {
            if (result == "error") {
                Swal.fire({ icon: 'error', title: 'Error al actualizar', showConfirmButton: true });
            } else if (result == "wrong_password") {
                Swal.fire({ icon: 'error', title: 'Contraseña actual incorrecta', showConfirmButton: true });
            } else {
                localStorage.setItem('token_JWT', result);
                Swal.fire({ icon: 'success', title: '¡Datos actualizados!', timer: 2000, showConfirmButton: false })
                    .then(function() {
                        location.reload();
                    });
            }
        }).catch(function() {
            console.log("Error en update_user");
        });
}



function load_profile_form() {
    var token = localStorage.getItem('token_JWT');
    if (!token) return;

    ajaxPromise('module/profile/controller/controller_profile.php?op=data_user', 'POST', 'JSON', { token: token })
        .then(function(user) {
            if (!user || user == "error") return;

            var html = `
                <section class="mb-12 px-gutter">
                    <div class="glass-panel p-8 rounded-xl flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
                        <div class="absolute -right-20 -top-20 w-64 h-64 bg-accent-blue-glow rounded-full blur-[100px]"></div>

                        <div class="relative group">
                            <div class="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-brand-blue p-1">
                                <img alt="Player Avatar" class="w-full h-full object-cover rounded-full"
                                    src="${user.avatar}" />
                            </div>
                            
                        </div>

                        <div class="text-center md:text-left flex-1">
                            <div class="flex flex-col md:flex-row items-center gap-4 mb-2">
                                <h1 class="font-hero-display-mobile text-section-header italic uppercase tracking-tight">${user.username}</h1>
                                <span class="bg-brand-blue text-white text-[10px] font-bold px-3 py-1 rounded-full flex items-center gap-1.5 uppercase tracking-widest">
                                    <span class="w-2 h-2 bg-white rounded-full live-pulse"></span>
                                    Pro Rank #42
                                </span>
                            </div>
                            <p class="font-body-md text-body-md text-text-muted max-w-lg">Veterano en compraventa :V.</p>
                        </div>

                        <div class="flex gap-4">
                            <div class="text-center px-6">
                                <div class="font-hero-display-mobile text-h2-italic text-text-primary">${user.total_likes}</div>
                                <div class="font-label-caps text-label-caps text-text-muted">LIKES</div>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="settings-section" class="grid grid-cols-1 gap-8 px-gutter mb-section-gap">
                    <div>
                        <div class="glass-panel p-card-padding rounded-xl">
                            <h2 class="font-hero-display-mobile text-section-header italic mb-8 border-l-4 border-brand-blue pl-4 uppercase">Account Settings</h2>

                            <div class="space-y-6">
                                <div class="space-y-2">
                                    <label class="font-label-caps text-label-caps text-text-muted uppercase">Username</label>
                                    <div class="relative">
                                        <input id="input_username"
                                            class="w-full h-14 bg-background-dark border border-surface-slate-800 rounded-lg px-4 pl-12 text-text-primary font-body-md input-focus-ring transition-all"
                                            type="text" value="${user.username}" />
                                        <span class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-text-muted">person</span>
                                    </div>
                                </div>

                                <div class="space-y-2">
                                    <label class="font-label-caps text-label-caps text-text-muted uppercase">Contraseña Actual</label>
                                    <div class="relative">
                                        <input id="input_password_old"
                                            class="w-full h-14 bg-background-dark border border-surface-slate-800 rounded-lg px-4 pl-12 text-text-primary font-body-md input-focus-ring transition-all"
                                            type="password" placeholder="Tu contraseña actual" />
                                        <span class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-text-muted">lock</span>
                                    </div>
                                </div>

                                <div class="space-y-2">
                                    <label class="font-label-caps text-label-caps text-text-muted uppercase">Nueva Contraseña</label>
                                    <div class="relative">
                                        <input id="input_password"
                                            class="w-full h-14 bg-background-dark border border-surface-slate-800 rounded-lg px-4 pl-12 text-text-primary font-body-md input-focus-ring transition-all"
                                            type="password" placeholder="Dejar vacío para no cambiar" />
                                        <span class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-text-muted">lock_open</span>
                                    </div>
                                </div>
                                <div class="space-y-2">
                                    <label class="font-label-caps text-label-caps text-text-muted uppercase">URL Avatar</label>
                                    <div class="relative">
                                        <input id="input_avatar"
                                            class="w-full h-14 bg-background-dark border border-surface-slate-800 rounded-lg px-4 pl-12 text-text-primary font-body-md input-focus-ring transition-all"
                                            type="text" value="${user.avatar ?? ''}" placeholder="https://..." />
                                        <span class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-text-muted">image</span>
                                    </div>
                                </div>

                                <button id="btn_save_user"
                                    style="background-color:#2563eb; color:white; border:none; cursor:pointer;"
                                    class="px-8 py-3 rounded-lg font-label-caps uppercase hover:opacity-90 transition-all">
                                    Guardar cambios
                                </button>
                            </div>
                        </div>
                    </div>
                </section>`;

            $('#settings-section').html(html);
        });
}

function clicks_profile() {
    $(document).on('click', '#btn_save_user', function(e) {
        e.preventDefault();
        update_user();
    });

    $(document).on('click', '#btn_save_password', function(e) {
        e.preventDefault();
        update_password();
    });

    $(document).on("click", '#liked_tournaments > div', function() {
        var id = $(this).attr('id');
        if (id) {
            
            ajaxPromise('module/shop/controller/controller_shop.php?op=update_visits', 'POST', 'JSON', { 'id_torn': id });
            
            setTimeout(function() {
                window.location.href = 'index.php?page=controller_shop&op=list&detalle=' + id;
            }, 300);
        }
    });
}

function load_liked_tournaments() {
    var token = localStorage.getItem('token_JWT');
    if (!token) return;

    ajaxPromise('module/profile/controller/controller_profile.php?op=get_liked_tournaments', 'POST', 'JSON', { 'token': token })
        .then(function(data) {
            $('#liked_tournaments').empty();

            if (data === "error" || data.length === 0) {
                $('#liked_tournaments').html(`
                    <div class="col-span-full flex flex-col items-center justify-center py-20 px-6 border-2 border-dashed border-slate-800 rounded-3xl">
                        <span class="material-symbols-outlined text-slate-500" style="font-size: 3rem">favorite_border</span>
                        <h3 class="text-xl font-bold text-white uppercase mt-4">No tienes torneos guardados</h3>
                        <p class="text-slate-500 mt-2 text-center">Explora el shop y dale like a los que te interesen.</p>
                    </div>
                `);
                return;
            }

            for (var row in data) {
                $('<div class="flex-item more_info_list" id="' + data[row].id_torn + '"></div>')
                    .appendTo('#liked_tournaments')
                    .html(`
                        <article class="card-evento">
                            <div class="evento-img-wrapper" style="position:relative">
                                <div id="profile-carousel-${data[row].id_torn}" class="swiper">
                                    <div class="swiper-wrapper container_listCarousel"></div>
                                    <div class="swiper-button-prev"></div>
                                    <div class="swiper-button-next"></div>
                                </div>
                                <span class="material-symbols-outlined torn__heart like_red" 
                                    data-id="${data[row].id_torn}" 
                                    id="like_${data[row].id_torn}" 
                                    style="position:absolute; top:10px; right:10px; cursor:pointer; font-size:1.8rem; color:#ff4d4d; z-index:10; text-shadow: 0 0 4px rgba(0,0,0,0.8); font-variation-settings: 'FILL' 1">
                                    favorite
                                </span>
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

                data[row].tournament_images.forEach(function(img) {
                    $('<div></div>')
                        .attr('class', 'carousel-item-c swiper-slide')
                        .appendTo(`#profile-carousel-${data[row].id_torn} .container_listCarousel`)
                        .html(`<img src="${img}" alt="${data[row].title}" class="evento-img">`);
                });
            }

        
            document.querySelectorAll('#liked_tournaments .swiper').forEach((el) => {
                new Swiper(el, {
                    speed: 600,
                    loop: el.querySelectorAll('.swiper-slide').length > 1,
                    autoplay: { delay: 2500, disableOnInteraction: false },
                    slidesPerView: 1,
                    observer: true,
                    observeParents: true,
                    navigation: {
                        nextEl: el.querySelector('.swiper-button-next'),
                        prevEl: el.querySelector('.swiper-button-prev'),
                    },
                });
            });

        }).catch(function() {
            console.log("Error en load_liked_tournaments");
        });
}


$(document).ready(function() {
    clicks_profile();
    load_liked_tournaments();
    load_profile_form();
});