import { Facebook, Instagram, Linkedin, Mail, Phone, Twitter } from "lucide-react";
import React from "react";

const Contact = () => {
  return (
    <footer
      id="contact"
      className="bg-darkBg py-10 rounded-t-3xl shadow-2xl"
      style={{
        backgroundImage: `linear-gradient(rgba(20, 26, 14, 0.8), rgba(79, 164, 9, 0.8))`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="lg:max-w-[90vw] md:max-w-6xl max-w-4xl mx-auto px-8 md:px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {/* Contact Section */}
        <div className="flex flex-col items-center text-center mb-8 sm:mb-0 sm:items-start sm:text-left">
          <h2 className="font-[font3] text-4xl text-customGreen2 mb-3">Contact</h2>
          <div className="font-[font1] text-2xl flex items-center gap-2 mb-2 text-customGreen1">
            <Phone size={18} className="shrink-0" />
            <span className="whitespace-nowrap">+91 93257 74310</span>
          </div>
          <div className="font-[font3] text-2xl flex items-start lg:items-center gap-2 mb-4 text-customGreen1">
            <Mail size={18} className="shrink-0" />
            <span className="whitespace-nowrap flex flex-wrap ">
              Grim<span className="font-[font1]">2321</span>@gmail.com
            </span>
          </div>
          <div className="flex gap-3 text-customGreen1">
            <a href="#"><Twitter size={20} /></a>
            <a href="#"><Instagram size={20} /></a>
            <a href="#"><Facebook size={20} /></a>
            <a href="#"><Linkedin size={20} /></a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col items-center text-center mb-8 sm:mb-0 sm:items-start sm:text-left">
          <h2 className="font-[font3] text-4xl text-customGreen2 mb-3">Quick Links</h2>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-customGreen2 text-2xl font-[font3] text-customGreen1">Home</a></li>
            <li><a href="#browse" className="hover:text-customGreen2 text-2xl font-[font3] text-customGreen1">Browse the Categories</a></li>
            <li><a href="#about" className="hover:text-customGreen2 text-2xl font-[font3] text-customGreen1">About</a></li>
            <li><a href="#auctions" className="hover:text-customGreen2 text-2xl font-[font3] text-customGreen1">Auctions</a></li>
            <li><a href="#how-it-works" className="hover:text-customGreen2 text-2xl font-[font3] text-customGreen1">How it Works</a></li>
            <li><a href="#contact" className="hover:text-customGreen2 text-2xl font-[font3] text-customGreen1">Contact</a></li>
          </ul>
        </div>

        {/* User Section */}
        <div className="flex flex-col items-center text-center mb-8 sm:mb-0 sm:items-start sm:text-left">
          <h2 className="font-[font3] text-4xl text-customGreen2 mb-3">User</h2>
          <ul className="space-y-2 flex  md:flex-col lg:flex-row gap-2">
            <li>
              <a href="/signin" className="bg-midBg font-[font3] rounded-lg px-4 py-2 h-44 text-customGreen2">
                Sign In
              </a>
            </li>
            <li>
              <a href="/signup" className="bg-lightBg font-[font3] rounded-lg px-4 py-2 h-44 text-customGreen2">
                Sign Up
              </a>
            </li>
          </ul>
        </div>

        {/* Feedback Form */}
        <div className="flex flex-col items-center text-center mb-8 sm:mb-0 sm:items-start sm:text-left">
          <h2 className="font-[font3] text-4xl text-customGreen2 mb-3">Feedback</h2>
          <form className="space-y-3">
            <input
              type="email"
              placeholder="Your email (optional)"
              className="w-full p-2 rounded-md border placeholder:text-customGreen2 font-[font4] text-customGreen2 placeholder:font-[font3] outline-0 border-midBg focus:ring-2 focus:ring-customGreen2"
            />
            <textarea
              placeholder="Share feedback or suggestions..."
              rows="3"
              className="w-full p-2 resize-none placeholder:text-customGreen2 font-[font4] placeholder:font-[font3] text-customGreen2 outline-0 rounded-md border border-midBg focus:ring-2 focus:ring-customGreen2"
            />
            <button
              type="submit"
              className="w-full bg-darkBg font-[font3] text-customGreen6 hover:text-customGreen7 py-2 rounded-md hover:bg-customGreen2 transition"
            >
              Submit Feedback
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-8 text-center font-[font3] text-2xl text-customGreen2">
        © <span className="font-[font1]">{new Date().getFullYear()}</span> AuctionHub. All rights reserved.
      </div>
    </footer>
  );
};

export default Contact;


