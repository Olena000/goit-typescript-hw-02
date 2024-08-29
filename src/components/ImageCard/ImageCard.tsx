import s from "./ImageCard.module.css";

interface ImageCardProps {
  item: {
    urls: {
      small: string;
      regular: string;
    };
    alt_description: string;
  };
  openModal: (src: string, alt: string) => void;
}

export default function ImageCard({ item, openModal }: ImageCardProps) {
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
