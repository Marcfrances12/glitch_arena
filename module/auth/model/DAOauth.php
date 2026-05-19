<?php
$path = $_SERVER['DOCUMENT_ROOT'] . '/glitch_arena/';
include($path . "model/connect.php");

class DAOauth
{

    function select_email($email) {
        $conexion = connect::con();
        $sql = "SELECT email FROM users WHERE email = :email";
        $stmt = $conexion->prepare($sql);
        $stmt->execute([':email' => $email]);
        $res = $stmt->fetch(PDO::FETCH_OBJ);
        connect::close($conexion);
        return $res;
    }

    function insert_user($username, $email, $password) {
        $hashed_pass = password_hash($password, PASSWORD_ARGON2ID, [
            'memory_cost' => 65536, 
            'time_cost'   => 4,   
            'threads'     => 3,   
        ]);
        $hashusername = hash('sha256', strtolower(trim($username))); 
        $avatar = "https://api.dicebear.com/9.x/pixel-art/svg?seed=" . urlencode($hashusername);

        $conexion = connect::con();
        $sql = "INSERT INTO `users` (`username`, `password`, `email`, `role`, `avatar`) 
                VALUES (:username, :password, :email, 'client', :avatar)";
        $stmt = $conexion->prepare($sql);
        $res = $stmt->execute([
            ':username' => $username,
            ':password' => $hashed_pass,
            ':email'    => $email,
            ':avatar'   => $avatar,
        ]);
        
        connect::close($conexion);
        return $res;
    }

    function select_user($username) {
        $conexion = connect::con();
        $sql = "SELECT `username`, `password`, `email`, `role`, `avatar` FROM `users` WHERE username = :username OR email = :email";
        $stmt = $conexion->prepare($sql);
        $stmt->execute([':username' => $username, ':email' => $username]);
        $res = $stmt->fetch(PDO::FETCH_ASSOC);
        connect::close($conexion);

        if ($res) {
            return $res;
        } else {
            return "error_user";
        }
    }

}