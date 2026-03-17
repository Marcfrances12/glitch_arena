<?php
	if(isset($_GET['page'])){
		switch($_GET['page']){
			case "homepage";
				include("module/home/view/home.html");
				break;
			case "controller_home";
				include("module/home/controller/".$_GET['page'].".php");
				break;
			case "controller_shop";
				include("module/shop/controller/".$_GET['page'].".php");
				break;
			case "404";
				include("view/inc/error".$_GET['page'].".php");
				break;
			case "503";
				include("view/inc/error".$_GET['page'].".php");
				break;
			default;
				include("view/inc/error404.php");
				break;
		}
	}else{
		include("module/home/view/home.html");
	}
?>