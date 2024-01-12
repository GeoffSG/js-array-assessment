//  Takes in the data and lists them in hmtl

const DataList = (dc, element) => {
  const html = (data) => {
    return data.map((data) => {
      return `<li class="list-item">${data.email}</li>`;
    });
  };

  const addEmail = (email) => {
    const userObject = { email: email, img: "" };
    dc.add(userObject);
  };

  const validateEmail = (email) => {
    return email.match(
      /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/
    );
    // return email !== "";
  };

  const updateEmailStatusHTML = (valid) => {
    $("#email-status").html(
      `<span class="icon-${valid ? "success" : "error"}"></span>`
    );
  };

  /**
   * Setup DataList Component
   */
  const init = () => {
    //  Search bar update event
    $(".input-text#search").on("input", (e) => {
      console.log(e.target.value);
      console.log(dc.filter(e.target.value));
      render(html(dc.filter(e.target.value)));
    });

    $(".btn-add").on("click", (e) => {
      e.preventDefault();
      console.log($(".txt-email").val());
      dc.add({ email: $(".txt-email").val() });
      $(".txt-email").val("");
      $("#email-status").html("");
      console.log(dc.data);
      render(html(dc.data));
    });

    $(".txt-email").on("input", (e) => {
      // console.log(emailStatus);
      // console.log(e.target.value);
      const isValid = validateEmail(e.target.value);
      $(".btn-add").prop("disabled", !(isValid));
      updateEmailStatusHTML(isValid);
    });

    //  Display default data into list
    element.html(html(dc.data));

    //  Item click
    $(".list-item").on("click", (e) => {
      console.log(e.target.textContent);
    });
  };

  const render = (html) => {
    element.html(html);
  };

  return { init, render };
};

export default DataList;
