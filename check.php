<?php 
include_once("./components/header.comp.php");
if (!isset($_GET["checkUUID"])) {
    header("Location: /");
}
 ?>

<div id="check-page">

    <div id="check-container">

        <div id="check">

            <div class="check-header">
                <div class="company-info-container">
                    <p>NAME SURNAME: </p>
                    <p>ADDRESS: </p>
                    <p>REF: </p>
                </div>

                <div class="check-date">
                    <p>DATE </p>
                    <p id="check-date">01/01/1999</p>
                </div>
            </div>

            <div class="check-body">
                <div class="check-pay">
                    <p>PAY TO THE ORDER OF</p>
                    <div id="order-of-line"></div>
                    <div id="digits-container">
                        <p id="peso-sign">P</p> <p id="digits"></p>
                    </div>   
                </div>

                <div class="check-for">
                    <div id="pay-line"></div>
                </div>
            </div>

            <div class="check-footer">
                <div class="check-bank">
                    <p id="bank-name">My Bank</p>
                    <div id="rr"><p>RR</p> <div id="rr-line"></div></div>
                    <p id="bank-code">| 0000000000 | 0000000 0000</p>
                </div>

                <div class="signature">
                    <p>Payer's Signature</p>
                    <div id="signature-field"></div>
                </div>
            </div>

    </div>

</div>
<script src="./js/check.js"></script>

<?php include_once("./components/footer.comp.php") ?>
