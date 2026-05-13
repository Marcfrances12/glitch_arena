<?php
// $data = 'hola crtl home';
// die('<script>console.log('.json_encode( $data ) .');</script>');

$path = $_SERVER['DOCUMENT_ROOT'] . '/glitch_arena/';
include($path . "module/home/model/DAOhome.php");

@session_start();

switch ($_GET['op']) {
    case 'view':
         //$data = 'hola crtl home view';
         //die('<script>console.log('.json_encode( $data ) .');</script>');
        include("module/home/view/home.html");
    break;

    case 'homePageCarousel':
         //echo json_encode("homePageCategory");
         //exit();
        try{
            $daohome = new DAOHome();
            $SelectCarousel = $daohome->carousel();
            // echo json_encode($SelectCategory);
            // exit();
        } catch(Exception $e){
            echo json_encode("error");
        }
            
        if(!empty($SelectCarousel)){
            echo json_encode($SelectCarousel); 
        }
        else{
            echo json_encode("error");
        }
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
    
    case 'homePageCity':
     
        try{
            $daohome = new DAOHome();
            $SelectCity = $daohome->select_all_city();
            
        } catch(Exception $e){
            echo json_encode("error");
        }
            
        if(!empty($SelectCity)){
            echo json_encode($SelectCity); 
        }
        else{
            echo json_encode("error");
        }
    break;

    case 'homePageType':
         //echo json_encode("homePageCategory");
         //exit();
        try{
            $daohome = new DAOHome();
            $SelectType = $daohome->select_all_type();
            // echo json_encode($SelectCategory);
            // exit();
        } catch(Exception $e){
            echo json_encode("error");
        }
            
        if(!empty($SelectType)){
            echo json_encode($SelectType); 
        }
        else{
            echo json_encode("error");
        }
    break;

    case 'popular_eventos':
        $daohome = new DAOHome();
        try {
            $data = $daohome->get_popular_eventos();
            echo json_encode($data);
        } catch (Exception $e) {
            echo json_encode(["error" => $e->getMessage()]);
        }
    break;
    default:
    include("view/inc/error404.php");
    break;
}