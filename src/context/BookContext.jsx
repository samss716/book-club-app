// src/context/BookContext.jsx
import { createContext, useContext, useState } from "react";

const BookContext = createContext();

export function BookProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);

  const addToWishlist = (book) => {
    setWishlist((prev) =>
      prev.some((b) => b.id === book.id) ? prev : [...prev, book]
    );
  };

  return (
    <BookContext.Provider value={{ wishlist, addToWishlist }}>
      {children}
    </BookContext.Provider>
  );
}

export const useBooks = () => useContext(BookContext);
