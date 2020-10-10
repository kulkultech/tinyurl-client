import * as axios from "axios";

const shortenUrl = async (url, alias = "") => {
  const encodedUrl = encodeURI(url);
  const response = await axios.get(
    `https://cors-anywhere.herokuapp.com/https://tinyurl.com/create.php?source=indexpage&url=${encodedUrl}&alias=${alias}`,
    { headers: { 'X-Requested-With': 'XMLHttpRequest' } }
  );

  const el = document.createElement("html");
  el.innerHTML = response.data;
  return el.querySelector("#copy_div").href;
};

export default shortenUrl;
