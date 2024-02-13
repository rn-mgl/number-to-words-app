jQuery(function() {

     $("#check").on("submit", function(e) {
          e.preventDefault();
          const val = $("#checkValue").val();
          const numToString = val;
          const splitPlaces = numToString.split(".");
          const whole = splitPlaces[0];
          const decimal = splitPlaces[1];

          console.log(whole);
          console.log(decimal);
          
          const valueSplit = splitNumber(numToString).reverse();

          console.log(valueSplit);

     })
})

// get 3 digits from right to left
// 123456789 -> 123 456 789, 1234567 -> 1 234 567, 12345 -> 12 345

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

          if (left - 3 < 0) {
               const lastLeft = numString.substring(0, left);
               splittedNum.push(lastLeft);
               return splittedNum;
          }
          left -= 3;
          right -= 3;
     }
     return splittedNum;
}
