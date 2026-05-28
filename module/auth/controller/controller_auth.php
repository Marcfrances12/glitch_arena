<?php
// $data = 'hola crtl home';
// die('<script>console.log('.json_encode( $data ) .');</script>');

$path = $_SERVER['DOCUMENT_ROOT'] . '/glitch_arena/';
include($path . "module/auth/model/DAOauth.php");
include($path . "model/middleware_auth.php");

@session_start();

switch ($_GET['op']) {

    case 'list':
        include("module/auth/view/auth.html");
    break; 

    case 'register':

        try {
            $daoLog = new DAOauth();
            $check_email = $daoLog->select_email($_POST['email_reg']);
        } catch (Exception $e) {
            echo json_encode("error");
            exit;
        }

        if ($check_email) {
            echo json_encode("error_email");
            exit;
        }

        try {
            $check_username = $daoLog->select_user($_POST['username_reg']);
        } catch (Exception $e) {
            echo json_encode("error");
            exit;
        }

        if ($check_username != "error_user") {
            echo json_encode("error_user");
            exit;
        }

        try {
            $rdo = $daoLog->insert_user($_POST['username_reg'], $_POST['email_reg'], $_POST['passwd1_reg']);
        } catch (Exception $e) {
            echo json_encode("error");
            exit;
        }

        if (!$rdo) {
            echo json_encode("error");
            exit;
        } else {
            echo json_encode("ok");
            exit;
        }

        break;

    case 'login':
        try {
            $daoLog = new DAOauth();
            $rdo = $daoLog->select_user($_POST['username_log']);

            if ($rdo == "error_user") {
                echo json_encode("error_user");
                exit;
            }

            if (password_verify($_POST['passwd_log'], $rdo['password'])) {
                $token= create_token($rdo["username"]);
                $_SESSION['username']   = $rdo['username'];
                // $_SESSION['role']  = $rdo['role'];
                // $_SESSION['avatar']     = $rdo['avatar'];
                $_SESSION['tiempo']     = time();
                echo json_encode($token);
                exit;
            } else {
                echo json_encode("error_passwd");
                exit;
            }

        } catch (Exception $e) {
            echo json_encode("error");
            exit;
        }
    break;


    case 'logout':
        unset($_SESSION['username']);
        unset($_SESSION['tiempo']);
        session_destroy();

        echo json_encode('Done');
    break;

    case 'data_user':
        $username = decode_token($_POST['token']);
        $daoLog = new DAOauth();
        $rdo = $daoLog->select_data_user($username["username"]);
        echo json_encode($rdo);
        exit;
    break;

    case 'actividad':
        if (!isset($_SESSION["tiempo"])) {
            echo json_encode("inactivo");
            exit();
        } else {
            if ((time() - $_SESSION["tiempo"]) >= 1800) { //1800s=30min
                echo json_encode("inactivo");
                exit();
            } else {
                echo json_encode("activo");
                exit();
            }
        }
    break;

    case 'controluser':
        $token_dec = decode_token($_POST['token']);

        if ($token_dec['exp'] < time()) {
            echo json_encode("Wrong_User");
            exit();
        }

        if (isset($_SESSION['username']) && ($_SESSION['username']) == $token_dec['username']) {
            echo json_encode("Correct_User");
            exit();
        } else {
            echo json_encode("Wrong_User");
            exit();
        }
    break;

    case 'refresh_token':
        $old_token = decode_token($_POST['token']);
        $new_token = create_token($old_token['username']);
        echo json_encode($new_token);
    break;

    case 'refresh_cookie':
        session_regenerate_id();
        echo json_encode("Done");
        exit;
    break;

default:
    include("view/inc/error404.php");
    break;
}