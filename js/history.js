/**
 * Initializes the functionality for handling history panels in the application.
 *
 * Tags: jQuery, event handling, DOM manipulation
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
jQuery(function () {
  //change panels to history
  $("#history").on("click", function () {
    $(this).css({ background: "#faf8ff", color: "black" });
    $("#convert").css({ background: "none", color: "#faf8ff" });

    $("#history-container").fadeIn(100).css({
      display: "flex",
      "align-items": "center",
      "justify-content": "center",
    });

    $("#converter-container").hide();

    getAllRecords();
  });

  // delete record
  $("#history-row-wrapper").on("click", "#delete-button", function () {
    const uuid = $(this).attr("record");
    const mappedDeleteData = { type: "delete", history_uuid: uuid };
    $("#delete-form-container").fadeIn(100).css({
      display: "flex",
      "align-items": "center",
      "justify-content": "center",
    });

    function confirmDelete() {
      deleteRecord(mappedDeleteData);
      $("#delete-form-container").fadeOut(100);
      $("#confirm-delete-button").off("click", confirmDelete);
    }

    $("#confirm-delete-button").on("click", confirmDelete);
  });

  //cancel delete
  $("#cancel-button").on("click", function () {
    $("#delete-form-container").fadeOut(100);
  });

  getAllRecords();
});
