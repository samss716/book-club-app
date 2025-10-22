// src/components/GroupCarousel.jsx
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useGroups } from "../context/GroupContext";
import OrbitCircle from "./OrbitCircle";

export default function GroupCarousel() {
  const { groups, activeGroupIndex, switchGroup } = useGroups();

  return (
    <div className="relative flex items-center justify-center w-full overflow-hidden h-[420px]">
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
          {groups.map((group, index) => {
            const offset = index - activeGroupIndex;
            if (Math.abs(offset) > 1) return null; // only render adjacent groups

            const isActive = offset === 0;

            return (
              <motion.div
                key={group.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: isActive ? 1 : 0.5,
                  scale: isActive ? 1 : 0.8,
                  filter: isActive ? "blur(0px)" : "blur(3px)",
                  zIndex: isActive ? 10 : 0,
                  x: offset * 300, // horizontally spread
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
