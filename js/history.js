jQuery(function () {
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

  $("#history-row-wrapper").on("click", "#delete", function () {
    const uuid = $(this).attr("record");
    const mappedDeleteData = { type: "delete", history_uuid: uuid };
    deleteRecord(mappedDeleteData);
  });

  getAllRecords();
});
