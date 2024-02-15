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

      $("#history-row-wrapper").html(mappedHistory);
      $("#conversion-count").html(
        `<span>${response.history.length}</span> Conversions`
      );
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
