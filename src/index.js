import * as axios from "axios";

const shortenUrl = async (url, alias = "") => {
  // Validate input
  if (typeof url !== "string" || url.trim() === "") {
    throw new TypeError("The 'url' parameter must be a non-empty string.");
  }

  if (alias) {
    console.warn(
      "TinyURL alias parameter is not supported when using tinyurl-rest-wrapper. " +
      "The alias will be ignored and a random slug will be generated instead."
    );
  }

  try {
    const response = await axios.post(
      "https://tinyurl-rest-wrapper.onrender.com/",
      { url },
      { headers: { "Content-Type": "application/json" } }
    );

    // Validate response structure
    if (!response.data || typeof response.data.tinyurl !== "string") {
      throw new Error("Invalid response from TinyURL service.");
    }

    return response.data.tinyurl;
  } catch (error) {
    // Re-throw with more context if it's not already a TypeError
    if (error instanceof TypeError) {
      throw error;
    }
    throw new Error(
      `Failed to shorten URL: ${error.message || "Unknown error"}`
    );
  }
};

export default shortenUrl;
