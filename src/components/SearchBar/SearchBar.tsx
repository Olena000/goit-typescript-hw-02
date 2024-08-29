import { FormEvent } from "react";
import toast from "react-hot-toast";

interface SearchBarProps {
  setQuery: (query: string) => void;
}

export default function SearchBar({ setQuery }: SearchBarProps) {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const query = (
      e.currentTarget.elements.namedItem("search") as HTMLInputElement
    ).value.trim();
    const notify = () =>
      toast.error("Please enter your query", {
        duration: 2000,
        style: {
          border: "1px solid #713200",
          padding: "8px",
          color: "#713200",
        },
      });
    if (query === "") {
      notify();
      return;
    }
    setQuery(query);
    e.currentTarget.reset();
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
