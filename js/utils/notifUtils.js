/**
 * Displays a notification to the user with a specified message.
 *
 * Tags: notification, user feedback
 *
 * Parameters:
 * - message: string (Message to be displayed in the notification)
 *
 * Values:
 * - None
 *
 * Created by: Rein Buenaventura
 * Created on: 19th Feb, 2024
 */
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

/**
 * Displays the output of the converted word with additional action buttons.
 *
 * Tags: result display, user interface
 *
 * Parameters:
 * - wordResult: string (The converted word result to be displayed)
 * - checkUUID: string (The unique identifier for the check)
 *
 * Values:
 * - None
 *
 * Created by: Rein Buenaventura
 * Created on: 19th Feb, 2024
 */
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
