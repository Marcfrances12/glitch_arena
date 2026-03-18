<?php
$path = $_SERVER['DOCUMENT_ROOT'] . '/glitch_arena/';
include($path . "model/connect.php");

class DAOHome
{

	function carousel()
	{
		// echo json_encode("select_all_evento");
        // exit();
		$sql = "SELECT * 
				FROM tournaments t 
				LEFT JOIN torn_images ti ON t.id_torn = ti.id_torn 
				WHERE ti.id_image IN (1, 2, 3)
				ORDER BY t.id_torn ASC";
		$conexion = connect::con();
		$stmt = $conexion->prepare($sql);
		$stmt->execute();
		$res = $stmt->fetchAll(PDO::FETCH_ASSOC);
		connect::close($conexion);
		return $res;
	}

	function select_all_categ()
	{
		// echo json_encode("select_all_evento");
        // exit();
		$sql = "SELECT * FROM categories ORDER BY id_category ASC";
		$conexion = connect::con();
		$stmt = $conexion->prepare($sql);
		$stmt->execute();
		$res = $stmt->fetchAll(PDO::FETCH_ASSOC);
		connect::close($conexion);
		return $res;
	}

	function select_all_plat()
	{
	
		$sql = "SELECT * FROM platforms ORDER BY id_platform ASC";
		$conexion = connect::con();
		$stmt = $conexion->prepare($sql);
		$stmt->execute();
		$res = $stmt->fetchAll(PDO::FETCH_ASSOC);
		connect::close($conexion);
		return $res;
	}

	function select_all_game()
	{
	
		$sql = "SELECT g.*, GROUP_CONCAT(gi.game_img) as all_images
				FROM games g
				LEFT JOIN game_images gi ON g.id_game = gi.id_game
				GROUP BY g.id_game
				ORDER BY g.id_game ASC";
		$conexion = connect::con();
		$stmt = $conexion->prepare($sql);
		$stmt->execute();
		$res = $stmt->fetchAll(PDO::FETCH_ASSOC);
		connect::close($conexion);
		return $res;
	}

	function select_all_city()
	{
	
		$sql = "SELECT * FROM cities c INNER JOIN venues v WHERE c.id_city = v.id_city ORDER BY c.id_city ASC";
		$conexion = connect::con();
		$stmt = $conexion->prepare($sql);
		$stmt->execute();
		$res = $stmt->fetchAll(PDO::FETCH_ASSOC);
		connect::close($conexion);
		return $res;
	}

	function select_all_type()
	{
	
		$sql = "SELECT * FROM tournament_types ORDER BY id_type ASC";
		$conexion = connect::con();
		$stmt = $conexion->prepare($sql);
		$stmt->execute();
		$res = $stmt->fetchAll(PDO::FETCH_ASSOC);
		connect::close($conexion);
		return $res;
	}

}