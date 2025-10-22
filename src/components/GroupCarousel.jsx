// src/components/GroupCarousel.jsx
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useGroups } from "../context/GroupContext";
import OrbitCircle from "./OrbitCircle";

export default function GroupCarousel() {
  const { groups, activeGroupIndex, switchGroup } = useGroups();

  return (
    <div className="relative flex items-center justify-center w-full h-[500px] sm:h-[600px] overflow-visible mt-[-50px]">
      {/* Arrows */}
      <button
        onClick={() => switchGroup(-1)}
        className="absolute left-4 bg-[#91af9b] text-white rounded-full p-2 hover:bg-[#446850]"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={() => switchGroup(1)}
        className="absolute right-4 bg-[#91af9b] text-white rounded-full p-2 hover:bg-[#446850]"
      >
        <ChevronRight size={24} />
      </button>

    {/* Group Orbit Transitions */}
    <div className="relative flex items-center justify-center w-full">
        <AnimatePresence mode="popLayout">
        {groups.map((group, i) => {
        // Compute the circular offset (wraps around)
        let offset = (i - activeGroupIndex + groups.length) % groups.length;
        if (offset > 1 && offset < groups.length - 1) return null; // keep only 3 visible

        // Reinterpret offset for right-side rotation continuity
        if (offset === groups.length - 1) offset = -1;

        const isActive = offset === 0;

        return (
            <motion.div
            key={group.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
                opacity: isActive ? 1 : 0.5,
                scale: isActive ? 1 : 0.8,
                filter: isActive ? "blur(0px)" : "blur(3px)",
                x: offset * 300, // horizontal position
                zIndex: isActive ? 10 : 0
            }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute"
            >
            <OrbitCircle members={group.members} />
            {isActive && (
  <         div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <h2 className="text-lg font-semibold text-[#333]">Welcome to the Book Club!</h2>
            <p className="text-sm text-gray-600">Select a group or create a new one.</p>
            </div>
            )}
            <p className="text-center mt-4 text-sm font-semibold">
                {group.name}
            </p>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
