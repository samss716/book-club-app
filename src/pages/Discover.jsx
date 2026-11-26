import { useState } from "react";
import { useBooks } from "../context/BookContext.jsx";

const mockBooks = [
  {
    id: "midnight-library",
    title: "The Midnight Library",
    authors: ["Matt Haig"],
    categories: ["Fiction", "Fantasy"],
    color: "#31556b",
    accent: "#d9c18c",
  },
  {
    id: "irregular-witches",
    title: "The Very Secret Society of Irregular Witches",
    authors: ["Sangu Mandanna"],
    categories: ["Fiction", "Fantasy", "Romance"],
    color: "#b65f50",
    accent: "#f3d9a1",
  },
  {
    id: "tomorrow-and-tomorrow",
    title: "Tomorrow, and Tomorrow, and Tomorrow",
    authors: ["Gabrielle Zevin"],
    categories: ["Fiction", "Romance"],
    color: "#596d53",
    accent: "#e5cb91",
  },
  {
    id: "project-hail-mary",
    title: "Project Hail Mary",
    authors: ["Andy Weir"],
    categories: ["Fiction", "Science", "Science Fiction"],
    color: "#455c78",
    accent: "#d6c18a",
  },
  {
    id: "thursday-murder-club",
    title: "The Thursday Murder Club",
    authors: ["Richard Osman"],
    categories: ["Fiction", "Mystery"],
    color: "#777b57",
    accent: "#e7d6a5",
  },
  {
    id: "song-of-achilles",
    title: "The Song of Achilles",
    authors: ["Madeline Miller"],
    categories: ["Fiction", "Fantasy", "Romance"],
    color: "#7a4c55",
    accent: "#d9b795",
  },
  {
    id: "warmth-of-other-suns",
    title: "The Warmth of Other Suns",
    authors: ["Isabel Wilkerson"],
    categories: ["Non-Fiction", "History", "Biography"],
    color: "#8a5942",
    accent: "#e6c891",
  },
  {
    id: "night-circus",
    title: "The Night Circus",
    authors: ["Erin Morgenstern"],
    categories: ["Fiction", "Fantasy", "Romance"],
    color: "#34384c",
    accent: "#c5a36d",
  },
];

const genres = [
  "All",
  "Fiction",
  "Fantasy",
  "Science",
  "Romance",
  "Mystery",
  "History",
  "Biography",
];

export default function Discover() {
  const { addToWishlist } = useBooks();
  const [query, setQuery] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const showResults = Boolean(submittedQuery) || selectedGenre !== "All";

  const matchingBooks = mockBooks.filter((book) => {
    const matchesGenre =
      selectedGenre === "All" ||
      book.categories.some((category) =>
        category.toLowerCase().includes(selectedGenre.toLowerCase())
      );
    const searchText = [book.title, ...book.authors, ...book.categories]
      .join(" ")
      .toLowerCase();
    return matchesGenre && searchText.includes(submittedQuery.toLowerCase());
  });
  const visibleBooks = showResults ? matchingBooks : matchingBooks.slice(0, 5);

  function handleSearch(event) {
    event.preventDefault();
    setSubmittedQuery(query.trim());
  }

  return (
    <div className="p-4">
      <form
        onSubmit={handleSearch}
        className="mx-auto flex w-full max-w-xl items-center rounded-md border p-2"
      >
        <label className="sr-only" htmlFor="book-search">Search books</label>
        <input
          id="book-search"
          type="search"
          className="flex-1 border-none text-gray-700 focus:outline-none"
          placeholder="Search for a book..."
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <button
          type="submit"
          className="px-4 font-semibold text-[#446850] hover:text-[#91af9b]"
        >
          Search
        </button>
      </form>

      <div className="mt-4 flex flex-wrap justify-center gap-2">
        {genres.map((genre) => (
          <button
            key={genre}
            type="button"
            aria-pressed={selectedGenre === genre}
            onClick={() => setSelectedGenre(genre)}
            className={`rounded-full border px-4 py-2 transition ${
              selectedGenre === genre
                ? "border-[#446850] bg-[#91af9b] text-white"
                : "border-gray-300 text-gray-700 hover:bg-gray-100"
            }`}
          >
            {genre}
          </button>
        ))}
      </div>

      <section className="mt-8">
        <h2 className="mb-3 text-lg font-semibold text-[#446850]">
          {showResults ? "Book Results" : "Featured New Releases"}
        </h2>
        {visibleBooks.length === 0 ? (
          <p className="py-8 text-center text-gray-500">No books found in the mock catalog.</p>
        ) : (
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
            {visibleBooks.map((book) => (
              <article
                key={book.id}
                className="flex flex-col items-center rounded-md bg-white p-3 shadow-sm"
              >
                <div
                  aria-label={`Mock cover for ${book.title}`}
                  role="img"
                  className="mb-2 flex h-44 w-32 flex-col justify-between rounded-r-md p-3 text-left text-white shadow-sm"
                  style={{
                    backgroundColor: book.color,
                    borderLeft: `5px solid ${book.accent}`,
                  }}
                >
                  <span className="font-serif text-xs leading-tight">{book.title}</span>
                  <span className="text-[9px] uppercase tracking-wide">{book.authors[0]}</span>
                </div>
                <h3 className="text-center text-sm font-semibold">{book.title}</h3>
                <p className="text-center text-xs text-gray-500">
                  {book.authors.join(", ")}
                </p>
                <button
                  type="button"
                  onClick={() => addToWishlist(book)}
                  className="mt-2 rounded-md bg-[#91af9b] px-3 py-1 text-sm text-white hover:bg-[#446850]"
                >
                  + Add
                </button>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
