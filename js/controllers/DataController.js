//  Add the fetch and data handling here

const DataController = (fetchController) => {
  const data = [
    {
      id: 0,
      email: "example@domain.com",
      gallery: [
        "https://fastly.picsum.photos/id/630/200/200.jpg?hmac=X7UBUxsi2YahTLmW0-zKMMPOALeDjY5wPZGTPaGbDhU",
      ],
    },
    {
      id: 1,
      email: "abc123@domain.com",
      gallery: [
        "https://fastly.picsum.photos/id/630/200/200.jpg?hmac=X7UBUxsi2YahTLmW0-zKMMPOALeDjY5wPZGTPaGbDhU",
        "https://fastly.picsum.photos/id/429/200/200.jpg?hmac=9FwQwE20mRBTbcAmKXOhnDdpvTgru3vSGriKkpK0kI4",
        "https://fastly.picsum.photos/id/466/200/200.jpg?hmac=VydiBydfVntkv5HY6NXsWaNXDedBW2VWNmm8MqF5Cew",
      ],
    },
  ];

  let selectedEmailData;

  function selectEmail(email) {
    selectedEmailData = getDataByEmail(email);
  }

  function getSelectedEmail() {
    return selectedEmailData;
  }

  function existsEmail(email) {
    return (
      data.filter((item) => {
        return item.email === email;
      }).length > 0
    );
  }

  function existsImage(email, img) {
    console.log(`${email}\t${img}`);
    return data.filter((em) => {
      // console.log(`Filter Image results - em: ${em.email} -- em.gallery: ${em.gallery.join(" ; ")} -- gallery.filter: ${!em.gallery.filter((i) => i === img)} -- ${em.email === email && em.gallery.filter((i) => i === img)}`);
      console.log(
        `${em.email === email} && ${
          em.gallery.filter((i) => i === img).length > 0
        } = ${
          em.email === email && em.gallery.filter((i) => i === img).length > 0
        }`
      );
      return (
        em.email === email && em.gallery.filter((i) => i === img).length > 0
      );
    });
  }

  function addEmail(newEmail) {
    const filteredData = existsEmail(newEmail);
    if (filteredData) {
      console.log(`${newEmail} exists!`);
      console.log(data);
      return false;
    } else {
      data.push({ email: newEmail, gallery: [] });
      return true;
    }
  }

  function saveImage(imgSrc) {
    if (!selectedEmailData) {
      console.log("ERROR: No email was selected!");
      return { err: "No email was selected!" };
    }
    // console.log(filterImage(selectedEmailData.email, imgSrc));
    const imageExists = existsImage(selectedEmailData.email, imgSrc);
    console.log(`imageExists: ${imageExists}`);
    if (imageExists.length > 0) {
      console.log("ERROR: Image already exists in selected email!");
      return { err: "Image already exists in selected email!" };
    } else {
      selectedEmailData.gallery.push(imgSrc);
    }
  }

  function deleteImage(img) {
    data.forEach((d) => {
      if(d.email === selectedEmailData.email) {
        d.gallery = d.gallery.filter((i) => i !== img);
      }
    });
    console.log(data);
  }

  async function fetchImage() {
    return await fetchController.fetchImage();
  }

  function getDataByEmail(email) {
    const d = data.filter((item) => {
      return item.email === email;
    });

    if (!d) {
      console.log(`Error getting data from ${email}!`);
    } else {
      return d[0];
    }
    return null;
  }

  function getGallery(email) {
    const galData = getDataByEmail(email);
    if (!galData) {
      console.log(`ERROR: cannot not find Gallery with the email: ${email}`);
    } else {
      return galData.gallery;
    }
    return null;
  }

  function validateEmail(email) {
    return email.match(
      /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/
    );
    // return email !== "";
  }

  return {
    addEmail,
    filter: existsEmail,
    data,
    getDataByEmail,
    getGallery,
    fetchImage,
    saveImage,
    selectEmail,
    getSelectedEmail,
    validateEmail,
    deleteImage,
  };
};

export default DataController;
