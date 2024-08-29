interface LoadMoreBtnProps {
  onClick: () => void;
  disabled: boolean;
}

export default function LoadMoreBtn({ onClick, disabled }: LoadMoreBtnProps) {
  return (
    <div>
      <button type="button" onClick={onClick} disabled={disabled}>
        Load More
      </button>
    </div>
  );
}
