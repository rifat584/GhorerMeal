import axios from "axios";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL?.trim();

const queryFetch = async (url) => {
  if (!apiBaseUrl) {
    throw new Error(
      "The client API URL is missing. Set VITE_API_BASE_URL before building the app.",
    );
  }

  try {
    const response = await axios(`${apiBaseUrl}/${url}`);
    return response.data;
  } catch (error) {
    const serverMessage = error?.response?.data?.message;

    if (serverMessage) {
      throw new Error(serverMessage);
    }

    if (error?.code === "ERR_NETWORK") {
      throw new Error(`Could not reach the API at ${apiBaseUrl}.`);
    }

    throw new Error(
      error?.message || "Something went wrong while loading data.",
    );
  }
};

export default queryFetch;
