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

default:
    include("view/inc/error404.php");
    break;
}