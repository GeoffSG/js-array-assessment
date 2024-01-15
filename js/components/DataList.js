//  Takes in the data and lists them in hmtl

const DataList = (dataController, gallery) => {
  let selectedItem;

  function html(data) {
    return data.map((data) => {
      return `<li class="list-item">${data.email}</li>`;
    });
  }

  function updateEmailStatusHTML(valid) {
    $("#email-status").html(
      `<span class="icon-${valid ? "success" : "error"}"></span>`
    );
  }

  function showError(msg) {
    $("#email-error").css("display", "block");
    $("#email-error").html(`${msg}`);
  }

  function hideError() {
    $("#email-error").css("display", "none");
    $("#email-error").html(``);
  }

  /**
   * Setup DataList Component
   */
  function init() {
    //  Search bar update event
    $(".input-text#search").on("input", (e) => {
      console.log(e.target.value);
      console.log(dataController.filter(e.target.value));
      render(html(dataController.filter(e.target.value)));
    });

    //  On click to add Email
    $(".btn-add").on("click", (e) => {
      e.preventDefault();
      const emailValue = $(".txt-email").val();
      console.log(emailValue);

      const isValid = dataController.validateEmail(emailValue);
      if (!isValid) {
        showError(
          `Incorrect format - Make sure email is all lowercase and follows the similar pattern of "example@domain.com" or "example@domain.co.uk"!`
        );
      } else {
        if (!dataController.addEmail(emailValue)) {
          showError("Email already exists!");
        } else {
          $(".txt-email").val("");
          $("#email-status").html("");
          render(html(dataController.data));
        }
      }
    });

    //  When the user types in email input box
    $(".txt-email").on("input", (e) => {
      const emailValue = $(".txt-email").val();
      const isValid = dataController.validateEmail(emailValue);
      if (!isValid) {
        showError(
          `Incorrect format - Make sure email is all lowercase and follows the similar pattern of "example@domain.com" or "example@domain.co.uk"!`
        );
      } else {
        hideError();
      }
      $(".btn-add").prop("disabled", !isValid);
      updateEmailStatusHTML(isValid);
    });

    //  Display default data into list
    render(html(dataController.data));
  }

  function render(html) {
    $(".data-list").html(html);
    $(".list-item")
      .off("click")
      .on("click", (e) => {
        e.preventDefault();
        dataController.selectEmail(e.target.textContent);
        gallery.update();
        if (!selectedItem) {
          selectedItem = $(e.target);
        } else {
          selectedItem.removeClass("selected");
          selectedItem = $(e.target);
        }
        selectedItem.addClass("selected");
      });
  }

  return { init, render };
};

export default DataList;
