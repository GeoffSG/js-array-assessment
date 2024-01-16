function ImagePicker(dataController, gallery) {
  const imagePickerElement = $("#image-picker");
  let fetchedImg;

  function init() {
    $("#button-image-new").on("click", (e) => {
      clearElement();
      getNewImage();
    });

    $("#button-image-save").on("click", (e) => {
      saveImage();
    });
  }

  function showError(msg) {
    $("#gallery-error").html(`${msg}`);
  }

  function hideError() {
    $("#gallery-error").html(``);
  }

  async function getNewImage() {
    imagePickerElement.addClass("loading");
    fetchedImg = await dataController.fetchImage();
    imagePickerElement.attr("src", fetchedImg);
    imagePickerElement.removeClass("loading");

  }

  function clearElement() {
    imagePickerElement.attr("src", "");
  }

  function saveImage() {
    if (!fetchedImg) {
      showError("No image fetched to save!");
    } else if (!dataController.getSelectedEmail()) {
      showError("No selected email to save to!");
    } else {
      hideError();
      const saveResult = dataController.saveImage(fetchedImg);
      if(saveResult) {
        showError(saveResult.err);
      } else {
        gallery.update();
      }

    }
  }

  return { init };
}

export default ImagePicker;
