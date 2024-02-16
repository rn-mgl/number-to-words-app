<?php 
include_once("./components/header.comp.php");


if (!isset($_GET["check_rec"])) {
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
                    <p>01/01/1999</p>
                </div>
            </div>

            <div class="check-body">
                <div class="check-pay">
                    <p>PAY</p>
                    <div id="pay-line"></div>
                    <div id="digits-container">
                        DIGITS
                    </div>   
                </div>

                <div class="check-for">
                    <p>TO THE<br> ORDER OF</p>
                    <div id="order-of-line"></div>
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

<?php include_once("./components/footer.comp.php") ?>
