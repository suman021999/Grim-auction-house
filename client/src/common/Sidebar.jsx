import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { CircleUserRound,  History, MessageSquare, Plus} from "lucide-react";
import logo from "../../public/logos/logo.png";
import { HiOutlineUserGroup } from "react-icons/hi2";
const Sidebar = () => {
  const [active, setActive] = useState("auctions");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const menuItems = [
    { id: "admin", label: "Admin", icon: <CircleUserRound size={18} /> , path: "/admin" },
    { id: "user", label: "My Profile", icon: <HiOutlineUserGroup  size={18} /> , path: "/user" },
    // { id: "bids", label: "My Bids", icon: <History size={18} />, path: "/my_bid" },
    // { id: "settings", label: "Settings", icon: <Settings size={18} />, path: "/settings" },
    { id: "bids", label: "All Bids", icon: <History size={18} />, path: "/all_Bids" },
    { id: "messages", label: "Messages", icon: <MessageSquare size={18} />, path: "/message" },
    
  ];

  return (
    <aside
      className="flex flex-col md:w-64 bg-customGreen1 text-customGreen7 font-[font4] justify-between md:fixed md:left-0 md:top-0 fixed bottom-0 w-full h-16 md:h-screen z-50"
    >
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
                    isActive ? "bg-customGreen2" : "hover:text-customGreen6"
                  }`
                }
              >
                {item.icon} {item.label}
              </NavLink>
            ))}
            <Link to='/create' className="flex bg-customGreen2 hover:text-customGreen6 w-44 m-4 py-2 px-4 rounded-lg justify-between mt-6">
            <button type="button">Create</button>
            <Plus />
          </Link>
          </nav>

          
        </div>

        {/* User Avatar with Dropdown (Desktop) */}
        <div className="relative p-4 border-t-2 border-customGreen6 flex items-center gap-3">
          <img
            src="https://i.pravatar.cc/40"
            alt="User"
            className="w-10 h-10 rounded-full cursor-pointer"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          />
          <div className="text-sm">
            <p className="font-semibold">John Doe</p>
            <p className="text-xs text-customGreen6">john.doe@example.com</p>
          </div>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute bottom-16 right-4 bg-white rounded-lg shadow-lg p-3 w-40">
              <p className="text-gray-700 font-medium">suman_patra</p>
              <button className="text-red-500 mt-2 hover:underline">
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>

    {/* Mobile Bottom Nav */}
       <div className="md:hidden flex justify-around items-center bg-customGreen1 h-16 relative">
       
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
       
         {/* ✅ Create Button in Mobile Sidebar */}
         <Link 
           to="/create" 
           className="flex flex-col items-center justify-center text-xs text-customGreen7 hover:text-customGreen6"
         >
           <Plus size={18} />
           Create
         </Link>
       
         {/* Mobile Avatar */}
         <div className="relative flex flex-col items-center justify-center text-xs">
           <img
             src="https://i.pravatar.cc/40"
             alt="User"
             className="w-8 h-8 rounded-full cursor-pointer"
             onClick={() => setIsDropdownOpen(!isDropdownOpen)}
           />
           Profile
       
           {isDropdownOpen && (
             <div className="absolute bottom-16 right-0 bg-white rounded-lg shadow-lg p-3 w-40">
               <p className="text-gray-700 font-medium">suman_patra</p>
               <button className="text-red-500 mt-2 hover:underline">
                 Sign out
               </button>
             </div>
           )}
         </div>
       </div>

    </aside>
  );
};

export default Sidebar;
