import React from 'react';
import logo from "../../../../public/logos/logo.png";
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleSignUp = () => {
    navigate("/login"); // Redirects to Auth page
  };

  return (
    <>
      <section className="border-2 border-gray-700 rounded-xl h-16 mt-10 flex items-center justify-between">
        <div className="flex items-center px-6">
          <img src={logo} className="h-16 w-16" alt="Logo" />
          <span className="font-[font3] text-2xl text-customGreen1">GRIM</span>
        </div>

        <div className="flex space-x-2 px-2">
          <button
            onClick={handleSignUp}
            className="bg-lightBg text-customGreen2 cursor-pointer font-[font3] px-4 py-3 rounded-xl"
          >
            Sign In
          </button>
        </div>
      </section>
    </>
  );
};

export default Navbar;





