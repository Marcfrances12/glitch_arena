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
                            <button class="absolute bottom-2 right-2 bg-background-dark border border-surface-slate-800 p-2 rounded-full text-text-muted hover:text-text-primary transition-all">
                                <span class="material-symbols-outlined text-[18px]">edit</span>
                            </button>
                        </div>

                        <div class="text-center md:text-left flex-1">
                            <div class="flex flex-col md:flex-row items-center gap-4 mb-2">
                                <h1 class="font-hero-display-mobile text-section-header italic uppercase tracking-tight">${user.username}</h1>
                                <span class="bg-brand-blue text-white text-[10px] font-bold px-3 py-1 rounded-full flex items-center gap-1.5 uppercase tracking-widest">
                                    <span class="w-2 h-2 bg-white rounded-full live-pulse"></span>
                                    Pro Rank #42
                                </span>
                            </div>
                            <p class="font-body-md text-body-md text-text-muted max-w-lg">Veteran striker specialized in high-speed maneuvers.</p>
                        </div>

                        <div class="flex gap-4">
                            <div class="text-center px-6">
                                <div class="font-hero-display-mobile text-h2-italic text-text-primary">0</div>
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
}

$(document).ready(function() {
    clicks_profile();
    load_profile_form();
});