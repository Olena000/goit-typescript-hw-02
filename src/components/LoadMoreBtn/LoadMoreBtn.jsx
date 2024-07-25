// import s from "./LoadMoreBtn.module.css";

export default function LoadMoreBtn({ onClick }) {
  return (
    <div>
      <button type="button" onClick={onClick}>
        Load More
      </button>
    </div>
  );
}
