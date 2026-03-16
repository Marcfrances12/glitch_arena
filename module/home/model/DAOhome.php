<?php
$path = $_SERVER['DOCUMENT_ROOT'] . '/glitch_arena/';
include($path . "model/connect.php");

class DAOHome
{
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
	
		$sql = "SELECT * FROM cities ORDER BY id_city ASC";
		$conexion = connect::con();
		$stmt = $conexion->prepare($sql);
		$stmt->execute();
		$res = $stmt->fetchAll(PDO::FETCH_ASSOC);
		connect::close($conexion);
		return $res;
	}

}