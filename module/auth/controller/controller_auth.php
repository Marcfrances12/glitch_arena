<?php
// $data = 'hola crtl home';
// die('<script>console.log('.json_encode( $data ) .');</script>');

$path = $_SERVER['DOCUMENT_ROOT'] . '/glitch_arena/';
include($path . "module/auth/model/DAOauth.php");

@session_start();

switch ($_GET['op']) {

    case 'list':
        include("module/auth/view/auth.html");
    break; 

default:
    include("view/inc/error404.php");
    break;
}