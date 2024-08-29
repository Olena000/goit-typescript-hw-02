import axios from "axios";
import { FetchImagesResponse } from "../components/App/App";

interface FetchImagesError {
  error: string;
}

export const fetchImages = async (
  query: string,
  page: number = 1
): Promise<FetchImagesResponse | FetchImagesError> => {
  if (!query) {
    return { error: "Query parameter is required" };
  }

  const API_KEY = "Tyt__aCXCXgQJyJnj_TFApJBm8WRBMtRM4nM0EcCbs8";

  axios.defaults.baseURL = "https://api.unsplash.com";
  axios.defaults.headers.common["Authorization"] = `Client-ID ${API_KEY}`;

  const response = await axios.get<FetchImagesResponse>("/search/photos", {
    params: {
      query,
      per_page: 6,
      page,
      orientation: "landscape",
    },
  });
  return response.data;
};
