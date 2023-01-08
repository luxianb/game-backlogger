const { default: axios } = require("axios");

const testUrl = async (url) => {
  try {
    await axios.get(url);
    return url;
  } catch (err) {
    return null;
  }
};

module.exports = { testUrl };
