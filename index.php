<?php include_once("./components/header.comp.php") ?>

<div id="converter">

    <form action="" name="convert-form" id="convert-form">
        <p id="title">Number to Words</p>

        <input type="number" step="0.01" id="cheque-value" name="cheque-value">
        <button type="submit" id="submitForm">Convert</button>
    </form>

    <!-- <div id="blob-1" class="blob"></div> -->

    <div id="result-container">
        <p id="result">123</p>
        <button type="" id="clear-button">Clear</button>
    </div>
</div>
    
<script src="../js/index.js"></script>

<?php include_once("./components/footer.comp.php") ?>