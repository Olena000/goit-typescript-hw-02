import s from "./ImageGallery.module.css";
import ImageCard from "../ImageCard/ImageCard";

export default function ImageGallery({ items, openModal }) {
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
