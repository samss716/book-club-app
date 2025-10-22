// src/components/OrbitCircle.jsx
import "../styles/orbit.css";

export default function OrbitCircle({ members }) {
  const orbitRadius = 180; // distance from center to circle edge
  const iconSize = 45; // diameter of each icon

  return (
    <div
      className="relative flex items-center justify-center overflow-visible"
      style={{
        width: `${orbitRadius * 2 + iconSize}px`,
        height: `${orbitRadius * 2 + iconSize}px`,
      }}
    >
      {/* Orbit ring */}
      <div
        className="absolute border-4 border-[#91af9b] rounded-full"
        style={{
          width: `${orbitRadius * 2}px`,
          height: `${orbitRadius * 2}px`,
        }}
      />

      {/* Icons positioned on orbit */}
      {members.map((icon, index) => {
        const angle = (2 * Math.PI * index) / members.length; // radians
        const x = orbitRadius * Math.cos(angle);
        const y = orbitRadius * Math.sin(angle);

        return (
          <div
            key={index}
            className="absolute flex items-center justify-center rounded-full bg-[#91af9b]/80 text-white text-xl"
            style={{
              width: `${iconSize}px`,
              height: `${iconSize}px`,
              left: `calc(50% + ${x}px)`,
              top: `calc(50% + ${y}px)`,
              transform: "translate(-50%, -50%)",
            }}
          >
            {icon}
          </div>
        );
      })}
    </div>
  );
}
