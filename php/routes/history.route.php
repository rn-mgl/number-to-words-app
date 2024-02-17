<?php include_once("../database/conn.php") ?>

<?php

    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        if ($_POST["type"] == "create") {
            if (!isset($_POST["cheque-value"])) {
                echo json_encode(["recorded" => false ]);
                die();
            }
    
            $chequeNumber = $_POST["cheque-value"];
            $convertedNumber = $_POST["converted-value"];
            $historyUUID = bin2hex(openssl_random_pseudo_bytes(25));
    
            try {
                $query = "INSERT INTO history (history_uuid, number_entry, word_result)
                        VALUES (?, ?, ?);";
                $stmt = $conn->prepare($query);
                $stmt->bind_param("sss", $historyUUID, $chequeNumber, $convertedNumber);
                $result = $stmt->execute();
    
                echo json_encode(array("recorded" => $result, "uuid" => $historyUUID));
            } catch (Exception $e) {
                echo json_encode(["recorded" => false ]);
                die();
            }
        }

        if ($_POST["type"] == "delete") {
            if (!isset($_POST["history_uuid"])) {
                echo json_encode(["deleted" => false ]);
                die();
            }

            $history_uuid = $_POST["history_uuid"];

            try {
                $query = "DELETE FROM history WHERE history_uuid = ?;";
                $stmt = $conn->prepare($query);
                $stmt->bind_param("s", $history_uuid);
                $result = $stmt->execute();

                echo json_encode(["deleted" => $result ]);
            } catch (Exception $e) {
                echo json_encode(["deleted" => false ]);
                die();
            }
        }
        
    }

    if ($_SERVER["REQUEST_METHOD"] == "GET") {
        if ($_GET["type"] == "all") {
            try {
                $query = "SELECT * FROM history ORDER BY date_record DESC;";
                $result = $conn->query($query);
    
                $history = [];
    
                while ($row = $result->fetch_assoc()) {
                    $history[] = $row;
                }
                
                echo json_encode(["history" => $history ]);
            } catch (Exception $e) {
                echo json_encode(["history" => false ]);
                die();
            }
        }

        if ($_GET["type"] == "single") {

            if (!isset($_GET["historyUUID"])) {
                echo json_encode(["data" => false]);
            }

            $uuid = $_GET["historyUUID"];

            try {
                $query = "SELECT * FROM history WHERE history_uuid = ?;";
                $stmt = $conn->prepare($query);
                $stmt->bind_param("s",$uuid );
                $stmt->execute();
                $result = $stmt->get_result();

                if ($result->num_rows > 0) {
                    $row = $result->fetch_assoc();
                    echo json_encode($row);
                } else {
                    echo json_encode(array());
                }
            } catch (Exception $e) {
                echo json_encode(["history" => false ]);
                die();
            }
        }
        
    }

?>