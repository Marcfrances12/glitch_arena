<?php
$path = $_SERVER['DOCUMENT_ROOT'] . '/glitch_arena/';
include($path . "model/connect.php");

class DAOsearch {

function search_category()
	{
		// echo json_encode("categories");
        // exit();
		$sql = "SELECT * FROM categories";
		$conexion = connect::con();
		$stmt = $conexion->prepare($sql);
		$stmt->execute();
		$res = $stmt->fetchAll(PDO::FETCH_ASSOC);
		connect::close($conexion);
		return $res;
	}

function search_plataforma($categoria = null) 
	{
        $sql = "SELECT DISTINCT p.* FROM platforms p";
        
        if ($categoria) {
            $sql .= " INNER JOIN torn_platforms tp ON p.id_platform = tp.id_platform
                      INNER JOIN torn_categories tc ON tp.id_torn = tc.id_torn
                      WHERE tc.id_category = '$categoria'";
        }
        $conexion = connect::con();
		$stmt = $conexion->prepare($sql);
		$stmt->execute();
		$res = $stmt->fetchAll(PDO::FETCH_ASSOC);
		connect::close($conexion);
		return $res;
    }

	
    function select_city($complete, $categoria = null, $plataforma = null) {
        $sql = "SELECT DISTINCT c.city_name FROM tournaments t INNER JOIN cities c ON t.id_city = c.id_city ";

        if ($categoria) {
            $sql .= " INNER JOIN tournament_categories tc ON t.id_torn = tc.id_torn";
        }

        if ($plataforma) {
            $sql .= " INNER JOIN tournament_platforms tp ON t.id_torn = tp.id_torn";
        }

        $sql .= " WHERE c.city_name LIKE '$complete%'";

        if ($categoria) {
            $sql .= " AND tc.id_category = '$categoria'";
        }
        if ($plataforma) {
            $sql .= " AND tp.id_platform = '$plataforma'";
        }

        $conexion = connect::con();
        $res = $conexion->prepare($sql);
        $res->execute();
        $retrArray = $res->fetchAll(PDO::FETCH_ASSOC);
        connect::close($conexion);
        return $retrArray;
    }
}

