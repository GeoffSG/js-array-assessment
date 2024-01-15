//  Takes in the data and lists them in hmtl

const DataList = (dc, element) => {
  function html(data) {
    return data.map((data) => {
      return `<li class="list-item">${data.email}</li>`;
    });
  };

  function addEmail(email) {
    const userObject = { email: email, img: "" };
    dc.add(userObject);
  };

  function validateEmail(email) {
    return email.match(
      /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/
    );
    // return email !== "";
  };

  function updateEmailStatusHTML(valid) {
    $("#email-status").html(
      `<span class="icon-${valid ? "success" : "error"}"></span>`
    );
  };

  /**
   * Setup DataList Component
   */
  function init() {
    //  Search bar update event
    $(".input-text#search").on("input", (e) => {
      console.log(e.target.value);
      console.log(dc.filter(e.target.value));
      render(html(dc.filter(e.target.value)));
    });

    //  On click to add Email
    $(".btn-add").on("click", (e) => {
      e.preventDefault();
      const emailValue = $(".txt-email").val();
      console.log(emailValue);
      
      if(validateEmail(emailValue))
        addEmail(emailValue);
      else 
        console.log(`Error invalid email: ${emailValue}`);
      $(".txt-email").val("");
      $("#email-status").html("");
      console.log(dc.data);
      render(html(dc.data));
    });

    //  When the user types in email input box
    $(".txt-email").on("input", (e) => {
      const isValid = validateEmail(e.target.value);
      $(".btn-add").prop("disabled", !(isValid));
      updateEmailStatusHTML(isValid);
    });

    //  Display default data into list
    render(html(dc.data))
  };

  function render(html) {
    element.html(html);
    $(".list-item").on("click", (e) => {
      console.log(e.target.textContent);
    });
  };

  return { init, render };
};

export default DataList;
