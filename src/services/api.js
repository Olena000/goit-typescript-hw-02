import axios from "axios";

export const fetchImages = async (query, page = 1) => {
  if (!query) {
    return { error: "Query parameter is required" };
  }

  const API_KEY = "Tyt__aCXCXgQJyJnj_TFApJBm8WRBMtRM4nM0EcCbs8";

  axios.defaults.baseURL = "https://api.unsplash.com";
  axios.defaults.headers.common["Authorization"] = `Client-ID ${API_KEY}`;

  const response = await axios.get("/search/photos", {
    params: {
      query,
      per_page: 5,
      page,
      orientation: "landscape",
    },
  });
  return response.data;
};
