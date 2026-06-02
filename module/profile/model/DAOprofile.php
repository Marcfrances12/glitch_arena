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

   function get_user_by_username($username) {
        $conexion = connect::con();
        $sql = "SELECT id_user, username, avatar, password FROM users WHERE username = :username";
        $stmt = $conexion->prepare($sql);
        $stmt->execute([':username' => $username]);
        $res = $stmt->fetch(PDO::FETCH_ASSOC);
        connect::close($conexion);
        return $res;
    }

    function select_data_user($username) {
        $conexion = connect::con();
        $sql = "SELECT * FROM users WHERE username = :username";
        $stmt = $conexion->prepare($sql);
        $stmt->execute([':username' => $username]);
        $res = $stmt->fetch(PDO::FETCH_OBJ);
        connect::close($conexion);
        return $res;
    }
}