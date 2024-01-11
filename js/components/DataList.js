const DataList = (element) => {

  const inner = () => {
    console.log(element);
  };

  return { inner };
};

export default DataList;
