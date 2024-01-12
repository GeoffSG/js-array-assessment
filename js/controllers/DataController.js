//  Add the fetch and data handling here

const DataController = (url) => {
  const data = [
    {
      email: "example@domain.com",
      img: "",
    },
    {
      email: "eg1@domain.com",
      img: "",
    },
    {
      email: "example123@domain.com",
      img: "",
    },
    {
      email: "gg@abc.co.uk",
      img: "",
    },
    {
      email: "hacker@basement.com",
      img: "",
    },
  ];

  const filter = (criteria) => {
    return data.filter((item) => {
      return item.email.toLowerCase().includes(criteria.toLowerCase());
    });
  };

  const add = (newData) => {
    data.push(newData);
  };

  return { add, filter, data };
};

export default DataController;
