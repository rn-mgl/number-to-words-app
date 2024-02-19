// pop up notif
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

// display output of converted word
const displayWordOutput = (wordResult, checkUUID) => {
  $("#output-container")
    .html(
      ` <p id="result">${wordResult}</p>
      <div id="view-check-link"></div>
      <div id="result-action-buttons">
        <button id="copy-button" content="${wordResult}"><i class="fa-solid fa-copy"></i></button>
        <button id="clear-button"><i class="fa-solid fa-eraser"></i></button>
      </div>`
    )
    .slideDown(100)
    .css({
      display: "flex",
      "align-items": "center",
      "justify-content": "center",
    });

  $("#view-check-link").html(
    `<a href="/check.php?checkUUID=${checkUUID}" id="view-check-link" target=_blank>
        View Check <i class="fa-solid fa-arrow-right"></i>
      </a>`
  );
};
