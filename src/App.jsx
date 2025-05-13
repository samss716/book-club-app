import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import './App.css'


export default function App() {
  return (
    <div className="relative min-h-screen pb-20 flex flex-col">
      <main className="flex-grow mt-4">
        <Outlet /> {/* Homepage render's here */}
      </main>
      <Navbar />
    </div>
  );
}


