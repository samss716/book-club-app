// src/components/OrbitCircle.jsx
import "../styles/orbit.css";

export default function OrbitCircle({ members }) {
  const orbitRadius = 180;

  return (
    <div className="relative flex items-center justify-center">
      <div
        className="atom-nucleus border-4 border-[#91af9b] rounded-full"
        style={{
          width: `${orbitRadius * 2}px`,
          height: `${orbitRadius * 2}px`,
        }}
      >
        {members.map((icon, index) => {
          const angle = (2 * Math.PI * index) / members.length;
          const x = orbitRadius + orbitRadius * Math.cos(angle);
          const y = orbitRadius + orbitRadius * Math.sin(angle);
          return (
            <div
              key={index}
              className="absolute flex items-center justify-center rounded-full bg-[#91af9b]/80 text-white text-xl"
              style={{
                width: "45px",
                height: "45px",
                left: `${x - 22.5}px`,
                top: `${y - 22.5}px`,
                transform: "translate(-50%, -50%)",
              }}
            >
              {icon}
            </div>
          );
        })}
      </div>
    </div>
  );
}
