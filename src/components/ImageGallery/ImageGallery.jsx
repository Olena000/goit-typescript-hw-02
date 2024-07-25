// import s from "./ImageGallery.module.css";
import ImageCard from "../ImageCard/ImageCard";

export default function ImageGallery({ items }) {
  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>
          <ImageCard item={item}></ImageCard>
        </li>
      ))}
    </ul>
  );
}
