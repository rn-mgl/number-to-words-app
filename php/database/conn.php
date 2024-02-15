<?php
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");

$db_host = "localhost";
$db_user = "root";
$db_pass = "";
$db_name = "number_to_words";
$conn = new mysqli($db_host, $db_user, $db_pass, $db_name);

if (!$conn) {
    die("Connection failed: ". mysqli_connect_error());
}
?>