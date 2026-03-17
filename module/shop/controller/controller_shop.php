<?php
// $data = 'hola crtl shop';
// die('<script>console.log('.json_encode( $data ) .');</script>');

$path = $_SERVER['DOCUMENT_ROOT'] . '/glitch_arena/';
include($path . "module/shop/model/DAOshop.php");

@session_start();

switch ($_GET['op']) {

    case 'list':
            //$data = 'hola crtl home view';
            //die('<script>console.log('.json_encode( $data ) .');</script>');
            include("module/shop/view/shop.html");
        break;  

    case 'all_eventos':
        $data = 'hola crtl shop eveneneti view';
        die('<script>console.log('.json_encode( $data ) .');</script>');
        $prod = $_POST['total_prod'];
        $items = $_POST['items_page'];
        try {
            $daoshop = new DAOShop();
            $Dates_eventos = $daoshop->select_all_eventos($prod, $items);
        } catch (Exception $e) {
            echo json_encode("error");
        }

        if (!empty($Dates_eventos)) {
            echo json_encode($Dates_eventos);
        } else {
            echo json_encode("error");
        }
    break;

    

}