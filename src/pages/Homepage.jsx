import { Link, useNavigate } from "react-router-dom";
import { Plus, CircleUserRound, BookOpen, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion"; // ✅ animate between groups
import "./orbit.css";

export default function Homepage() {
  const navigate = useNavigate();

  // Each group has its members
  const groups = [
    ["👤", "👤"],         // Group 1
    ["👤", "👤", "👤"],   // Group 2
    ["👤"],              // Group 3
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // track swipe direction

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % groups.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + groups.length) % groups.length);
  };

  return (
    <div className="relative flex flex-col items-center justify-center h-[calc(100vh-100px)] text-center px-4">
      <BookOpen size={80} strokeWidth={1} />
      <h2 className="text-lg font-semibold mt-4">Welcome to the Book Club!</h2>
      <p className="mt-2">Start a new group or join an existing one.</p>

      {/* Carousel Container */}
      <div className="relative w-full flex items-center justify-center">
        {/* Left Arrow */}
        <button
          onClick={handlePrev}
          className="absolute left-130 p-2 rounded-full border bg-white shadow hover:bg-gray-200"
        >
          <ChevronLeft size={28} />
        </button>

        {/* Orbit Display with Animation */}
        <div className="w-[100px] flex items-center justify-center">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              initial={{ opacity: 0, x: direction > 0 ? 100 : -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction > 0 ? -100 : 100 }}
              transition={{ duration: 0.5 }}
              className="atom-container absolute"
            >
              <div className="atom-nucleus"></div>
              {groups[currentIndex].map((icon, index) => {
                const angle = (360 / groups[currentIndex].length) * index;
                return (
                  <div
                    className="atom-orbit"
                    key={index}
                    style={{ transform: `rotate(${angle}deg)` }}
                  >
                    <div className="electron">{icon}</div>
                  </div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Arrow */}
        <button
          onClick={handleNext}
          className="absolute right-130 p-2 rounded-full border bg-white shadow hover:bg-gray-200"
        >
          <ChevronRight size={28} />
        </button>
      </div>

      {/* Floating Buttons */}
      <Link
        to="/create"
        className="fixed top-6 right-4 bg-[#91af9b] text-white p-4 rounded-full shadow-lg hover:bg-green-900 transition z-50"
      >
        <Plus size={24} />
      </Link>

      <Link
        to="/user"
        className="fixed top-6 left-4 text-gray p-3 rounded-full shadow hover:bg-gray-300 transition z-50"
      >
        <CircleUserRound size={50} strokeWidth={0.5} />
      </Link>
    </div>
  );
}
