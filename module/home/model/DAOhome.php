<?php
$path = $_SERVER['DOCUMENT_ROOT'] . '/glitch_arena/';
include($path . "model/connect.php");

class DAOHome
{
	function select_all_evento()
	{
		// echo json_encode("select_all_evento");
        // exit();
		$sql = "SELECT * FROM eventos_torneos ORDER BY id_torn ASC";
		$conexion = connect::con();
		$stmt = $conexion->prepare($sql);
		$stmt->execute();
		$res = $stmt->fetchAll(PDO::FETCH_ASSOC);
		connect::close($conexion);
		return $res;
	}

}