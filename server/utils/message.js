var generateMessage = (from, text) => {
  console.log(from, text)
  return {
    from,
    text,
    createdAt: new Date().getTime()
  };
};

module.exports = {generateMessage};
