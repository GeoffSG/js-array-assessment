const Gallery = (dataController) => {
  const galleryContainer = $(".gallery-container");
  function init() {
    console.log(galleryContainer);
  }

  function update() {
    const galleryData = dataController.getSelectedEmail().gallery;
    galleryContainer.html(html(galleryData));
    $(".gallery-title").html(
      `<span class="icon-gallery"></span> ${dataController.getSelectedEmail().email}'s Gallery`
    );
    $(".gallery-image").on("click", (e) => {
        const img = $(e.currentTarget).children("img").attr("src");
        dataController.deleteImage(img);
        update();
    });
  }

  function html(galleryData) {
    return galleryData.map((img) => {
      return `
      <div class="gallery-image">
        <img class="image" src="${img}" alt=" ">
        <div class="image-delete"> </div>
      </div>
      `;
    });
  }

  return { init, update };
};

export default Gallery;
