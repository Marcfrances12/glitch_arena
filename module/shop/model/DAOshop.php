<?php
$path = $_SERVER['DOCUMENT_ROOT'] . '/glitch_arena/';
include($path . "model/connect.php");

class DAOShop
{

    function select_all_eventos(){
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

        try {
            $conexion = connect::con();
            $stmt = $conexion->prepare($sql);
            $stmt->execute();
            $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
            $conexion = null;

            $retrArray = [];

        foreach ($rows as $row) {
                $retrArray[] = array(
                    "id_torn"           => $row["id_torn"],
                    "title"             => $row["title"],        
                    "price"             => $row["price"],        
                    "start_date"        => $row["start_date"],
                    "city_name"         => $row["city_name"],
                    "venue_name"        => $row["venue_name"],
                    "game_name"         => !empty($row["game_name"])
                                                ? explode(", ", $row["game_name"])
                                                : [],
                    "tournament_images" => !empty($row["tournament_images"])
                                                ? explode(", ", $row["tournament_images"])
                                                : [],
                );
            }

            return $retrArray;

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

    function select_extras_evento($id) {

        $sql = "SELECT e.nom_extra, e.img_extra 
                FROM extras e
                INNER JOIN torn_extra te ON e.id_extra = te.id_extra
                WHERE te.id_torn = :id";

        try {
            $conexion = connect::con();
            $stmt = $conexion->prepare($sql);
            $stmt->bindParam(':id', $id, PDO::PARAM_INT);
            $stmt->execute();
            $res = $stmt->fetchAll(PDO::FETCH_OBJ); 
            
            $conexion = null; 
            return $res;
        } catch (PDOException $e) {
            
            return [];
        }
    }

    function filtros($filter) {
    
        $consulta = "SELECT 
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
                INNER JOIN torn_categories tc ON t.id_torn = tc.id_torn
                INNER JOIN categories cat ON tc.id_category = cat.id_category
                INNER JOIN torn_platforms tp ON t.id_torn = tp.id_torn
                INNER JOIN platforms p ON tp.id_platform = p.id_platform";

        $param = []; 
        
        for ($i = 0; $i < count($filter); $i++) {
            
            if ($i == 0) {
                $consulta .= " WHERE ";
            } else {
                $consulta .= " AND ";
            }


            if ($filter[$i][0] === 'price') {
                $consulta .= "price BETWEEN ? AND ?";
                $param[] = $filter[$i][1][0]; 
                $param[] = $filter[$i][1][1]; 
            } 
            
            elseif (is_array($filter[$i][1])) {
                $placeholders = implode(',', array_fill(0, count($filter[$i][1]), '?'));
                $consulta .= $filter[$i][0] . " IN (" . $placeholders . ")";
                foreach ($filter[$i][1] as $value) {
                    $param[] = $value;
                }
            }
            
            else {
                $consulta .= $filter[$i][0] . " = ?";
                $param[] = $filter[$i][1]; 
            }
        }
   
        $consulta .= " GROUP BY t.id_torn ORDER BY t.start_date ASC";

       
        try {
            $conexion = connect::con();
            $stmt = $conexion->prepare($consulta);
            $stmt->execute($param);
            $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
            $conexion = null;

            $retrArray = [];

            
            foreach ($rows as $row) {
                $retrArray[] = array(
                    "id_torn"           => $row["id_torn"],
                    "title"             => $row["title"],        
                    "price"             => $row["price"],        
                    "start_date"        => $row["start_date"],
                    "city_name"         => $row["city_name"],
                    "venue_name"        => $row["venue_name"],
                    "game_name"         => !empty($row["game_name"]) 
                                            ? explode(", ", $row["game_name"]) 
                                            : [],
                    "tournament_images" => !empty($row["tournament_images"]) 
                                            ? explode(", ", $row["tournament_images"]) 
                                            : []
                );
            }

            return $retrArray;

        } catch (PDOException $e) {
            return ["error" => "Error en la consulta: " . $e->getMessage()];
        }
    }


    function get_dynamic_filters() {
        try {
            $conexion = connect::con();
            
            $sql = "SELECT * FROM config_filters";
            $stmt = $conexion->prepare($sql);
            $stmt->execute();
            $filtros = $stmt->fetchAll(PDO::FETCH_ASSOC);

            $resultado = [];
            foreach ($filtros as $f) {
                $col = $f['db_column'];

                if ($f['html_type'] === 'slider') {
                    // Slider: min y max directo de tournaments
                    $sql_val = "SELECT MIN($col) as min, MAX($col) as max FROM tournaments";
                    $stmt_val = $conexion->prepare($sql_val);
                    $stmt_val->execute();
                    $f['valores'] = $stmt_val->fetch(PDO::FETCH_ASSOC);

                } elseif (!empty($f['join_table']) && !empty($f['pivot_table'])) {
                    // Relación muchos a muchos via tabla pivot
                    $jt = $f['join_table'];   // categories
                    $jl = $f['join_label'];   // cat_name
                    $pt = $f['pivot_table'];  // torn_categories
                    $fk = $f['pivot_fk'];     // id_category

                    $sql_val = "SELECT DISTINCT j.$jl 
                                FROM $jt j
                                INNER JOIN $pt p ON j.$fk = p.$fk
                                INNER JOIN tournaments t ON p.id_torn = t.id_torn";
                    $stmt_val = $conexion->prepare($sql_val);
                    $stmt_val->execute();
                    $f['valores'] = $stmt_val->fetchAll(PDO::FETCH_COLUMN);

                } elseif (!empty($f['join_table'])) {
                    // Relación directa con FK en tournaments (ciudades)
                    $jt = $f['join_table'];  // cities
                    $jl = $f['join_label'];  // city_name
                    $fk = $f['pivot_fk'];    // id_city

                    $sql_val = "SELECT DISTINCT j.$jl 
                                FROM $jt j
                                INNER JOIN tournaments t ON j.$fk = t.$fk
                                WHERE t.$fk IS NOT NULL";
                    $stmt_val = $conexion->prepare($sql_val);
                    $stmt_val->execute();
                    $f['valores'] = $stmt_val->fetchAll(PDO::FETCH_COLUMN);

                } else {
                    // Columna directa en tournaments (status, price...)
                    $sql_val = "SELECT DISTINCT $col FROM tournaments 
                                WHERE $col IS NOT NULL AND $col != ''";
                    $stmt_val = $conexion->prepare($sql_val);
                    $stmt_val->execute();
                    $f['valores'] = $stmt_val->fetchAll(PDO::FETCH_COLUMN);
                }

                $resultado[] = $f;
            }

            $conexion = null;
            return $resultado;

        } catch (PDOException $e) {
            return ["error" => $e->getMessage()];
        }
    }
}