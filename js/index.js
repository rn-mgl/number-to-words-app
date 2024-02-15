jQuery(function () {
  console.log(1);
  $("#convert-form").on("submit", function (e) {
    e.preventDefault();

    const formData = $(this).serializeArray();
    const mappedFormData = {};

    jQuery.map(formData, function (data) {
      mappedFormData[data.name] = data.value;
    });

    let result = "";
    const val = parseFloat(mappedFormData["cheque-value"]).toFixed(2);
    const numToString = val.toString();
    const splitPlaces = numToString.split(".");
    const whole = splitPlaces[0];
    const decimal = splitPlaces[1];

    if (val < 0) {
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

    let convertedDecimalValue = "zero ";

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

    $("#result-container")
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

  $("#result-container").on("click", "#clear-button", function () {
    $("#cheque-value").val("");
    $("#result-container").slideUp(100);
  });

  $("#result-container").on("click", "#copy-button", function () {
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

    $("#results-container").hide();
  });

  $("#history").on("click", function () {
    $(" #results-container").fadeIn(100).css({
      display: "flex",
      "align-items": "center",
      "justify-content": "center",
    });

    $("#converter-container").hide();
  });

  getAllRecords();
});

const splitNumber = (numString) => {
  const splittedNum = [];
  let right = numString.length;
  let left = right - 3;

  if (right < 3) {
    const sub = numString.substring(0, right);
    splittedNum.push(sub);
    return splittedNum;
  }

  while (left >= 0) {
    const sub = numString.substring(left, right);
    splittedNum.push(sub);

    if (left < 3 && left != 0) {
      const lastLeft = numString.substring(0, left);
      splittedNum.push(lastLeft);
      return splittedNum;
    }
    left -= 3;
    right -= 3;
  }
  return splittedNum;
};

const getPlacements = (splittedNum) => {
  const placements = [];
  let appendedval = "";

  for (let i = 0; i < splittedNum.length; i++) {
    appendedval = splittedNum[i] + appendedval;
    const currVal = parseInt(appendedval);
    if (currVal < 10) {
      placements.push("one");
    } else if (currVal < 100) {
      placements.push("ten");
    } else if (currVal < 1000) {
      placements.push("hundred");
    } else if (currVal < 1000000) {
      placements.push("thousand");
    } else if (currVal < 1000000000) {
      placements.push("million");
    } else if (currVal < 1000000000000) {
      placements.push("billion");
    } else if (currVal < 1000000000000000) {
      placements.push("trillion");
    }
  }
  return placements;
};

const batchConverter = (batch) => {
  let result = "";

  const intBatch = parseInt(batch);

  if (intBatch <= 0) {
    return result;
  }

  if (intBatch > 0 && intBatch < 10) {
    result += " " + singleDigit[intBatch];
  } else if (intBatch > 9 && intBatch < 20) {
    result += " " + teens[intBatch];
  } else if (intBatch > 19 && intBatch < 100) {
    // 023 cases
    const secondDigit = Math.floor(intBatch / 10);
    result += " " + doubleDigit[secondDigit];
    if (parseInt(batch[1])) {
      // 023 cases
      const lastDigit = intBatch % 10;
      result += "-" + singleDigit[lastDigit];
    }
  } else if (intBatch > 99) {
    const hundreds = batch[0];
    const tens = batch[1];
    const ones = batch[2];
    const candidateTeens = parseInt(tens + ones);

    // check for batches with 0 in the beginning -> "024"
    if (parseInt(hundreds)) {
      result += singleDigit[batch[0]] + " Hundred ";
    }

    if (candidateTeens > 0 && candidateTeens < 10) {
      result += " " + singleDigit[candidateTeens];
    } else if (candidateTeens > 9 && candidateTeens < 20) {
      result += " " + teens[candidateTeens];
    } else if (candidateTeens > 19) {
      result += " " + doubleDigit[tens];
      if (parseInt(ones)) {
        result += "-" + singleDigit[ones];
      }
    }
  }

  return result;
};

const numToWord = (splittedNum, placements) => {
  let result = "";

  for (let i = placements.length - 1; i >= 0; i--) {
    const currNum = splittedNum[i];
    const currPlace = placements[i];

    result += batchConverter(currNum);

    if (currPlace === "trillion") {
      result += " Trillion ";
    } else if (currPlace === "billion") {
      result += " Billion ";
    } else if (currPlace === "million") {
      result += " Million ";
    } else if (currPlace === "thousand") {
      result += " Thousand ";
    }
  }

  return result ? result : "zero ";
};

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
      console.log(response);
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
              </div>`;
      });

      $("#results-wrapper").html(mappedHistory);
    },
    error: function (response) {
      console.log(response);
    },
  });
};
