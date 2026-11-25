// src/components/GroupCarousel.jsx
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useGroups } from "../context/GroupContext";
import OrbitCircle from "./OrbitCircle";

const MotionDiv = motion.div;

export default function GroupCarousel() {
  const { groups, activeGroupIndex, switchGroup } = useGroups();

  return (
    <div className="relative mt-3 flex h-[220px] w-full items-center justify-center overflow-hidden sm:mt-5 sm:h-[390px]">
      {/* Arrows */}
      <button
        onClick={() => switchGroup(-1)}
        aria-label="Previous group"
        className="absolute left-0 z-20 rounded-full bg-white/70 p-2 text-[#446850] transition hover:bg-white sm:left-4"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={() => switchGroup(1)}
        aria-label="Next group"
        className="absolute right-0 z-20 rounded-full bg-white/70 p-2 text-[#446850] transition hover:bg-white sm:right-4"
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
            <MotionDiv
            key={group.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
                opacity: isActive ? 1 : 0.5,
                scale: isActive ? 1 : 0.8,
                filter: isActive ? "blur(0px)" : "blur(3px)",
                x: offset * 250, // horizontal position
                zIndex: isActive ? 10 : 0
            }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute scale-[0.45] sm:scale-100"
            >
            <OrbitCircle members={group.members} />
            {isActive && (
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
              <h2 className="font-serif text-lg font-semibold text-[#333]">Welcome to the Book Club!</h2>
              <p className="text-sm text-gray-600">Select a group or create a new one.</p>
            </div>
            )}
            <p className="mt-4 text-center text-sm font-semibold text-[#516255]">
                {group.name}
            </p>
              </MotionDiv>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
