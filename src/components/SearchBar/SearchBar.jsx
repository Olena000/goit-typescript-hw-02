// import s from "./SearchBar.module.css";

import toast from "react-hot-toast";

export default function SearchBar({ setQuery }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const query = e.target.elements.search.value.trim();
    const notify = () =>
      toast.error("Please enter your query", {
        duration: 2000,
        style: {
          border: "1px solid #713200",
          padding: "16px",
          color: "#713200",
        },
      });
    if (query === "") {
      notify();
      return;
    }
    setQuery(query);
    e.target.reset();
  };

  return (
    <header>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="search"
          autoComplete="off"
          autoFocus
          placeholder="Search images..."
        />
        <button type="submit">Search</button>
      </form>
    </header>
  );
}
