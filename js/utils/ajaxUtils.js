/**
 * Records a conversion by sending the conversion data to the server.
 *
 * Tags: AJAX, data recording
 *
 * Parameters:
 * - conversionData: object (The data to be recorded, including the converted value)
 *
 * Values:
 * - None
 *
 * Created by: Rein Buenaventura
 * Created on: 19th Feb, 2024
 */
const recordConversion = (conversionData) => {
  const wordResult = conversionData["converted-value"];
  $.ajax({
    type: "POST",
    url: "../php/routes/history.route.php",
    data: conversionData,
    dataType: "json",
    success: function (response) {
      if (response.recorded) {
        displayWordOutput(wordResult, response.uuid);
        notifyUser("Conversion recorded!");
      }

      if (!response.recorded) {
        notifyUser(response.error);
      }
    },
    error: function (response) {
      console.log(response);
    },
  });
};

/**
 * Retrieves all conversion records from the server and updates the history section on the page.
 *
 * Tags: AJAX, data retrieval
 *
 * Parameters:
 * - None
 *
 * Values:
 * - None
 *
 * Created by: Rein Buenaventura
 * Created on: 19th Feb, 2024
 */
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
                  <div class="history-row-action-buttons">
                    <a id="check-link" target=_blank href="/check.php?checkUUID=${data.history_uuid}"><i class="fa-solid fa-money-check"></i></a>
                    <button id="delete-button" record="${data.history_uuid}"><i class="fa-solid fa-trash"></i></button>
                  </div>      
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

/**
 * Retrieves a single conversion record from the server based on the provided checkUUID.
 *
 * Tags: AJAX, data retrieval
 *
 * Parameters:
 * - None
 *
 * Values:
 * - None
 *
 * Created by: Rein Buenaventura
 * Created on: 19th Feb, 2024
 */
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
      $("#digits").html(data.number_entry);
      $("#check-date").html(checkDate);
    },
    error: function (data) {
      console.log(data);
    },
  });
};

/**
 * Deletes a conversion record from the server based on the provided deleteData.
 *
 * Tags: AJAX, data deletion
 *
 * Parameters:
 * - deleteData: object (The data needed for record deletion)
 *
 * Values:
 * - None
 *
 * Created by: Rein Buenaventura
 * Created on: 19th Feb, 2024
 */
const deleteRecord = (deleteData) => {
  $.ajax({
    type: "POST",
    url: "../php/routes/history.route.php",
    data: deleteData,
    dataType: "json",
    success: function (response) {
      getAllRecords();
    },
    error: function (response) {
      console.log(response);
    },
  });
};
