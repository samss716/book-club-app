// src/pages/Homepage.jsx
import { Link } from "react-router-dom";
import { Plus, CircleUserRound } from "lucide-react";
import GroupCarousel from "../components/GroupCarousel";

export default function Homepage() {
  return (
    <div className="relative flex flex-col items-center justify-center h-[calc(100vh-100px)] bg-[#faf7ef] overflow-hidden px-4">

      {/* Orbit carousel (includes text inside) */}
      <GroupCarousel />

      {/* Floating Create button */}
      <Link
        to="/create"
        className="fixed top-6 right-4 bg-[#91af9b] text-white p-4 rounded-full shadow-lg hover:bg-green-900 transition z-50"
      >
        <Plus size={24} />
      </Link>

      {/* Floating User button */}
      <Link
        to="/user"
        className="fixed top-6 left-4 text-gray p-3 rounded-full shadow hover:bg-gray-300 transition z-50"
      >
        <CircleUserRound size={50} strokeWidth={0.5} />
      </Link>
    </div>
  );
}
