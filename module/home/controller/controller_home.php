<?php
// $data = 'hola crtl home';
// die('<script>console.log('.json_encode( $data ) .');</script>');

$path = $_SERVER['DOCUMENT_ROOT'] . '/glitch_arena/';
include($path . "module/home/model/DAOHome.php");

@session_start();

switch ($_GET['op']) {
    case 'view':
         //$data = 'hola crtl home view';
         //die('<script>console.log('.json_encode( $data ) .');</script>');
        include("module/home/view/home.html");
        break;

    case 'homePageCategory':
         //echo json_encode("homePageCategory");
         //exit();
        try{
            $daohome = new DAOHome();
            $SelectCategory = $daohome->select_all_categ();
            // echo json_encode($SelectCategory);
            // exit();
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

    case 'homePagePlataform':
         //echo json_encode("homePageCategory");
         //exit();
        try{
            $daohome = new DAOHome();
            $SelectCategory = $daohome->select_all_plat();
            // echo json_encode($SelectCategory);
            // exit();
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

    case 'homePageGame':
      
        try{
            $daohome = new DAOHome();
            $SelectCategory = $daohome->select_all_game();
            
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

    default:
        include("view/inc/error404.php");
        break;
}