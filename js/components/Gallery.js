const Gallery = (dataController) => {
    const galleryContainer = $(".gallery-container");
    function init() {
        console.log(galleryContainer);
    }

    function update() {
        const galleryData = dataController.getSelectedEmail().gallery;
        galleryContainer.html(html(galleryData));
    }

    function html(galleryData) {
        return galleryData.map((img) => {
            return `<img class="image" src="${img}" alt=" ">`;
        });
    }

    return { init, update };
}

export default Gallery;