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
  }

  function html(galleryData) {
    return galleryData.map((img) => {
      return `<img class="image" src="${img}" alt=" ">`;
    });
  }

  return { init, update };
};

export default Gallery;
