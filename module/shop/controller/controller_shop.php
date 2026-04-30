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
        // $prod = $_POST['total_prod'];
        // $items = $_POST['items_page'];
        try {
            $daoshop = new DAOShop();
            $Dates_eventos = $daoshop->select_all_eventos();
            // $prod, $items
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
            // Recogemos el filtro. Si no existe, array vacío para que el DAO traiga todo.
            $filtros = (isset($_POST['filtro']) && !empty($_POST['filtro'])) ? $_POST['filtro'] : [];
            
            $filt = $daoshop->filtros($filtros);

            if (!empty($filt)) {
                echo json_encode($filt);
            } else {
                echo json_encode([]); // Devolvemos array vacío si no hay resultados
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

}