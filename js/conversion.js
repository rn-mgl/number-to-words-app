jQuery(function () {
  $("#convert-form").on("submit", function (e) {
    e.preventDefault();

    // get form data
    const formData = $(this).serializeArray();
    const mappedFormData = { type: "create" };

    // map form data to object
    jQuery.map(formData, function (data) {
      mappedFormData[data.name] = data.value;
    });

    // initialize result var
    let result = "";

    // get input value and force two decimal places even on whole numbers
    const val = parseFloat(mappedFormData["cheque-value"]).toFixed(2);
    // stringify to split the whole and decimal
    const numToString = val.toString();
    const splitPlaces = numToString.split(".");
    const whole = splitPlaces[0];
    const decimal = splitPlaces[1];

    // if there is no input or it is null. return none
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

    // split whole num into batches and get the placements
    const wholeNumSplit = splitNumber(whole);
    const wholeNumPlacements = getPlacements(wholeNumSplit);

    // initialize base case on decimal
    let convertedDecimalValue = "Zero ";

    let convertedWholeNum = numToWord(wholeNumSplit, wholeNumPlacements);

    // appropriate currency syntax
    if (parseInt(whole) > 1) {
      convertedWholeNum += " Pesos";
    } else {
      convertedWholeNum += " Peso";
    }

    // append converted num to the result
    result += convertedWholeNum;

    // if input has decimal
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

    // get value and pass in the object to be recorded in the database
    mappedFormData["converted-value"] = result;
    recordConversion(mappedFormData);

    $("#notif-popup")
      .slideDown(100)
      .css({
        display: "flex",
        "align-items": "center",
        "justify-content": "center",
      })
      .html(`<p>Conversion recorded!</p>`);

    setTimeout(() => {
      $("#notif-popup").slideUp(100);
    }, [5000]);

    // display result in html
    $("#output-container")
      .html(
        ` <p id="result">${result}</p>
          <div id="view-check-link"></div>
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

    return;
  });

  // remove input and hide output display
  $("#output-container").on("click", "#clear-button", function () {
    $("#cheque-value").val("");
    $("#output-container").slideUp(100);
  });

  // copy output
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

  // change panels to conversion
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
