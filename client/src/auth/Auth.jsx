// import React, { useEffect, useRef, useState } from "react";
// import gsap from "gsap";
// import { FaGoogle} from "react-icons/fa";
// import ParticleBackground from "../common/ParticleBackground";
// import { GoogleLogin } from "@react-oauth/google";
// import "../index.css";
// const Auth = () => {
//   const [isLogin, setIsLogin] = useState(true);
//   const textRef = useRef([]);

// useEffect(() => {
//   gsap.to(textRef.current, {
//     rotationY: 360,
//     duration: 1.4,
//     ease: "power2.inOut",
//     repeat: -1,
//     stagger: 0.12,       
//     transformPerspective: 800,
//     transformOrigin: "center",
//   });
// }, []);


//   return (
//     <div className="min-h-screen w-full flex items-center justify-center relative p-4">
      
//       {/* ================= BACKGROUND SPLIT ================= */}
// <div className="absolute inset-0 left-1/2 w-1/2 bg-amber-50 "></div>

// <div className="absolute inset-0 right-1/2 w-1/2 bg-gradient-to-r from-green-700 to-green-200 overflow-hidden">
//   <div className="absolute inset-0 clip-left">
//     <ParticleBackground />
//   </div>
// </div>




//       {/* ================= CARD ================= */}
//       <div className="relative  bg-amber-50 shadow-2xl  overflow-hidden flex flex-col md:flex-row w-full max-w-5xl">
        
//         {/* LEFT PANEL */}
//               <div className="md:w-1/2 flex flex-col justify-center items-center text-center p-8">
//                 <h1 className="text-3xl font-bold mb-2">
//            {["W","E","L","C","O","M","E"," ","T","O"," ","G","R","I","M"].map((char,i)=>(
//              <span
//                key={i}
//                ref={(el)=>(textRef.current[i]=el)}
//                className={`inline-block ${char === " " ? "mx-1" : ""} ${
//                  // "TO" should be red -> indexes 8 and 9
//                  (i === 8 || i === 9) ? "text-red-600" :
//                  // "GRIM" should be green -> indexes 11–14
//                  (i >= 11 && i <= 14) ? "text-green-600" :
//                  "text-black"
//                }`}
//              >
//              {char}
//            </span>
//          ))}
//       </h1>


//           <p className="text-gray-500 text-start mb-20 px-4 md:px-8">
//             Lorem Ipsum is simply dummy text of the printing and typesetting industry.
//           </p>

//           <div className="flex gap-3 justify-center">
//             <button className="bg-red-600 text-white p-3 rounded-md cursor-pointer">
//               {/* <FaGoogle /> */}
//               <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
//               </button>
//               {/* <h2>Google</h2> */}
//           </div>
//         </div>

//         {/* RIGHT PANEL */}
//         <div className="md:w-1/2 bg-gradient-to-br from-green-700 to-green-200 text-white p-8 flex flex-col justify-center">
//           <h2 className="text-3xl font-bold text-center mb-2">
//             {isLogin ? "GRIM" : "Create Account"}
//           </h2>
//           <p className="text-center mb-6">
//             {isLogin ? "Sign Into Your Account" : "Register a New Account"}
//           </p>

//           <form className="flex flex-col gap-4">
//             {!isLogin && (
//               <>
//                <input
//                 type="text"
//                 placeholder="Full Name"
//                 className="bg-transparent border-b border-gray-300 py-2 outline-none"
//               />
//               </>
//             )}

//               <input
//                 type="text"
//                 placeholder="User Name"
//                 className="bg-transparent border-b border-gray-300 py-2 outline-none"
//               />

//                {!isLogin && (
//               <>
//                 <input
//               type="email"
//               placeholder="Email Address"
//               className="bg-transparent border-b border-gray-300 py-2 outline-none"
//             />
//               </>
              
             
//             )}

//             <input
//               type="password"
//               placeholder="Password"
//               className="bg-transparent border-b border-gray-300 py-2 outline-none"
//             />

//             {isLogin && (
//               <div className="flex justify-between text-sm mt-2">
//                 <label className="flex items-center gap-2">
//                   <input type="checkbox" className="accent-green-400" /> Remember me
//                 </label>
//                 <span className="hover:text-gray-200 text-white cursor-pointer">
//                   Forgot Password?
//                 </span>
//               </div>
//             )}

//             <button className="mt-4 bg-green-600 hover:bg-green-800 py-3 rounded-full font-semibold">
//               {isLogin ? "LOGIN" : "REGISTER"}
//             </button>
//           </form>

//           <p className="text-center mt-6 text-sm">
//             {isLogin ? (
//               <>
//                 Don’t have an account?{" "}
//                 <span
//                   className="underline cursor-pointer text-gray-200 hover:text-white"
//                   onClick={() => setIsLogin(false)}
//                 >
//                   Register here
//                 </span>
//               </>
//             ) : (
//               <>
//                 Already have an account?{" "}
//                 <span
//                   className="underline cursor-pointer text-gray-200 hover:text-white"
//                   onClick={() => setIsLogin(true)}
//                 >
//                   Login here
//                 </span>
//               </>
//             )}
//           </p>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default Auth;


import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useNavigate } from "react-router-dom"; // ✅ added
import ParticleBackground from "../common/ParticleBackground";
import "../index.css";

const API = axios.create({
  baseURL: import.meta.env.VITE_AUTH_URL // e.g. http://localhost:8000/api/v1/auth
});

const Auth = () => {
  const navigate = useNavigate(); // ✅ for redirection
  const [isLogin, setIsLogin] = useState(true);
  const textRef = useRef([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Sign-in form
  const [signInForm, setSignInForm] = useState({
    username: "",
    password: ""
  });

  // Sign-up form
  const [signUpForm, setSignUpForm] = useState({
    fullname: "",
    username: "",
    email: "",
    password: ""
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

  // ✅ GOOGLE LOGIN
  const handleGoogleSuccess = async (credentialResponse) => {
    setErrorMsg("");
    setLoading(true);
    try {
      const token = credentialResponse?.credential;
      if (!token) throw new Error("No Google token returned");

      const res = await API.post("/google", { token });
      localStorage.setItem("token", res.data.token || res.data?.token);
      setLoading(false);
      navigate("/dashboard/admin"); // ✅ redirect after success
    } catch (err) {
      setLoading(false);
      setErrorMsg(err?.response?.data?.msg || err?.message || "Google login failed");
    }
  };

  const handleGoogleError = () => {
    setErrorMsg("Google Sign-in failed.");
  };

  // ✅ NORMAL LOGIN
  const handleLogin = async (e) => {
    e?.preventDefault();
    setErrorMsg("");
    setLoading(true);
    try {
      const { username, password } = signInForm;
      if (!username || !password) throw new Error("Username and password are required");
      const res = await API.post("/login", { username, password });
      localStorage.setItem("token", res.data.token || res.data?.token);
      setLoading(false);
      navigate("/admin"); // ✅ redirect after success
    } catch (err) {
      setLoading(false);
      setErrorMsg(err?.response?.data?.msg || err?.message || "Login failed");
    }
  };

  // REGISTER
  const handleRegister = async (e) => {
    e?.preventDefault();
    setErrorMsg("");
    setLoading(true);
    try {
      const { fullname, username, email, password } = signUpForm;
      if (!fullname || !username || !email || !password) throw new Error("All fields required");
      const res = await API.post("/register", { fullname, username, email, password });
      localStorage.setItem("token", res.data.token || res.data?.token || "");
      setLoading(false);
      setIsLogin(true);
    } catch (err) {
      setLoading(false);
      setErrorMsg(err?.response?.data?.message || err?.response?.data?.msg || err?.message || "Register failed");
    }
  };

  return (
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
              <GoogleLogin onSuccess={handleGoogleSuccess} onError={handleGoogleError} />
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
  );
};

export default Auth;
