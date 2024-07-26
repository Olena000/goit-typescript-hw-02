import s from "./ImageCard.module.css";

export default function ImageCard({ item, openModal }) {
  return (
    <div>
      <img
        className={s.img}
        src={item.urls.small}
        alt={item.alt_description}
        onClick={() => openModal(item.urls.regular, item.alt_description)}
      />
    </div>
  );
}
