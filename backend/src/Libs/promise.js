const createPromiseAll = (items = []) =>
  Promise.all(items)
    .then((message) => {
      return message;
    })
    .catch((err) => {
      console.log("error message");
    });

module.exports = createPromiseAll;
