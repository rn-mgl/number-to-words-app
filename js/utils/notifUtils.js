const notifyUser = (message) => {
  $("#notif-popup")
    .slideDown(100)
    .css({
      display: "flex",
      "align-items": "center",
      "justify-content": "center",
    })
    .html(`<p>${message}</p>`);

  setTimeout(() => {
    $("#notif-popup").slideUp(100);
  }, [5000]);
};
