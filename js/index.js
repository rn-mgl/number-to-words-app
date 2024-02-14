jQuery(function() {

     $("#check").on("submit", function(e) {
          e.preventDefault();
          const val = $("#checkValue").val();
          const numToString = val;
          const splitPlaces = numToString.split(".");
          const whole = splitPlaces[0];
          const decimal = splitPlaces[1];
          
          const valueSplit = splitNumber(whole)
          const placements = getPlacements(valueSplit)

          const convertedNum = numToWord(valueSplit, placements);

          console.log(convertedNum);
     })
})

const splitNumber = (numString) => {
     const splittedNum = [];
     let right = numString.length;
     let left = right - 3;

     if (right < 3) {
          const sub = numString.substring(0, right);
          splittedNum.push(sub)
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
}

const getPlacements = (splittedNum) => {
     const placements = [];
     let appendedval = "";
     
     for (let i = 0; i < splittedNum.length; i++) {
          appendedval = splittedNum[i] + appendedval;
          const currVal = parseInt(appendedval);
          if (currVal < 10) {
               placements.push("ones");
          } else if (currVal < 100) {
              placements.push("tens");
          } else if (currVal < 1000) {
              placements.push("hundreds");
          } else if (currVal < 1000000) {
              placements.push("thousands");
          } else if (currVal < 1000000000) {
              placements.push("millions");
          } else if (currVal < 1000000000000) {
              placements.push("billions");
          } else if (currVal < 1000000000000000) {
              placements.push("trillions");
           } 
     }
     return placements;
}

const batchConverter = (batch) => {
     let result = "";

     if (batch <= 0) {
          return result;
     } else if (batch < 10) {
          result += singleDigit[batch];
          return result
     } else if (batch < 20) {
          result += teens[batch];
          return result
     } else if (batch < 100 && batch[0] != 0) {
          result += doubleDigit[batch[0]];
          return result
     } else {
          if (batch[0] != 0) {
               result += singleDigit[batch[0]] + " hundred ";
          }
          if (batch[1] != 0) {
               result += doubleDigit[batch[1]] + " ";
          }
          if (batch[2] != 0) {
               result += singleDigit[batch[2]] + " ";
          }
     }

     return result
} 

const numToWord = (splittedNum, placements, decimal) => {
     let result = "";

     for (let i = placements.length - 1; i >= 0; i--) {
          const currNum = splittedNum[i];
          const currPlace = placements[i];

          result += batchConverter(currNum);

          if (currPlace === "trillions") {
               result += " trillion ";
          } else if (currPlace === "billions") {
               result += " billion ";
          } else if (currPlace === "millions") {
               result += " million ";
          } else if (currPlace === "thousands") {
               result += " thousand ";
          } 
     }

     return result + " pesos";
}