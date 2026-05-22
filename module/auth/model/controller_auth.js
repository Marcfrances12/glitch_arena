function register() {
    if (validate_register() != 0) {
        var data = $('#register__form').serialize();
        ajaxPromise('module/auth/controller/controller_auth.php?op=register', 'POST', 'JSON', data)
            .then(function(result) {
                if (result == "error_email") {
                    document.getElementById('error_email_reg').innerHTML = "* El email ya esta en uso, asegurate de no tener ya una cuenta"
                } else if (result == "error_user") {
                    document.getElementById('error_username_reg').innerHTML = "* El usuario ya esta en uso, intentalo con otro"
                } else {
                    Swal.fire({
                        icon: 'success',
                        title: '¡Registro exitoso!',
                        text: 'Bienvenido a Glitch Arena',
                        timer: 2000,
                        showConfirmButton: false
                    }).then(() => {
                        window.location.href = "index.php?page=controller_auth&op=list";
                    });
                    // setTimeout(' window.location.href = "index.php?page=controller_auth&op=list"; ', 1000);
                }
            }).catch(function(textStatus) {
                if (console && console.log) {
                    console.log("La solicitud ha fallado: " + textStatus);
                }
            });
    }
}

function login() {
    if (validate_login() != 0) {
        var data = $('#login__form').serialize();
        ajaxPromise('module/auth/controller/controller_auth.php?op=login', 'POST', 'JSON', data)
            .then(function(result) {
                if (result == "error_user") {
                    document.getElementById('error_username_log').innerHTML = "* El usuario no existe, asegúrate de que lo has escrito correctamente";
                } else if (result == "error_passwd") {
                    document.getElementById('error_passwd_log').innerHTML = "* La contraseña es incorrecta";
                } else {
                    localStorage.setItem("token_JWT", result);
                    console.log(localStorage.getItem("token_JWT"));
                    Swal.fire({
                        icon: 'success',
                        title: '¡Bienvenido!',
                        timer: 2000,
                        showConfirmButton: false
                    }).then(() => {
                        window.location.href = "index.php?page=controller_home&op=view";
                    });
                }
            }).catch(function(textStatus) {
                if (console && console.log) {
                    console.log("La solicitud ha fallado: " + textStatus);
                }
            });
    }
}

function key_login() {
    $("#login").keypress(function(e) {
        var code = (e.keyCode ? e.keyCode : e.which);
        if (code == 13) {
            e.preventDefault();
            login();
        }
    });
}

function button_login() {
    $('#login').on('click', function(e) {
        e.preventDefault();
        login();
    });
}

function key_register() {
    $("#register").keypress(function(e) {
        var code = (e.keyCode ? e.keyCode : e.which);
        if (code == 13) {
            e.preventDefault();
            register();
        }
    });
}

function button_register() {
    $('#register').on('click', function(e) {
        e.preventDefault();
        register();
    });
}


function validate_register() {
    var username_exp = /^(?=.{5,}$)(?=.*[a-zA-Z0-9]).*$/;
    var mail_exp = /^[a-zA-Z0-9_\.\-]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-\.]+$/;
    var pssswd_exp = /^(?=.{8,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).*$/;
    var error = false;

    if (document.getElementById('username_reg').value.length === 0) {
        document.getElementById('error_username_reg').innerHTML = "* Tienes que escribir el usuario";
        error = true;
    } else {
        if (document.getElementById('username_reg').value.length < 5) {
            document.getElementById('error_username_reg').innerHTML = "* El username tiene que tener 5 caracteres como minimo";
            error = true;
        } else {
            if (!username_exp.test(document.getElementById('username_reg').value)) {
                document.getElementById('error_username_reg').innerHTML = "* No se pueden poner caracteres especiales";
                error = true;
            } else {
                document.getElementById('error_username_reg').innerHTML = "";
            }
        }
    }

    if (document.getElementById('email_reg').value.length === 0) {
        document.getElementById('error_email_reg').innerHTML = "* Tienes que escribir un correo";
        error = true;
    } else {
        if (!mail_exp.test(document.getElementById('email_reg').value)) {
            document.getElementById('error_email_reg').innerHTML = "* El formato del mail es invalido";
            error = true;
        } else {
            document.getElementById('error_email_reg').innerHTML = "";
        }
    }

    if (document.getElementById('passwd1_reg').value.length === 0) {
        document.getElementById('error_passwd1_reg').innerHTML = "* Tienes que escribir la contraseña";
        error = true;
    } else {
        if (document.getElementById('passwd1_reg').value.length < 8) {
            document.getElementById('error_passwd1_reg').innerHTML = "* La password tiene que tener 8 caracteres como minimo";
            error = true;
        } else {
            if (!pssswd_exp.test(document.getElementById('passwd1_reg').value)) {
                document.getElementById('error_passwd1_reg').innerHTML = "* Debe de contener minimo 8 caracteres, mayusculas, minusculas y simbolos especiales";
                error = true;
            } else {
                document.getElementById('error_passwd1_reg').innerHTML = "";
            }
        }
    }

    if (error == true) {
        return 0;
    }
}


function validate_login() {
    var error = false;

    if (document.getElementById('username_log').value.length === 0) {
        document.getElementById('error_username_log').innerHTML = "* Tienes que escribir el usuario";
        error = true;
    } else {
        if (document.getElementById('username_log').value.length < 5) {
            document.getElementById('error_username_log').innerHTML = "* El usuario tiene que tener 5 caracteres como minimo";
            error = true;
        } else {
            document.getElementById('error_username_log').innerHTML = "";
        }
    }

    if (document.getElementById('passwd_log').value.length === 0) {
        document.getElementById('error_passwd_log').innerHTML = "* Tienes que escribir la contraseña";
        error = true;
    } else {
        document.getElementById('error_passwd_log').innerHTML = "";
    }

    if (error == true) {
        return 0;
    }
}

$(document).ready(function() {
    key_register();
    button_register();
    key_login();
    button_login();
});