import * as axios from "axios";

const shortenUrl = async (url, alias = "") => {
  const response = await axios.post(
    "https://tinyurl-rest-wrapper.onrender.com/",
    { url },
    { headers: { "Content-Type": "application/json" } }
  );

  // Note: Custom aliases are not supported by the TinyURL api-create.php endpoint
  // that this wrapper uses. The alias parameter is ignored.
  return response.data.tinyurl;
};

export default shortenUrl;
