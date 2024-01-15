function ImagePicker(fetchController) {
    const imagePickerElement = $("#image-picker");

    function init() {
        $("#button-image-new").on("click", (e) => {
            clearElement();
            getNewImage();
        });
    }

    async function getNewImage() {
        const img = await fetchController.fetchImage();
        imagePickerElement.attr("src", img);
    }

    function clearElement() {
        imagePickerElement.attr("src", "");
    }

    return { init };
}

export default ImagePicker;