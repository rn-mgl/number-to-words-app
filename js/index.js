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
    $("#converter-container").fadeIn(100).css({
      display: "flex",
      "align-items": "center",
      "justify-content": "center",
    });

    $("#history-container").hide();
  });

  $("#history").on("click", function () {
    $(" #history-container").fadeIn(100).css({
      display: "flex",
      "align-items": "center",
      "justify-content": "center",
    });

    $("#converter-container").hide();

    getAllRecords();
  });

  $("#results-wrapper").on("click", "#delete", function () {
    const uuid = $(this).attr("record");
    const mappedDeleteData = { type: "delete", history_uuid: uuid };
    deleteRecord(mappedDeleteData);
  });

  getAllRecords();
});

const recordConversion = (conversionData) => {
  $.ajax({
    type: "POST",
    url: "../php/routes/history.route.php",
    data: conversionData,
    dataType: "json",
    success: function (response) {
      console.log(response);
    },
    error: function (response) {
      console.log(response);
    },
  });
};

const getAllRecords = () => {
  $.ajax({
    type: "GET",
    url: "../php/routes/history.route.php",
    dataType: "json",
    success: function (response) {
      const mappedHistory = response.history.map(function (data) {
        const dateTime = `${new Date(
          data.date_record
        ).toLocaleDateString()} | ${new Date(
          data.date_record
        ).toLocaleTimeString()}`;

        return `<div class="result-row">
                <p class="record-number-entry">
                  <span>Number Entry:</span> ${data.number_entry}
                </p>
                <p class="record-word-result">
                  <span>Converted Word:</span> ${data.word_result}
                </p>
                <p class="record-time">
                  <span>Date Recorded:</span> ${dateTime}
                </p>
                <button id="delete" record="${data.history_uuid}">Delete</button>
              </div>`;
      });

      $("#results-wrapper").html(mappedHistory);
    },
    error: function (response) {
      console.log(response);
    },
  });
};

const deleteRecord = (deleteData) => {
  $.ajax({
    type: "POST",
    url: "../php/routes/history.route.php",
    data: deleteData,
    dataType: "json",
    success: function (response) {
      console.log(response);
      getAllRecords();
    },
    error: function (response) {
      console.log(response);
      getAllRecords();
    },
  });
};
