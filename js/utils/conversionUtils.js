// to split number from "123456789" to ["789", "456", "123"]
const splitNumber = (numString) => {
  const splittedNum = [];
  // pointers to act as window for sliding window algo
  // start from right to get proper substring of number format 234 56 != 23 456
  let right = numString.length;
  let left = right - 3;

  // if the numString is < 100 eg 99 will just return ["99"]
  if (right < 3) {
    const sub = numString.substring(0, right);
    splittedNum.push(sub);
    return splittedNum;
  }

  // run main logic
  while (left >= 0) {
    // get 123 from 123456789
    const sub = numString.substring(left, right);
    splittedNum.push(sub);

    // to check for windows that will go out of bounds when subtracted to 3
    // eg 12345 where curr window is 345. subtracting 3 to left will return -1 to left
    // the window will be -1 to 1 which is an error
    if (left < 3 && left != 0) {
      // get from the first character to the left because left is the closes to the beginning number
      const lastLeft = numString.substring(0, left);
      splittedNum.push(lastLeft);
      return splittedNum;
    }

    // move the window
    left -= 3;
    right -= 3;
  }
  return splittedNum;
};

// to assign the placement of the split number elements
const getPlacements = (splittedNum) => {
  const placements = [];
  let appendedval = "";

  for (let i = 0; i < splittedNum.length; i++) {
    // += does not work because the splittedNum is in reverse order ["456", "123"]
    // get curr val first then append to appendedval
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

// pass batch ["213"] -> 213 -> two hundred thirteen
const batchConverter = (batch) => {
  let result = "";

  // turn to int to eliminate 0 base case
  const intBatch = parseInt(batch);

  if (intBatch <= 0) {
    return result;
  }

  // if 1 to 9
  if (intBatch > 0 && intBatch < 10) {
    result += " " + singleDigit[intBatch];
  }
  // if 10 to 19
  else if (intBatch > 9 && intBatch < 20) {
    result += " " + teens[intBatch];
  }
  // if 20 to 99
  else if (intBatch > 19 && intBatch < 100) {
    const secondDigit = Math.floor(intBatch / 10);
    const lastDigit = intBatch % 10;
    result += " " + doubleDigit[secondDigit];
    if (lastDigit) {
      result += "-" + singleDigit[lastDigit];
    }
  }
  // if 100 above
  else if (intBatch > 99) {
    const hundreds = batch[0];
    const tens = batch[1];
    const ones = batch[2];
    const candidateTeens = parseInt(tens + ones);

    // check for batches with 0 in the beginning -> "024"
    if (parseInt(hundreds)) {
      result += singleDigit[batch[0]] + " Hundred";
    }

    // if 1 to 9
    if (candidateTeens > 0 && candidateTeens < 10) {
      result += " " + singleDigit[candidateTeens];
    }
    // if 10 to 19
    else if (candidateTeens > 9 && candidateTeens < 20) {
      result += " " + teens[candidateTeens];
    }
    // if 19 above
    else if (candidateTeens > 19) {
      result += " " + doubleDigit[tens];
      if (parseInt(ones)) {
        result += "-" + singleDigit[ones];
      }
    }
  }

  return result;
};

// convert word
const numToWord = (splittedNum, placements) => {
  let result = "";

  for (let i = placements.length - 1; i >= 0; i--) {
    // get curr batch ["123", "435"] -> 435
    const currNum = splittedNum[i];
    // get placement similar to curr batch
    const currPlace = placements[i];

    // return converted batch
    result += batchConverter(currNum);

    // assign placement
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
