<?php
// $data = 'hola crtl search';
// die('<script>console.log('.json_encode( $data ) .');</script>');

$path = $_SERVER['DOCUMENT_ROOT'] . '/glitch_arena/';
include($path . "module/search/model/DAOsearch.php");

@session_start();

switch ($_GET['op']) {

    case 'search_category':
        try{
            $daosearch = new DAOsearch();
            $SelectCategory = $daosearch->search_category();
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

    case 'search_plataforma_null':
        try {
            $daosearch = new DAOsearch();
            $SelectPlataforma = $daosearch->search_plataforma(null);
        } catch (Exception $e) {
            echo json_encode("error");
            exit;
        }

        if (!empty($SelectPlataforma)) {
            echo json_encode($SelectPlataforma);
        } else {
            echo json_encode("error");
        }
    break;

    case 'search_plataforma':
        try {
            $daosearch = new DAOsearch();
            $categoria = $_POST['category']; 
            $SelectPlataforma = $daosearch->search_plataforma($categoria);
        } catch (Exception $e) {
            echo json_encode("error");
            exit;
        }

        if (!empty($SelectPlataforma)) {
            echo json_encode($SelectPlataforma);
        } else {
            echo json_encode("error");
        }
    break;

    case 'autocomplete':
        try {
            $daosearch = new DAOsearch();
            $complete = $_POST['complete'];
            $categoria = !empty($_POST['category']) ? $_POST['category'] : null;
            $plataforma = !empty($_POST['id_platform']) ? $_POST['id_platform'] : null;

            
            $SelectCity = $daosearch->select_city($complete, $categoria, $plataforma);
            
        } catch (Exception $e) {
            echo json_encode("error");
            exit;
        }

       
        if (!empty($SelectCity)) {
            echo json_encode($SelectCity);
        } else {
            echo json_encode("error");
        }
    break;

}