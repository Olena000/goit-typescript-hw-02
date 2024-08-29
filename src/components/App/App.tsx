import { useEffect, useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import ImageGallery from "../ImageGallery/ImageGallery";
import Loader from "../Loader/Loader";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import { fetchImages } from "../../services/api";
import toast, { Toaster } from "react-hot-toast";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import ImageModal from "../ImageModal/ImageModal";

export interface Image {
  id: string;
  alt_description: string;
  urls: {
    small: string;
    regular: string;
  };
}

interface ModalInfo {
  src: string;
  alt: string;
}

export interface FetchImagesResponse {
  results: Image[];
  total_pages: number;
}

function App() {
  const [images, setImages] = useState<Image[]>([]);
  const [query, setQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [modalInfo, setModalInfo] = useState<ModalInfo>({
    src: "",
    alt: "",
  });

  useEffect(() => {
    if (!query) return;

    const getData = async () => {
      setIsLoading(true);
      setIsError(false);

      try {
        const result = await fetchImages(query, page);

        if ("error" in result) {
          setIsError(true);
          toast.error(result.error, {
            duration: 2000,
            style: {
              border: "1px solid #713200",
              padding: "8px",
              color: "#713200",
            },
          });
        } else {
          const response = result as FetchImagesResponse;
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
        }
      } catch (error) {
        setIsError(true);
        toast.error("Failed to fetch images", {
          duration: 2000,
          style: {
            border: "1px solid #713200",
            padding: "8px",
            color: "#713200",
          },
        });
      } finally {
        setIsLoading(false);
      }
    };

    getData();
  }, [query, page]);

  const handleSearch = (newQuery: string) => {
    setQuery(newQuery);
    setPage(1);
    setImages([]);
    setIsError(false);
    setTotalPages(0);
  };

  const openModal = (src: string, alt: string) => {
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
