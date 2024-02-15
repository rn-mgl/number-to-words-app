<?php include_once("../database/conn.php") ?>

<?php

    if ($_SERVER["REQUEST_METHOD"] == "POST") {
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

            echo json_encode(["recorded" => $result ]);
        } catch (Exception $e) {
            echo json_encode(["recorded" => false ]);
            die();
        }
    }

    if ($_SERVER["REQUEST_METHOD"] == "GET") {
        try {
            $query = "SELECT * FROM history;";
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

?>