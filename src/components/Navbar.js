import { useState } from 'react';
import { MdSportsCricket } from 'react-icons/md'; // Using the Material Design cricket bat icon

const Navbar = () => {
  const [batHover, setBatHover] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 shadow-lg w-full">
      <div className="container mx-auto flex justify-center items-center">
        {/* Logo with Animation */}
        <div className="flex items-center space-x-4">
          <div 
            className={`transition-transform duration-500 ease-in-out ${batHover ? 'transform rotate-180 scale-110' : ''}`}
            onMouseEnter={() => setBatHover(true)}
            onMouseLeave={() => setBatHover(false)}
          >
            <MdSportsCricket size={50} className="text-yellow-300" />
          </div>
          <span className="text-3xl font-bold tracking-wide logo-text">Cricket Match</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
