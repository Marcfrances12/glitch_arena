<?php
$path = $_SERVER['DOCUMENT_ROOT'] . '/glitch_arena/';
include($path . "model/connect.php");

class DAOprofile
{

    function update_user($username, $password, $avatar, $current_username) {
        $conexion = connect::con();

        $fields = [];
        $params = [':current_username' => $current_username];

        if (!empty($username)) {
            $fields[] = "username = :username";
            $params[':username'] = $username;
        }
        if (!empty($password)) {
            $fields[] = "password = :password";
            $params[':password'] = password_hash($password, PASSWORD_ARGON2ID);
        }
        if (!empty($avatar)) {
            $fields[] = "avatar = :avatar";
            $params[':avatar'] = $avatar;
        }

        if (empty($fields)) return false;

        $sql = "UPDATE users SET " . implode(', ', $fields) . " WHERE username = :current_username";
        $stmt = $conexion->prepare($sql);
        $res = $stmt->execute($params);
        connect::close($conexion);
        return $res;
    }

 

    function select_data_user($username) {
        $conexion = connect::con();
        $sql = "SELECT u.*, COUNT(l.id_like) AS total_likes
                FROM users u
                LEFT JOIN likes l ON u.id_user = l.id_user
                WHERE u.username = :username
                GROUP BY u.id_user";
        $stmt = $conexion->prepare($sql);
        $stmt->execute([':username' => $username]);
        $res = $stmt->fetch(PDO::FETCH_OBJ);
        connect::close($conexion);
        return $res;
    }

    function get_liked_tournaments($username) {
        $conexion = connect::con();
        $sql = "SELECT 
                    t.id_torn, t.title, t.price, t.start_date,
                    c.city_name, v.venue_name,
                    GROUP_CONCAT(DISTINCT ti.image_url SEPARATOR ', ') AS tournament_images
                FROM likes lk
                INNER JOIN users u ON lk.id_user = u.id_user
                INNER JOIN tournaments t ON lk.id_torn = t.id_torn
                LEFT JOIN cities c ON t.id_city = c.id_city
                LEFT JOIN venues v ON t.id_venue = v.id_venue
                LEFT JOIN torn_images ti ON t.id_torn = ti.id_torn
                WHERE u.username = :username
                GROUP BY t.id_torn";
        $stmt = $conexion->prepare($sql);
        $stmt->execute([':username' => $username]);
        $res = $stmt->fetchAll(PDO::FETCH_ASSOC);
        connect::close($conexion);

        $result = [];
        foreach ($res as $row) {
            $result[] = [
                "id_torn"           => $row["id_torn"],
                "title"             => $row["title"],
                "price"             => $row["price"],
                "start_date"        => $row["start_date"],
                "city_name"         => $row["city_name"],
                "venue_name"        => $row["venue_name"],
                "tournament_images" => !empty($row["tournament_images"]) ? explode(", ", $row["tournament_images"]) : []
            ];
        }
        return $result;
    }
}