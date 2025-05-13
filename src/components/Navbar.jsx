// src/components/Navbar.jsx
import { Link } from 'react-router-dom';
import { House, Users, Heart} from 'lucide-react';

export default function Navbar() {
  return (
    <nav className= "fixed bottom-0 left-0 right-0 w-full h-20 flex justify-between items-center p-6 bg-[#91af9b] text-white shadow-md">
      <ul className="flex justify-between w-full">
      <li><Link to="/favorites" 
        className="hover:shadow-md">
        <Heart size={30}/>
        </Link></li>
        
        <li><Link to="/" 
        className="hover:shadow-md ">
        <House size={30}/>
        </Link></li>
        <li><Link to="/group" 
        className="hover:shadow-md">
        <Users size={30}/>
          </Link></li>
        
      </ul>
    </nav>
  );
}
