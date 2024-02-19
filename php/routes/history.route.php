<?php include_once("../database/conn.php") ?>

<?php
/**
 * Handling POST and GET requests for recording, deleting, and retrieving history entries.
 *
 * Tags: CRUD operations, database interaction
 */
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if ($_POST["type"] == "create") {
        if (!isset($_POST["cheque-value"])) {
            echo json_encode(["recorded" => false ]);
            die();
        }

        $chequeNumber = $_POST["cheque-value"];
        $convertedNumber = $_POST["converted-value"];
        $historyUUID = bin2hex(openssl_random_pseudo_bytes(25));

        if (!is_numeric($chequeNumber) || is_nan($chequeNumber) || is_null($chequeNumber)) {
            echo json_encode(["recorded" => false, "error" => "Invalid input type"]);
            die();
        }

        try {
            // Inserting a new history entry into the database.
            $query = "INSERT INTO history (history_uuid, number_entry, word_result)
                    VALUES (?, ?, ?);";
            $stmt = $conn->prepare($query);
            $stmt->bind_param("sss", $historyUUID, $chequeNumber, $convertedNumber);
            $result = $stmt->execute();

            echo json_encode(["recorded" => $result, "uuid" => $historyUUID]);
        } catch (Exception $e) {
            echo json_encode(["recorded" => false, "error" => "Error in recording your input."]);
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
            // Updating the 'is_deleted' flag to mark a history entry as deleted.
            $query = "UPDATE history SET is_deleted = ? WHERE history_uuid = ?;";
            $stmt = $conn->prepare($query);
            $isDeleted = 1;
            $stmt->bind_param("is", $isDeleted, $history_uuid);
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
            // Retrieving all non-deleted history entries from the database.
            $query = "SELECT * FROM history WHERE is_deleted = ? ORDER BY date_record DESC;";
            $stmt = $conn->prepare($query);
            $isDeleted = 0;
            $stmt->bind_param("i", $isDeleted);
            $result = $stmt->execute();

            if (!$result) {
                die("Error executing query: " . $stmt->error);
            }

            $stmt->bind_result($history_id, $history_uuid, $number_entry, $word_result, $date_record, $is_deleted);

            $history = [];

            while ($stmt->fetch()) {
                $history[] = [
                    "history_id" => $history_id,
                    "history_uuid" => $history_uuid,
                    "number_entry" => $number_entry,
                    "word_result" => $word_result,
                    "date_record" => $date_record,
                    "is_deleted" => $is_deleted,
                ];
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
            // Retrieving a single history entry based on its UUID.
            $query = "SELECT * FROM history WHERE history_uuid = ?;";
            $stmt = $conn->prepare($query);
            $stmt->bind_param("s", $uuid);
            $result = $stmt->execute();

            if (!$result) {
                die("Error in getting check" . $stmt->error);
            }

            $stmt->bind_result($history_id, $history_uuid, $number_entry, $word_result, $date_record, $is_deleted);

            if ($stmt->fetch()) {
                $row = [
                    "history_id" => $history_id,
                    "history_uuid" => $history_uuid,
                    "number_entry" => $number_entry,
                    "word_result" => $word_result,
                    "date_record" => $date_record,
                    "is_deleted" => $is_deleted,
                ];
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
