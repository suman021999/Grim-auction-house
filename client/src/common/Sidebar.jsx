import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Gavel, History, MessageSquare, Settings } from "lucide-react";
import logo from '../../public/logos/logo.png';

const Sidebar = () => {
  const [active, setActive] = useState("auctions");

  const menuItems = [
    { id: "auctions", label: "Auctions", icon: <Gavel size={18} />, path: "/" },
    { id: "bids", label: "My Bids", icon: <History size={18} />, path: "/my_bid" },
    { id: "messages", label: "Messages", icon: <MessageSquare size={18} />, path: "/message" },
    { id: "settings", label: "Settings", icon: <Settings size={18} />, path: "/settings" },
  ];

  return (
    <aside className="flex flex-col md:w-64 bg-customGreen1 text-customGreen7 font-[font4] justify-between
                      md:fixed md:left-0 md:top-0  
                      fixed bottom-0 w-full h-16 md:h-screen z-999">
      
      {/* Desktop Sidebar */}
      <div className="hidden md:flex flex-col justify-between h-full">
        <div>
          <div className="p-6 flex items-center justify-start">
            <img className="w-16 h-16" src={logo} alt="Logo" />
            <h1 className="text-2xl font-[font3]">Grim</h1>
          </div>

          <nav className="flex flex-col gap-2 px-4">
            {menuItems.map((item) => (
              <NavLink
                key={item.id}
                to={item.path}
                onClick={() => setActive(item.id)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                    isActive
                      ? "bg-customGreen2"
                      : "hover:text-customGreen6"
                  }`
                }
              >
                {item.icon} {item.label}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="p-4 border-t-2 border-customGreen6 flex items-center gap-3">
          <img
            src="https://i.pravatar.cc/40"
            alt="User"
            className="w-10 h-10 rounded-full"
          />
          <div className="text-sm">
            <p className="font-semibold">John Doe</p>
            <p className="text-xs text-customGreen6">john.doe@example.com</p>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Nav */}
      <div className="md:hidden flex justify-around items-center bg-customGreen1 h-16">
        {menuItems.map((item) => (
          <NavLink
            key={item.id}
            to={item.path}
            onClick={() => setActive(item.id)}
            className={({ isActive }) =>
              `flex cursor-pointer flex-col items-center justify-center text-xs ${
                isActive
                  ? "text-customGreen6"
                  : "text-customGreen7 hover:text-customGreen6"
              }`
            }
          >
            {item.icon}
            {item.label}
          </NavLink>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;


