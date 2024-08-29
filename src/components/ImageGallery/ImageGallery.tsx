import s from "./ImageGallery.module.css";
import ImageCard from "../ImageCard/ImageCard";
import { Image } from "../App/App";

interface ImageGalleryProps {
  items: Image[];
  openModal: (src: string, alt: string) => void;
}

export default function ImageGallery({ items, openModal }: ImageGalleryProps) {
  return (
    <ul className={s.list}>
      {items.map((item) => (
        <li key={item.id}>
          <ImageCard item={item} openModal={openModal}></ImageCard>
        </li>
      ))}
    </ul>
  );
}
