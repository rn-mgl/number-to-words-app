// will record the conversion input, words result
const recordConversion = (conversionData) => {
  let uuid = "";
  $.ajax({
    type: "POST",
    url: "../php/routes/history.route.php",
    data: conversionData,
    dataType: "json",
    success: function (response) {
      console.log(response);
      if (response.recorded) {
        $("#view-check-link").html(
          `<a href="/check.php?checkUUID=${response.uuid}" id="view-check-link" target=_blank>
            View Check <i class="fa-solid fa-arrow-right"></i>
          </a>`
        );
      }
    },
    error: function (response) {
      console.log(response);
    },
  });

  console.log(uuid);

  return uuid;
};

// will get all the records from the database
const getAllRecords = () => {
  $.ajax({
    type: "GET",
    url: "../php/routes/history.route.php",
    data: { type: "all" },
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
                  <button id="delete-button" record="${data.history_uuid}"><i class="fa-solid fa-trash"></i></button>
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

const getRecord = () => {
  const params = new URLSearchParams(window.location.search);

  const checkUUID = params.get("checkUUID");

  $.ajax({
    type: "GET",
    url: "../php/routes/history.route.php",
    data: { historyUUID: checkUUID, type: "single" },
    dataType: "json",
    success: function (data) {
      const checkDate = new Date(data.date_record).toLocaleDateString();
      $("#pay-line").html(data.word_result);
      $("#digits-container").html(data.number_entry);
      $("#check-date").html(checkDate);
    },
    error: function (data) {
      console.log(data);
    },
  });
};

// will delete the record
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
