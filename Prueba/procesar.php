<?php
// Conexión a la base de datos (ajusta estos valores según tu configuración)
$conexion = mysqli_connect(
    "sql109.infinityfree.com",      //HOST
    "if0_35595274",                //USER
    "nKnDazPDCr",                 //PASSWORD
    "if0_35595274_db_img"        //BD
);

if (!$conexion) {
    die("Error de conexión: " . mysqli_connect_error());
}

// Verificar si se ha enviado un archivo
if ($_FILES["archivo"]["error"] > 0) {
    echo "Error: " . $_FILES["archivo"]["error"];
} else {
    // Obtener información del archivo
    $nombre = $_FILES["archivo"]["name"];
    $rutaTemporal = $_FILES["archivo"]["tmp_name"];
    
    // Mover el archivo al directorio deseado (ajusta la ruta según tu configuración)
    $directorioDestino = "./img/";
    $rutaDestino = $directorioDestino . $nombre;
    move_uploaded_file($rutaTemporal, $rutaDestino);
    
    // Guardar la información en la base de datos
    $query = "INSERT INTO imagenes (nombre, ruta) VALUES ('$nombre', '$rutaDestino')";
    
    if (mysqli_query($conexion, $query)) {
        echo "Imagen subida y registro en la base de datos exitoso.";
    } else {
        echo "Error al subir imagen: " . mysqli_error($conexion);
    }
}

// Cerrar conexión
mysqli_close($conexion);
?>
