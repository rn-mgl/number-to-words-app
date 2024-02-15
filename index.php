<?php include_once("./components/header.comp.php") ?>

<div id="converter">

    <div id="notif-popup">
        <p>1</p>
    </div>

    <div id="converter-action-buttons">
        <button id="convert">Convert</button>
        <button id="history">History</button>
    </div>
    

    <div id="converter-container" class="container">

        <p id="title">Number to Words</p>

        <form action="" name="convert-form" id="convert-form">

            <input type="number" step="0.01" id="cheque-value" name="cheque-value" required>
            <button type="submit" id="submitForm">Convert</button>
        </form>

        <div id="result-container"></div>

    </div>

    <div id="results-container" class="container">
        <p id="title">History</p>
        <div id="results-wrapper"></div>
    </div>
</div>
    
<script src="../js/index.js"></script>

<?php include_once("./components/footer.comp.php") ?>