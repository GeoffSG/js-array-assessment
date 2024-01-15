function FetchController() {


  // ------------------------------------------
  //  FETCH FUNCTIONS
  // ------------------------------------------
  function fetchData(url) {
    return fetch(url)
      .then(checkStatus)
    //   .then((res) => res.json())
      .catch((error) =>
        console.error("Looks like there was a problem ", error)
      );
  }

  async function fetchImage() {
    console.log(`Fetching image ...`);
    let fetchedImage;
    await Promise.all([
      fetchData("https://picsum.photos/200"),
    ]).then((data) => {
        console.log(`url: ${data[0].url}`);
        fetchedImage = data[0].url;
    }).catch((error) => console.log(`FETCH ERROR! ${error}`));
    console.log(`fetchedImage = ${fetchedImage}`);
    return fetchedImage;
  }


  // ------------------------------------------
  //  HELPER FUNCTIONS
  // ------------------------------------------
  function checkStatus(response) {
    if (response.ok) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(new Error(response.statusText));
    }
  }
  
  return { fetchImage };
}

export default FetchController;