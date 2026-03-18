<?php
$path = $_SERVER['DOCUMENT_ROOT'] . '/glitch_arena/';
include($path . "model/connect.php");

class DAOShop
{

    function select_all_eventos(){
        // $total_prod,$items_page
            $sql = "SELECT 
                    t.*, 
                    c.city_name, 
                    v.venue_name, 
                    GROUP_CONCAT(DISTINCT g.game_name SEPARATOR ', ') AS game_name,
                    GROUP_CONCAT(DISTINCT ti.image_url SEPARATOR ', ') AS tournament_images
                FROM tournaments t
                LEFT JOIN cities c ON t.id_city = c.id_city
                LEFT JOIN venues v ON t.id_venue = v.id_venue
                LEFT JOIN torn_games tg ON t.id_torn = tg.id_torn
                LEFT JOIN games g ON tg.id_game = g.id_game
                LEFT JOIN torn_images ti ON t.id_torn = ti.id_torn
                GROUP BY t.id_torn
                ORDER BY t.start_date ASC";
            // LIMIT $total_prod, $items_page;
           try {
                $conexion = connect::con();
                $stmt = $conexion->prepare($sql);
                $stmt->execute();
                $res = $stmt->fetchAll(PDO::FETCH_ASSOC);
                $conexion = null; 
                return $res;
            } catch (PDOException $e) {
                return [];
            }
    }

    function select_one_evento($id) {
        $sql = "SELECT t.*, 
                    c.city_name, 
                    v.venue_name, 
                    v.address AS venue_address,
                    tt.type_name,
                    GROUP_CONCAT(DISTINCT g.game_name SEPARATOR ', ') AS game_names
                FROM tournaments t
                LEFT JOIN cities c ON t.id_city = c.id_city
                LEFT JOIN venues v ON t.id_venue = v.id_venue
                LEFT JOIN tournament_types tt ON t.id_type = tt.id_type
                LEFT JOIN torn_games tg ON t.id_torn = tg.id_torn
                LEFT JOIN games g ON tg.id_game = g.id_game
                WHERE t.id_torn = :id
                GROUP BY t.id_torn";

        try {
            $conexion = connect::con();
            $stmt = $conexion->prepare($sql);
            $stmt->bindParam(':id', $id, PDO::PARAM_INT);
            $stmt->execute();
            $res = $stmt->fetch(PDO::FETCH_OBJ); 
            
            $conexion = null; 
            return $res;
        } catch (PDOException $e) {
            return null;
        }
    }

    function select_imgs_evento($id){
		$sql = "SELECT id_image, id_torn, image_url
                FROM torn_images
                WHERE id_torn = :id";

		try {
            $conexion = connect::con();
            $stmt = $conexion->prepare($sql);
            $stmt->bindParam(':id', $id, PDO::PARAM_INT);
            $stmt->execute();
            $imgArray = $stmt->fetchAll(PDO::FETCH_ASSOC);
            $conexion = null; 
            return $imgArray;

        } catch (PDOException $e) {
            return [];
        }
	}

}