import { useEffect, useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import ImageGallery from "../ImageGallery/ImageGallery";
import Loader from "../Loader/Loader";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import { fetchImages } from "../../services/api";
import toast, { Toaster } from "react-hot-toast";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import ImageModal from "../ImageModal/ImageModal";

function App() {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalInfo, setModalInfo] = useState({
    src: "",
    alt: "",
  });

  useEffect(() => {
    if (!query) return;

    const getData = async () => {
      try {
        setIsLoading(true);
        setIsError(false);
        const response = await fetchImages(query, page);

        if (page === 1 && response.results.length === 0) {
          toast.error("No images found. Try again...", {
            duration: 2000,
            style: {
              border: "1px solid #713200",
              padding: "8px",
              color: "#713200",
            },
          });
        }

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
    setIsError(false);
    setTotalPages(0);
  };

  const openModal = (src, alt) => {
    setModalIsOpen(true);
    setModalInfo({ src, alt });
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setModalInfo({ src: "", alt: "" });
  };

  return (
    <div>
      <Toaster containerStyle={{ left: 50 }} reverseOrder={false} />
      <SearchBar setQuery={handleSearch}></SearchBar>
      {isError && <ErrorMessage />}
      {images.length > 0 && (
        <ImageGallery items={images} openModal={openModal}></ImageGallery>
      )}
      {totalPages > page && !isLoading && (
        <LoadMoreBtn
          onClick={() => setPage((prevPage) => prevPage + 1)}
          disabled={isLoading}
        ></LoadMoreBtn>
      )}
      {isLoading && <Loader />}
      <ImageModal
        modalIsOpen={modalIsOpen}
        onCloseModal={closeModal}
        src={modalInfo.src}
        alt={modalInfo.alt}
      />
    </div>
  );
}

export default App;
