<?php
/**
 * Setting up access control methods for the script.
 *
 * Tags: security, access control
 */
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");

/**
 * Database configuration parameters.
 *
 * Tags: database, configuration
 */
$db_host = "localhost";
$db_user = "root";
$db_pass = "";
$db_name = "number_to_words";

/**
 * Establishing a connection to the MySQL database.
 *
 * Tags: database, connection
 *
 * @var mysqli $conn The MySQL database connection object.
 */
$conn = new mysqli($db_host, $db_user, $db_pass, $db_name);

/**
 * Checking if the database connection was successful.
 *
 * Tags: database, connection, error handling
 */
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}
?>
