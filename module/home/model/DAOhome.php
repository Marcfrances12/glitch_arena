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

}