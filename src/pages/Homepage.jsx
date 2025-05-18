import { Link } from 'react-router-dom';
import { Plus, CircleUserRound, BookOpen } from 'lucide-react';
import './SpinningCircle.css'; 


export default function Homepage() {
    const numIcons = 6; 
    const radius = 100; 
  
    const iconPositions = Array.from({ length: numIcons }, (_, i) => {
      const angle = (i / numIcons) * 2 * Math.PI;
      const x = radius * Math.cos(angle);
      const y = radius * Math.sin(angle);
      return { x, y };
    });
  

    return (
      <div className="relative flex flex-col items-center justify-center h-[calc(100vh-100px)] text-center overflow-hidden px-4">
        <BookOpen size={80} strokeWidth={1}/>
        <h2 className="text-lg font-semibold mt-4">Welcome to the Book Club!</h2>
        <p className="mt-2">Start a new group or join an existing one.</p>

        <div className="spinning-circle-container mt-10">
      <div className="spinning-circle">
      {Array.from({ length: numIcons }).map((_, index) => {
      const angle = (index / numIcons) * 360;
      return (
          <div
            key={index}
            className="icon-wrapper"
            style={{
              transform: `rotate(${angle}deg) translate(100px)`,
            }}
          >
           <span role="img" aria-label="user" className="spinning-icon rotate-90deg text-3xl ">👤</span>
          </div>
        );
})}
      </div>
    </div>

      <Link
        to="/create"
        className="fixed top-6 right-4 bg-[#91af9b] text-white p-4 rounded-full shadow-lg hover:bg-[#446850] transition z-50"
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