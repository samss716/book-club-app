// src/pages/Discover.jsx
import { useBooks } from "../context/BookContext.jsx";
import { useState, useEffect } from "react";

export default function Discover() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [loading, setLoading] = useState(false);

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

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    try {
      const res = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&maxResults=12`
      );
      const data = await res.json();
      const results = data.items?.map((item) => ({
        id: item.id,
        title: item.volumeInfo.title,
        authors: item.volumeInfo.authors,
        thumbnail: item.volumeInfo.imageLinks?.thumbnail,
        categories: item.volumeInfo.categories || [],
      })) || [];
      setBooks(results);
    } catch (err) {
      console.error("Error fetching books:", err);
    } finally {
      setLoading(false);
    }
  };

  // Filter by genre
  const filteredBooks =
    selectedGenre && selectedGenre !== "All"
      ? books.filter((b) =>
          b.categories?.some((cat) =>
            cat.toLowerCase().includes(selectedGenre.toLowerCase())
          )
        )
      : books;

  return (
    <div className="p-4">
      {/* Search Bar */}
      <form
        onSubmit={handleSearch}
        className="flex items-center border rounded-md p-2 w-full max-w-xl mx-auto"
      >
        <input
          type="text"
          className="flex-1 border-none focus:outline-none text-gray-700"
          placeholder="Search for a book..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          type="submit"
          className="px-4 text-[#446850] font-semibold hover:text-[#91af9b]"
        >
          🔍
        </button>
      </form>

      {/* Genre Filter Pills */}
      <div className="flex flex-wrap justify-center mt-4 gap-2">
        {genres.map((g) => (
          <button
            key={g}
            onClick={() => setSelectedGenre(g)}
            className={`px-4 py-2 rounded-full border transition ${
              selectedGenre === g
                ? "bg-[#91af9b] text-white border-[#446850]"
                : "border-gray-300 text-gray-700 hover:bg-gray-100"
            }`}
          >
            {g}
          </button>
        ))}
      </div>

      {/* Book Results */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {loading ? (
          <p className="text-center text-gray-600 col-span-full">
            Loading results...
          </p>
        ) : filteredBooks.length === 0 ? (
          <p className="text-center text-gray-500 col-span-full">
            No books found.
          </p>
        ) : (
          filteredBooks.map((book) => (
            <div
              key={book.id}
              className="bg-white shadow-sm rounded-md p-3 flex flex-col items-center"
            >
              <img
                src={book.thumbnail}
                alt={book.title}
                className="w-32 h-44 object-cover rounded-md mb-2"
              />
              <h3 className="text-sm font-semibold text-center">{book.title}</h3>
              <p className="text-xs text-gray-500 text-center">
                {book.authors?.join(", ")}
              </p>
              <button
                onClick={() => onAddToWishlist(book)}
                className="mt-2 text-sm bg-[#91af9b] text-white px-3 py-1 rounded-md hover:bg-[#446850]"
              >
                + Add
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
