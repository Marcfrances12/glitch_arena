<?php
$path = $_SERVER['DOCUMENT_ROOT'] . '/glitch_arena/';
include($path . "model/connect.php");

class DAOShop
{

    function select_all_eventos($total_prod,$items_page){
            $sql = "SELECT 
                    t.*, 
                    c.city_name, 
                    v.venue_name, 
                    GROUP_CONCAT(DISTINCT g.game_name SEPARATOR ', ') AS game_name
                FROM tournaments t
                LEFT JOIN cities c ON t.id_city = c.id_city
                LEFT JOIN venues v ON t.id_venue = v.id_venue
                LEFT JOIN torn_games tg ON t.id_torn = tg.id_torn
                LEFT JOIN games g ON tg.id_game = g.id_game
                GROUP BY t.id_torn
                ORDER BY t.start_date ASC
                LIMIT $total_prod, $items_page;";

            $conexion = connect::con();
            $res = mysqli_query($conexion, $sql);
            connect::close($conexion);

            $retrArray = array();
            if (mysqli_num_rows($res) > 0) {
                while ($row = mysqli_fetch_assoc($res)) {
                    $retrArray[] = $row;
                }
            }
            return $retrArray;
    }

}