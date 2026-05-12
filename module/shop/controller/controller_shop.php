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

        try {
            $daoshop = new DAOShop();
            $Dates_eventos = $daoshop->select_all_eventos($_POST['limit'], $_POST['offset']);
            
        } catch (Exception $e) {
            echo json_encode("error");
        }

        if (!empty($Dates_eventos)) {
            echo json_encode($Dates_eventos);
        } else {
            echo json_encode("error");
        }
    break;

    case 'details_evento':
        try {
            $daoshop = new DAOShop();
            $Date_evento = $daoshop->select_one_evento($_GET['id']);
        } catch (Exception $e) {
            echo json_encode("error");
        }
        try {
            $daoshop_img = new DAOShop();
            $Date_images = $daoshop_img->select_imgs_evento($_GET['id']);
        } catch (Exception $e) {
            echo json_encode("error");
        }

        if (!empty($Date_evento || $Date_images)) {
            $rdo = array();
            $rdo[0] = $Date_evento;
            $rdo[1][] = $Date_images;
            echo json_encode($rdo);
        } else {
            echo json_encode("error");
        }
    break;

    case 'extras':
        
        try {
            $daoshop = new DAOShop();
            $Dates_eventos = $daoshop->select_extras_evento($_GET['id']);
            
        } catch (Exception $e) {
            echo json_encode("error");
        }

        if (!empty($Dates_eventos)) {
            echo json_encode($Dates_eventos);
        } else {
            echo json_encode("error");
        }
    break;
    
   case 'filtros': 
        $daoshop = new DAOShop();
        try {
            $filtros = (isset($_POST['filtro']) && !empty($_POST['filtro'])) ? $_POST['filtro'] : [];
            
            $allowed_order = ['price', 'start_date', 'id_torn'];
            $allowed_direction = ['ASC', 'DESC'];

            $order = (isset($_POST['order']) && in_array($_POST['order'], $allowed_order)) 
                ? $_POST['order'] : 'id_torn';

            $direction = (isset($_POST['direction']) && in_array($_POST['direction'], $allowed_direction)) 
                ? $_POST['direction'] : 'DESC';

            $filt = $daoshop->filtros($filtros, $order, $direction, $_POST['limit'], $_POST['offset']);

            if (!empty($filt)) {
                echo json_encode($filt);
            } else {
                echo json_encode([]); 
            }
        } catch (Exception $e) {
            echo json_encode(["error" => $e->getMessage()]);
        }
    break;

    ob_start(); 

    case 'get_filters_config':
        try {

            $daoshop = new DAOShop();
            $config = $daoshop->get_dynamic_filters();


            ob_end_clean(); 
            header('Content-Type: application/json');
            echo json_encode($config);
        } catch (Exception $e) {
            ob_end_clean();
            header('Content-Type: application/json');
            echo json_encode(["error" => $e->getMessage()]);
        }
        exit;
    break;

    case 'count_filters':
        try {
            $daoshop = new DAOShop();
            
            $filtros = (isset($_POST['filtros'])) ? $_POST['filtros'] : [];
            $total = $daoshop->count_filtros($filtros);
            echo json_encode($total);
        } catch (Exception $e) {
            echo json_encode(0);
        }
    break;

    case 'contar_eventos';
        try{
            $daoshop = new DAOShop();
            $SelectCategory = $daoshop->contar_eventos();
        } catch(Exception $e){
            echo json_encode("error");
        }
            
        if(!empty($SelectCategory)){
            echo json_encode($SelectCategory); 
        }
        else{
            echo json_encode("error");
        }
    break;

    case 'count_events_related':
        $platform_name = $_POST['platform_name'];
        $id_torn = $_POST['id_torn'];
        try {
            $daoshop = new DAOShop();
            $rdo = $daoshop->count_related_events($platform_name, $id_torn);
        } catch (Exception $e) {
            echo json_encode("error");
            exit;
        }
        if (!$rdo) {
            echo json_encode("error");
            exit;
        } else {
            echo json_encode($rdo);
        }
    break;

    case 'events_related':
        $platform_name = $_POST['platform_name'];
        $id_torn = $_POST['id_torn'];
        $loaded = $_POST['loaded'];
        $items = $_POST['items'];
        try {
            $daoshop = new DAOShop();
            $rdo = $daoshop->select_related_events($platform_name, $id_torn, $loaded, $items);
        } catch (Exception $e) {
            echo json_encode("error");
            exit;
        }
        if (!$rdo) {
            echo json_encode("error");
            exit;
        } else {
            $dinfo = array();
            foreach ($rdo as $row) {
                array_push($dinfo, $row);
            }
            echo json_encode($dinfo);
        }
    break;

}