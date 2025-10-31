import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { FaFacebookF, FaTwitter, FaGoogle, FaLinkedinIn } from "react-icons/fa";
import ParticleBackground from "../common/ParticleBackground";
import "../index.css";
const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const textRef = useRef([]);

useEffect(() => {
  gsap.to(textRef.current, {
    rotationY: 360,
    duration: 1.4,
    ease: "power2.inOut",
    repeat: -1,
    stagger: 0.12,       
    transformPerspective: 800,
    transformOrigin: "center",
  });
}, []);

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative p-4">
      
      {/* ================= BACKGROUND SPLIT ================= */}
<div className="absolute inset-0 left-1/2 w-1/2 bg-amber-50 "></div>

<div className="absolute inset-0 right-1/2 w-1/2 bg-gradient-to-r from-green-700 to-green-200 overflow-hidden">
  <div className="absolute inset-0 clip-left">
    <ParticleBackground />
  </div>
</div>




      {/* ================= CARD ================= */}
      <div className="relative  bg-amber-50 shadow-2xl  overflow-hidden flex flex-col md:flex-row w-full max-w-5xl">
        
        {/* LEFT PANEL */}
              <div className="md:w-1/2 flex flex-col justify-center items-center text-center p-8">
                <h1 className="text-3xl font-bold mb-2">
           {["W","E","L","C","O","M","E"," ","T","O"," ","G","R","I","M"].map((char,i)=>(
             <span
               key={i}
               ref={(el)=>(textRef.current[i]=el)}
               className={`inline-block ${char === " " ? "mx-1" : ""} ${
                 // "TO" should be red -> indexes 8 and 9
                 (i === 8 || i === 9) ? "text-red-600" :
                 // "GRIM" should be green -> indexes 11–14
                 (i >= 11 && i <= 14) ? "text-green-600" :
                 "text-black"
               }`}
             >
             {char}
           </span>
         ))}
      </h1>


          <p className="text-gray-500 text-start mb-20 px-4 md:px-8">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          </p>

          {/* <div className="flex gap-3 justify-center">
            <button className="bg-blue-600 text-white p-3 rounded-md"><FaFacebookF /></button>
            <button className="bg-sky-400 text-white p-3 rounded-md"><FaTwitter /></button>
            <button className="bg-red-600 text-white p-3 rounded-md"><FaGoogle /></button>
            <button className="bg-blue-700 text-white p-3 rounded-md"><FaLinkedinIn /></button>
          </div> */}
        </div>

        {/* RIGHT PANEL */}
        <div className="md:w-1/2 bg-gradient-to-br from-green-700 to-green-200 text-white p-8 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-center mb-2">
            {isLogin ? "GRIM" : "Create Account"}
          </h2>
          <p className="text-center mb-6">
            {isLogin ? "Sign Into Your Account" : "Register a New Account"}
          </p>

          <form className="flex flex-col gap-4">
            {!isLogin && (
              <input
                type="text"
                placeholder="Full Name"
                className="bg-transparent border-b border-gray-300 py-2 outline-none"
              />
            )}

            <input
              type="email"
              placeholder="Email Address"
              className="bg-transparent border-b border-gray-300 py-2 outline-none"
            />

            <input
              type="password"
              placeholder="Password"
              className="bg-transparent border-b border-gray-300 py-2 outline-none"
            />

            {isLogin && (
              <div className="flex justify-between text-sm mt-2">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="accent-green-400" /> Remember me
                </label>
                <span className="hover:text-gray-200 text-white cursor-pointer">
                  Forgot Password?
                </span>
              </div>
            )}

            <button className="mt-4 bg-green-600 hover:bg-green-800 py-3 rounded-full font-semibold">
              {isLogin ? "LOGIN" : "REGISTER"}
            </button>
          </form>

          <p className="text-center mt-6 text-sm">
            {isLogin ? (
              <>
                Don’t have an account?{" "}
                <span
                  className="underline cursor-pointer text-gray-200 hover:text-white"
                  onClick={() => setIsLogin(false)}
                >
                  Register here
                </span>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <span
                  className="underline cursor-pointer text-gray-200 hover:text-white"
                  onClick={() => setIsLogin(true)}
                >
                  Login here
                </span>
              </>
            )}
          </p>
        </div>

      </div>
    </div>
  );
};

export default Auth;
