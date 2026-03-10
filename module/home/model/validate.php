<?php
function validate() {
    $errores = [];

    $nombre = trim($_POST['nombre_evento'] ?? '');
    //die('<script>console.log('.json_encode( $nombre ) .');</script>');
    $descripcion = trim($_POST['descripcion'] ?? '');
    $categoria = $_POST['categoria'] ?? '';
    $juego = trim($_POST['juego'] ?? '');
    $plataforma = $_POST['plataforma_juego'] ?? [];
    $precio = trim($_POST['precio'] ?? '');
    $estado = $_POST['estado'] ?? '';
    $premios = trim($_POST['premios'] ?? '');
    $fecha_inicio = $_POST['fecha_ini'] ?? '';
    $fecha_fin = $_POST['fecha_fin'] ?? '';
    $horario = trim($_POST['horario'] ?? '');
    $recinto = trim($_POST['recinto'] ?? '');
    $ubicacion = trim($_POST['ubicacion'] ?? '');
    $organizador = trim($_POST['organizador'] ?? '');
    $capacidad = trim($_POST['capacidad'] ?? '');

	if ($nombre === '' || !preg_match("/^[a-zA-Z-' ]*$/", $nombre) ) {
  		$errores['nombre_evento'] = "* El nombre es obligatorio.";
	} elseif(isset($_POST['create']) && validate_nombre($nombre)) {
        $errores['nombre_evento'] = "El nombre ya existe en la base de datos";
    }

    if ($descripcion === '') {
        $errores['desc'] = "* La descripción es obligatoria.";
    } elseif (strlen($descripcion) < 10 || strlen($descripcion) > 500) {
        $errores['descripcion'] = "* Debe tener entre 10 y 500 caracteres.";
    }

    if ($categoria === '') {
        $errores['categoria'] = "* Selecciona una categoría.";
    }
    
    if ($juego === '') {
        $errores['juego'] = "* El juego es obligatorio.";
    }
    
    if (empty($plataforma)) {
        $errores['plataforma_juego'] = "* Selecciona al menos una plataforma.";
    }
    
    if ($precio === '') {
        $errores['precio'] = "* El precio es obligatorio.";
    } elseif (!ctype_digit($precio)) {
        $errores['precio'] = "* Solo números enteros.";
    }

    if ($estado === '') {
        $errores['estado'] = "* Selecciona un estado.";
    }
   
    if ($premios === '') {
        $errores['premios'] = "* Los premios son obligatorios.";
    }
   
    if ($fecha_inicio === '') {
          $errores['fecha_ini'] = "* La fecha de inicio es obligatoria.";
    
    } else {
        $fechaObj = DateTime::createFromFormat('d/m/Y', $fecha_inicio);
        $dateErrors = DateTime::getLastErrors();
        $warnings = $dateErrors['warning_count'] ?? 0; 
        $errors   = $dateErrors['error_count']  ?? 0;

    if (!$fechaObj || $warnings > 0 || $errors > 0) {
        $errores['fecha_ini'] = "* La fecha no es válida (ej. 31/02).";
    } else {
        $hoy = new DateTime('today');
        if ($fechaObj < $hoy) {
            $errores['fecha_ini'] = "* No se permiten fechas anteriores a hoy.";
        }
    }
}   

    if ($fecha_fin === '') {
        $errores['fecha_fin'] = "* La fecha final es obligatoria.";
    } else {
        $fechaFinObj = DateTime::createFromFormat('d/m/Y', $fecha_fin);
        $dateErrorsFin = DateTime::getLastErrors();
        $warnings = $dateErrors['warning_count'] ?? 0; 
        $errors   = $dateErrors['error_count']  ?? 0;


        if (!$fechaFinObj || $warnings > 0 || $errors > 0) {
            $errores['fecha_fin'] = "La fecha no es válida.";
        } else {
            if (isset($fechaObj) && $fechaFinObj < $fechaObj) {
                $errores['fecha_fin'] = "* La fecha final debe ser posterior a la de inicio.";
            }
        }
    }

   
    if ($horario === '') {
        $errores['horario'] = "* El horario es obligatorio.";
    } elseif (!preg_match("/^(?:[01]\d|2[0-3]):[0-5]\d$/", $horario)) {
        $errores['horario'] = "* Formato no válido (HH:mm).";
    }

   

    if ($recinto === '') {
        $errores['recinto'] = "* El recinto está vacío";
    } elseif(!preg_match("/^[a-zA-Z-' ]*$/", $recinto)){
        $errores['recinto'] = "* Recinto no válido";
    }

    if ($ubicacion === '') {
        $errores['ubicacion'] = "* La ubicación está vacía";
    } elseif(!preg_match("/^[a-zA-Z-' ]*$/", $ubicacion)){
        $errores['ubicacion'] = "* Ubicación no válida";
    }

    if ($organizador === '') {
        $errores['organizador'] = "* El organizador está vacío";
    } elseif(!preg_match("/^[a-zA-Z-' ]*$/", $organizador)){
        $errores['organizador'] = "* Organizador no válido";
    }

    if ($capacidad === '' || (int)$capacidad <= 0) {
        $errores['capacidad'] = "* Capacidad debe ser mayor a 0.";
    }

    return $errores;
}



function validate_nombre($nombre, $currentEvento = ''){
    // $sql = "SELECT count(*) FROM usuario WHERE name=:nombre" . ($currentUser ? " AND user != :current" : "");
    $sql = "SELECT count(*) FROM eventos_torneos WHERE nombre_evento=:nombre";
    $conexion = connect::con();
    $stmt = $conexion->prepare($sql);
    $stmt->bindParam(':nombre', $nombre);
    // if ($currentUser) $stmt->bindParam(':current', $currentUser);
    $stmt->execute();
    $count = $stmt->fetchColumn();
    return $count > 0;
}


?>