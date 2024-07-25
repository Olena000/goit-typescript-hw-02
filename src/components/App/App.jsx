import { useEffect, useState } from "react";
import "./App.css";
import SearchBar from "../SearchBar/SearchBar";
import ImageGallery from "../ImageGallery/ImageGallery";
import Loader from "../Loader/Loader";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import { fetchImages } from "../../services/api";
import { Toaster } from "react-hot-toast";

function App() {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    if (!query) return;

    const getData = async () => {
      try {
        setIsLoading(true);
        setIsError(false);
        const response = await fetchImages(query, page);
        setImages((prevImages) => [...prevImages, ...response.results]);
        setTotalPages(response.total_pages);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, [query, page]);

  const handleSearch = (newQuery) => {
    setQuery(newQuery);
    setPage(1);
    setImages([]);
  };

  return (
    <div>
      <Toaster containerStyle={{ left: 50 }} reverseOrder={false} />
      <SearchBar setQuery={handleSearch}></SearchBar>
      {isLoading && <Loader />}
      {isError && <h2>Something went wrong! Try again...</h2>}
      {images.length > 0 && <ImageGallery items={images}></ImageGallery>}
      {totalPages > page && !isLoading && (
        <LoadMoreBtn
          onClick={() => setPage((prevPage) => prevPage + 1)}
        ></LoadMoreBtn>
      )}
    </div>
  );
}

export default App;
