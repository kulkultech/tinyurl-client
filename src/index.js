import * as axios from "axios";

const shortenUrl = async (url, alias = "") => {
  if (alias) {
    console.warn(
      "TinyURL alias parameter is not supported when using tinyurl-rest-wrapper. " +
      "The alias will be ignored and a random slug will be generated instead."
    );
  }

  const response = await axios.post(
    "https://tinyurl-rest-wrapper.onrender.com/",
    { url },
    { headers: { "Content-Type": "application/json" } }
  );

  return response.data.tinyurl;
};

export default shortenUrl;
