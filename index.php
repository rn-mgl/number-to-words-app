<?php include_once("./components/header.comp.php") ?>

<div id="converter">

    <div id="notif-popup">
    </div>

    <div id="converter-action-buttons">
        <button id="convert">Convert</button>
        <button id="history">History</button>
    </div>
    

    <div id="converter-container" class="container">

        <p class="title">Number to Words </p>

        <form action="" name="convert-form" id="convert-form">

            <input type="number" step="0.01" id="cheque-value" name="cheque-value" required>
            <button type="submit" id="submitForm">Convert</button>
        </form>

        <div id="output-container"></div>

    </div>

    <div id="history-container" class="container">
        <div id="history-title-container">
            <p class="title">History</p>
            <p id="conversion-count"></p>
        </div>
        
        <div id="history-row-wrapper"></div>
    </div>
</div>
    

<script src="./js/conversion.js"></script>
<script src="./js/history.js"></script>


<?php include_once("./components/footer.comp.php") ?>