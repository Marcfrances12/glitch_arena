<?php
// $data = 'hola crtl home';
// die('<script>console.log('.json_encode( $data ) .');</script>');

$path = $_SERVER['DOCUMENT_ROOT'] . '/glitch_arena/';
include($path . "module/profile/model/DAOprofile.php");
include($path . "model/middleware_auth.php");

@session_start();

switch ($_GET['op']) {

    case 'list':
        include("module/profile/view/profile.html");
    break; 

    case 'update_user':
        try {
            $token_data = decode_token($_POST['token']);
            $dao = new DAOprofile();

            
            if (!empty($_POST['password'])) {
                $user = $dao->select_data_user($token_data['username']);
                if (!password_verify($_POST['password_old'], $user->password)) {
                    echo json_encode("wrong_password");
                    exit;
                }
            }

            $rdo = $dao->update_user(
                $_POST['username'],
                $_POST['password'],
                $_POST['avatar'],
                $token_data['username']
            );
            if ($rdo) {
                $new_username = !empty($_POST['username']) ? $_POST['username'] : $token_data['username'];
                $new_token = create_token($new_username);
                echo json_encode($new_token);
            } else {
                echo json_encode("error");
            }
        } catch (Exception $e) {
            echo json_encode("error");
        }
        exit;
    break;

   

    case 'data_user':
        $username = decode_token($_POST['token']);
        $dao = new DAOprofile();
        $rdo = $dao->select_data_user($username["username"]);
        echo json_encode($rdo);
        exit;
    break;

    case 'get_liked_tournaments':
        try {
            $token_data = decode_token($_POST['token']);
            $dao = new DAOProfile();
            $rdo = $dao->get_liked_tournaments($token_data['username']);
            echo json_encode($rdo);
        } catch (Exception $e) {
            echo json_encode("error");
        }
        exit;
    break;

default:
    include("view/inc/error404.php");
    break;
}