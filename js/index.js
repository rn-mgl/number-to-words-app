const resultContainer = document.getElementById("result-container");
const resultTag = document.getElementById("result");
const clearButton = document.getElementById("clear-button");
const chequeValue = document.getElementById("cheque-value");

jQuery(function () {
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
      $("#result").html(`<p id="result">${result}</p>
      <button id="clear-button">Clear</button>`);
      return;
    }

    const wholeNumSplit = splitNumber(whole);
    const wholeNumPlacements = getPlacements(wholeNumSplit);

    let convertedDecimalValue = "zero ";

    let convertedWholeNum = numToWord(wholeNumSplit, wholeNumPlacements);

    if (parseInt(whole) > 1) {
      convertedWholeNum += " pesos";
    } else {
      convertedWholeNum += " peso";
    }

    result += convertedWholeNum;

    if (decimal && parseInt(decimal)) {
      const decimalNumSplit = splitNumber(decimal);
      const decimalNumPlacements = getPlacements(decimalNumSplit);
      convertedDecimalValue = numToWord(decimalNumSplit, decimalNumPlacements);
      if (parseInt(decimal) > 1) {
        convertedDecimalValue += "cents";
      } else {
        convertedDecimalValue += "cent";
      }
      result += " and " + convertedDecimalValue;
    }

    $("#result-container")
      .html(
        `<p id="result">${result}</p>
          <button id="clear-button">Clear</button>`
      )
      .slideDown(100)
      .css({
        display: "flex",
        "align-items": "center",
        "justify-content": "center",
      });
    return;
  });

  $("#result-container").on("click", "#clear-button", function () {
    $("#cheque-value").val("");
    $("#result-container").slideUp(100);
  });
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
      result += singleDigit[batch[0]] + " hundred ";
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
      result += " trillion ";
    } else if (currPlace === "billion") {
      result += " billion ";
    } else if (currPlace === "million") {
      result += " million ";
    } else if (currPlace === "thousand") {
      result += " thousand ";
    }
  }

  return result ? result : "zero ";
};
