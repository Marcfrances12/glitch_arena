<?php
// $data = 'hola crtl search';
// die('<script>console.log('.json_encode( $data ) .');</script>');

$path = $_SERVER['DOCUMENT_ROOT'] . '/glitch_arena/';
include($path . "module/search/model/DAOsearch.php");

@session_start();

switch ($_GET['op']) {

      case 'search_category';
        $searchQuery = new DAOsearch();
        $selSlide = $searchQuery -> search_category();
        if (!empty($selSlide)) {
            echo json_encode($selSlide);
        }
        else {
            echo "error";
        }
        break;


}