/**
 * Splits a number represented as a string into batches of three digits each.
 *
 * Tags: number manipulation, string manipulation
 *
 * Parameters:
 * - numString: string (The input number as a string to be split)
 *
 * Values:
 * - Returns an array of string batches representing the split number.
 *
 * Created by: Rein Buenaventura
 * Created on: 19th Feb, 2024
 */
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

/**
 * Determines the placement of each element in the split number for conversion.
 *
 * Tags: number manipulation, array manipulation
 *
 * Parameters:
 * - splittedNum: array (The array of string batches representing the split number)
 *
 * Values:
 * - Returns an array of placement strings for each element in the split number.
 *
 * Created by: Rein Buenaventura
 * Created on: 19th Feb, 2024
 */
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

/**
 * Converts a batch of three digits into words.
 *
 * Tags: number conversion, word conversion
 *
 * Parameters:
 * - batch: string (A batch of three digits to be converted)
 *
 * Values:
 * - Returns a string representing the converted word for the input batch.
 *
 * Created by: Rein Buenaventura
 * Created on: 19th Feb, 2024
 */
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
    const secondDigit = Math.floor(intBatch / 10);
    const lastDigit = intBatch % 10;
    result += " " + doubleDigit[secondDigit];
    if (lastDigit) {
      result += "-" + singleDigit[lastDigit];
    }
  } else if (intBatch > 99) {
    const hundreds = batch[0];
    const tens = batch[1];
    const ones = batch[2];
    const candidateTeens = parseInt(tens + ones);

    if (parseInt(hundreds)) {
      result += singleDigit[batch[0]] + " Hundred";
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

/**
 * Converts a split number represented as batches into its word equivalent.
 *
 * Tags: number conversion, word conversion
 *
 * Parameters:
 * - splittedNum: array (The array of string batches representing the split number)
 * - placements: array (The array of placement strings for each element in the split number)
 *
 * Values:
 * - Returns a string representing the word equivalent of the input split number.
 *
 * Created by: Rein Buenaventura
 * Created on: 19th Feb, 2024
 */
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

  return result ? result : "Zero ";
};
