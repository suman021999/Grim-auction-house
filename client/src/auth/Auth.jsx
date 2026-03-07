
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { loginSuccess } from "../hooks/authSlice";

import ParticleBackground from "../common/ParticleBackground";
import "../index.css";

const API = axios.create({
  baseURL: import.meta.env.VITE_AUTH_URL
});

const Auth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const textRef = useRef([]);

  const [signInForm, setSignInForm] = useState({
    username: "",
    password: "",
  });

  const [signUpForm, setSignUpForm] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
  });

  const [showSignInPassword, setShowSignInPassword] = useState(false);
  const [showSignUpPassword, setShowSignUpPassword] = useState(false);

  useEffect(() => {
    gsap.to(textRef.current, {
      rotationY: 360,
      duration: 1.4,
      ease: "power2.inOut",
      repeat: -1,
      stagger: 0.12,
      transformPerspective: 800,
      transformOrigin: "center"
    });
  }, []);

  // ---------------- GOOGLE LOGIN -----------------
  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      setErrorMsg("");
      setLoading(true);

      const res = await API.post("/google", { token: credentialResponse.credential });

const authData = {
  token: res.data.token,
  user: res.data.user
};

localStorage.setItem("user", JSON.stringify(authData));

dispatch(loginSuccess(authData));

      navigate(res.data.user.email === "patra6319@gmail.com" ? "/admin" : "/user");
    } catch (err) {
      setErrorMsg("Google login failed");
    } finally {
      setLoading(false);
    }
  };

  // ---------------- NORMAL LOGIN -----------------
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/login", signInForm);
console.log("LOGIN RESPONSE:", res.data); 
const authData = {
  token: res.data.token,
  user: res.data.user
};

localStorage.setItem("user", JSON.stringify(authData));

dispatch(loginSuccess(authData));

      navigate(res.data.user.email === "patra6319@gmail.com" ? "/admin" : "/user");
    } catch (err) {
      setErrorMsg(err.response?.data?.msg || "Invalid Credentials");
    }
  };

  // ---------------- REGISTER -----------------
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/register", signUpForm);

      dispatch(loginSuccess({
        token: res.data.token,
        user: res.data.user
      }));

      setIsLogin(true);
    } catch (err) {
      setErrorMsg(err.response?.data?.msg || "Register failed");
    }
  };

  return (
    <>
    
  <div className="min-h-screen w-full flex items-center justify-center relative p-4">
      {/* BACKGROUND SPLIT */}
      <div className="absolute inset-0 left-1/2 w-1/2 bg-amber-50 "></div>
      <div className="absolute inset-0 right-1/2 w-1/2 bg-gradient-to-r from-green-700 to-green-200 overflow-hidden">
        <div className="absolute inset-0 clip-left">
          <ParticleBackground />
        </div>
      </div>

      {/* CARD */}
      <div className="relative bg-amber-50 shadow-2xl overflow-hidden flex flex-col md:flex-row w-full max-w-5xl">
        {/* LEFT PANEL */}
        <div className="md:w-1/2 flex flex-col justify-center items-center text-center p-8">
          <h1 className="text-3xl font-bold mb-2">
            {["W","E","L","C","O","M","E"," ","T","O"," ","G","R","I","M"].map((char,i)=>(
              <span
                key={i}
                ref={(el)=>(textRef.current[i]=el)}
                className={`inline-block ${char === " " ? "mx-1" : ""} ${
                  (i === 8 || i === 9) ? "text-red-600" :
                  (i >= 11 && i <= 14) ? "text-green-600" : "text-black"
                }`}
              >
                {char}
              </span>
            ))}
          </h1>

          <p className="text-gray-500 text-start mb-6 px-4 md:px-8">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          </p>

          <div className="flex gap-3 justify-center">
            <div>
              <GoogleLogin onSuccess={handleGoogleSuccess} />
            </div>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="md:w-1/2 bg-gradient-to-br from-green-700 to-green-200 text-white p-8 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-center mb-2">
            {isLogin ? "GRIM" : "Create Account"}
          </h2>
          <p className="text-center mb-6">
            {isLogin ? "Sign Into Your Account" : "Register a New Account"}
          </p>

          {errorMsg && (
            <div className="bg-red-700/80 text-white p-2 rounded mb-4 text-sm">{errorMsg}</div>
          )}

          <form className="flex flex-col gap-4" onSubmit={isLogin ? handleLogin : handleRegister}>
            {!isLogin && (
              <input
                value={signUpForm.fullname}
                onChange={(e) => setSignUpForm(s => ({ ...s, fullname: e.target.value }))}
                type="text"
                placeholder="Full Name"
                className="bg-transparent border-b border-gray-300 py-2 outline-none text-white font-[font4]"
              />
            )}

            <input
              value={isLogin ? signInForm.username : signUpForm.username}
              onChange={(e) => {
                if (isLogin) setSignInForm(s => ({ ...s, username: e.target.value }));
                else setSignUpForm(s => ({ ...s, username: e.target.value }));
              }}
              type="text"
              placeholder="User Name"
              className="bg-transparent border-b border-gray-300 py-2 outline-none text-white font-[font4]"
            />

            {!isLogin && (
              <input
                value={signUpForm.email}
                onChange={(e) => setSignUpForm(s => ({ ...s, email: e.target.value }))}
                type="email"
                placeholder="Email Address"
                className="bg-transparent border-b border-gray-300 py-2 outline-none text-white font-[font4]"
              />
            )}

            <div className="relative">
              <input
                value={isLogin ? signInForm.password : signUpForm.password}
                onChange={(e) => {
                  if (isLogin) setSignInForm(s => ({ ...s, password: e.target.value }));
                  else setSignUpForm(s => ({ ...s, password: e.target.value }));
                }}
                type={(isLogin ? (showSignInPassword ? "text" : "password") : (showSignUpPassword ? "text" : "password"))}
                placeholder="Password"
                className="bg-transparent border-b border-gray-300 py-2 outline-none w-full text-white font-[font4]"
              />
              <button
                type="button"
                onClick={() => isLogin ? setShowSignInPassword(s => !s) : setShowSignUpPassword(s => !s)}
                className="absolute right-0 top-1/2 -translate-y-1/2 p-2"
                aria-label="toggle password"
              >
                {isLogin ? (showSignInPassword ? <FiEyeOff /> : <FiEye />) : (showSignUpPassword ? <FiEyeOff /> : <FiEye />)}
              </button>
            </div>

            <button
              type="submit"
              className="mt-4 bg-green-600 hover:bg-green-800 py-3 rounded-full font-semibold"
              disabled={loading}
            >
              {loading ? (isLogin ? "Logging in..." : "Registering...") : (isLogin ? "LOGIN" : "REGISTER")}
            </button>
          </form>

          <p className="text-center mt-6 text-sm">
            {isLogin ? (
              <>
                Don’t have an account?{" "}
                <span
                  className="underline cursor-pointer text-gray-200 hover:text-white"
                  onClick={() => { setIsLogin(false); setErrorMsg(""); }}
                >
                  Register here
                </span>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <span
                  className="underline cursor-pointer text-gray-200 hover:text-white"
                  onClick={() => { setIsLogin(true); setErrorMsg(""); }}
                >
                  Login here
                </span>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
    </>
  );
};

export default Auth;


