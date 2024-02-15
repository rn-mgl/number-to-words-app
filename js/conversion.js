jQuery(function () {
  $("#convert-form").on("submit", function (e) {
    e.preventDefault();

    const formData = $(this).serializeArray();
    const mappedFormData = { type: "create" };

    jQuery.map(formData, function (data) {
      mappedFormData[data.name] = data.value;
    });

    let result = "";
    const val = parseFloat(mappedFormData["cheque-value"]).toFixed(2);
    const numToString = val.toString();
    const splitPlaces = numToString.split(".");
    const whole = splitPlaces[0];
    const decimal = splitPlaces[1];

    if (!val || val < 0) {
      $("#result")
        .html(
          `<p id="result">${result}</p>
            <div id="result-action-buttons">
              <button id="copy-button" content="${result}">Copy</button>
              <button id="clear-button">Clear</button>
            </div>`
        )
        .slideDown(100)
        .css({
          display: "flex",
          "align-items": "center",
          "justify-content": "center",
        });
      return;
    }

    const wholeNumSplit = splitNumber(whole);
    const wholeNumPlacements = getPlacements(wholeNumSplit);

    let convertedDecimalValue = "Zero ";

    let convertedWholeNum = numToWord(wholeNumSplit, wholeNumPlacements);

    if (parseInt(whole) > 1) {
      convertedWholeNum += " Pesos";
    } else {
      convertedWholeNum += " Peso";
    }

    result += convertedWholeNum;

    if (decimal && parseInt(decimal)) {
      const decimalNumSplit = splitNumber(decimal);
      const decimalNumPlacements = getPlacements(decimalNumSplit);
      convertedDecimalValue = numToWord(decimalNumSplit, decimalNumPlacements);
      if (parseInt(decimal) > 1) {
        convertedDecimalValue += " Cents";
      } else {
        convertedDecimalValue += " Cent";
      }
      result += " and " + convertedDecimalValue;
    }

    $("#output-container")
      .html(
        `<p id="result">${result}</p>
            <div id="result-action-buttons">
              <button id="copy-button" content="${result}"><i class="fa-solid fa-copy"></i></button>
              <button id="clear-button"><i class="fa-solid fa-eraser"></i></button>
            </div>`
      )
      .slideDown(100)
      .css({
        display: "flex",
        "align-items": "center",
        "justify-content": "center",
      });

    mappedFormData["converted-value"] = result;
    recordConversion(mappedFormData);
    return;
  });

  $("#output-container").on("click", "#clear-button", function () {
    $("#cheque-value").val("");
    $("#output-container").slideUp(100);
  });

  $("#output-container").on("click", "#copy-button", function () {
    const content = $(this).attr("content");
    navigator.clipboard.writeText(content);
    $("#notif-popup")
      .slideDown(100)
      .css({
        display: "flex",
        "align-items": "center",
        "justify-content": "center",
      })
      .html(`<p>Text copied!</p>`);

    setTimeout(() => {
      $("#notif-popup").slideUp(100);
    }, [5000]);
  });

  $("#convert").on("click", function () {
    $(this).css({ background: "#faf8ff", color: "black" });
    $("#history").css({ background: "none", color: "#faf8ff" });

    $("#converter-container").fadeIn(100).css({
      display: "flex",
      "align-items": "center",
      "justify-content": "center",
    });

    $("#history-container").hide();
  });
});
