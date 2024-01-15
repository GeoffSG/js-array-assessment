//  Add the fetch and data handling here

const DataController = (fetchController) => {
  const data = [
    {
      email: "example@domain.com",
      gallery: [
        "https://fastly.picsum.photos/id/630/200/200.jpg?hmac=X7UBUxsi2YahTLmW0-zKMMPOALeDjY5wPZGTPaGbDhU",
      ],
    },
    {
      email: "abc123@domain.com",
      gallery: [
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

  function filter(criteria) {
    return data.filter((item) => {
      return item.email.toLowerCase().includes(criteria.toLowerCase());
    });
  }

  function addEmail(newEmail) {
    const filteredData = filter(newEmail);
    if(filteredData.length > 0) {
      console.log(`${newEmail} exists!`);
      console.log(data);
      return false;
    } else {
      data.push({email: newEmail, gallery: [""]});
      return true;
    }
  }

  function saveImage(imgSrc) {
    if (!selectedEmailData) {
      console.log("ERROR: No email was selected!");
      return;
    }
    selectedEmailData.gallery.push(imgSrc);
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
  };

  return {
    addEmail,
    filter,
    data,
    getDataByEmail,
    getGallery,
    fetchImage,
    saveImage,
    selectEmail,
    getSelectedEmail,
    validateEmail,
  };
};

export default DataController;
