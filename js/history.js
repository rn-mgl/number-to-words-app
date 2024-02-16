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
    deleteRecord(mappedDeleteData);
  });

  getAllRecords();
});
