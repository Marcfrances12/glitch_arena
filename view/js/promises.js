function ajaxPromise(sUrl, sType, sdataType, sData = undefined) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: sUrl,
            type: sType,
            dataType: sdataType,
            data: sData
        }).done((data) => {
            resolve(data);
        }).fail((jqXHR, textStatus, errorThrow) => {
            reject(errorThrow);
        }); 
    });
};

function load_menu() {
    var token = localStorage.getItem('token_JWT');
    if (token) {
        ajaxPromise('module/auth/controller/controller_auth.php?op=data_user', 'POST', 'JSON', { 'token': token })
            .then(function(data) {
                console.log(data);
                $('#btn_acceder').addClass('hidden');
                $('#user_avatar').attr('src', data.avatar);
                $('#user_name').text(data.username);
                $('#user_info').removeClass('hidden').addClass('flex');
            }).catch(function() {
                console.log("Error al cargar los datos del user");
            });
    } else {
        $('#btn_acceder').removeClass('hidden');
        $('#user_info').addClass('hidden');
    }
}

function click_logout() {
    $(document).on('click', '#btn_logout', function() {
        Swal.fire({
            icon: 'question',
            title: '¿Cerrar sesión?',
            showConfirmButton: true,
            confirmButtonText: 'Sí, salir',
            showCancelButton: true,
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                logout();
            }
        });
    });
}

function logout() {
    ajaxPromise('module/auth/controller/controller_auth.php?op=logout', 'POST', 'JSON')
        .then(function(data) {
            localStorage.removeItem('token_JWT');
            window.location.href = "index.php?page=controller_auth&op=list";
        }).catch(function() {
            console.log('Something has occured');
        });
}

$(document).ready(function() {
    load_menu();
    click_logout();
});