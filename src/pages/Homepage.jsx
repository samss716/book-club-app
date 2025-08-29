import { Link, useNavigate } from 'react-router-dom';
import { Plus, CircleUserRound, BookOpen } from 'lucide-react';
import "./orbit.css";

export default function Homepage() {
  const navigate = useNavigate();
  const groupMems = ["👤","👤"];

  const handleOrbitClick = () => {
    navigate('/manage'); // Navigate to group members page
  };

    return (
      <div className="relative flex flex-col items-center justify-center h-[calc(100vh-100px)] text-center overflow-hidden px-4">
        <BookOpen size={80} strokeWidth={1}/>
        <h2 className="text-lg font-semibold mt-4">Welcome to the Book Club!</h2>
        <p className="mt-2">Start a new group or join an existing one.</p>

      <div className="atom-container">
      <div className="atom-nucleus">

        
      </div>

{groupMems.map((icon, index) => {
  const angle = (360 / groupMems.length) * index;
  return (
    <div
      className="atom-orbit"
      key={index}
      style={{
        transform: `rotate(${angle}deg)`,
      }}
    >
      <div className="electron">{icon}</div>
    </div>
    
  );
})}
</div>

      <Link
        to="/create"
        className="fixed top-6 right-4 bg-[#91af9b] text-white p-4 rounded-full shadow-lg hover:bg-green-900 transition z-50"
        >
          <Plus size={24}/>
          </Link>

        <Link
          to="/user"
          className="fixed top-6 left-4 text-gray p-3 rounded-full shadow hover:bg-gray-300 transition z-50">
            <CircleUserRound size={50} strokeWidth={0.5}/>
            
          </Link>

          </div>
    );
  }
