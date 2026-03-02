// import React, { useState } from "react";

// const Create = () => {
//   const [formData, setFormData] = useState({
//     title: "",
//     description: "",
//     time: "",
//     amountBid: "",
//     category: "",
//     height: "",
//     width: "",
//     length: "",
//     weight: "",
//     medium: "",
//     image: null,
//   });

//   const categories = [
//     "Historical",
//     "Electronics",
//     "Automobiles",
//     "Real Estate",
//     "Art",
//     "Antiques",
//     "Jewelry & Watches",
//     "Books & Media",
//   ];

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: files ? files[0] : value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log(formData);
//     alert("Product created successfully!");
//   };

//   return (
//     <div className="flex justify-center items-center p-8 mb-16 sm:mb-14 md:mb-0 ">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white p-8 rounded-lg shadow-sm w-full max-w-2xl"
//       >
//         <h2 className="text-2xl font-semibold mb-6 text-gray-800">
//           Create Product
//         </h2>

//         {/* Title */}
//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Title *
//           </label>
//           <input
//             type="text"
//             name="title"
//             value={formData.title}
//             onChange={handleChange}
//             placeholder="Enter title"
//             required
//             className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-green-200"
//           />
//         </div>

//         {/* Description */}
//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Description *
//           </label>
//           <textarea
//             name="description"
//             value={formData.description}
//             onChange={handleChange}
//             placeholder="Enter description"
//             required
//             rows="3"
//             className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-green-200"
//           ></textarea>
//         </div>

//         {/* Time & Amount */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Time *
//             </label>
//             <input
//               type="text"
//               name="time"
//               value={formData.time}
//               onChange={handleChange}
//               placeholder="e.g. 3 Days"
//               required
//               className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-green-200"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Amount Bid *
//             </label>
//             <input
//               type="number"
//               name="amountBid"
//               value={formData.amountBid}
//               onChange={handleChange}
//               placeholder="Enter amount"
//               required
//               className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-green-200"
//             />
//           </div>
//         </div>

//         {/* Category */}
//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Category *
//           </label>
//           <select
//             name="category"
//             value={formData.category}
//             onChange={handleChange}
//             required
//             className="w-full border border-gray-300 rounded-md p-2 bg-white focus:outline-none focus:ring focus:ring-green-200"
//           >
//             <option value="">Select...</option>
//             {categories.map((cat, i) => (
//               <option key={i} value={cat}>
//                 {cat}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Dimensions Section */}
//              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//           {["height", "width", "length", "weight"].map((dim) => (
//             <div key={dim}>
//               <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
//                 {dim}
//               </label>
//               <input
//                 type="text"
//                 name={dim}
//                 value={formData[dim]}
//                 onChange={handleChange}
//                 min="0"
//                 className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-green-200"
//               />
//             </div>
//           ))}
//         </div>

//         {/* Medium */}
//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-700 mb-1">Medium</label>
//           <input
//             type="text"
//             name="medium"
//             value={formData.medium}
//             onChange={handleChange}
//             placeholder="e.g. Oil, Watercolor, etc"
//             className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-green-200"
//           />
//         </div>

//           {/* Image Upload Styled */}
//         <div className="mb-6">
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Image
//           </label>
//           <div className="flex items-center gap-3">
//             <label
              
//               className="border border-gray-400 px-3 py-1 rounded cursor-pointer text-sm bg-gray-100 hover:bg-gray-300 transition"
//             >
//               Choose File
//             </label>
//             <span className="text-gray-600 text-sm">
//               {formData.image ? formData.image.name : "No file chosen"}
//             </span>
//             <input
//               id="image1"
//               type="file"
//               name="image"
//               accept="image/*"
//               onChange={handleChange}
//               className="hidden"
//             />
//           </div>
//         </div>


//         {/* Submit Button */}
//         <button
//           type="submit"
//           className="w-full bg-green-600 text-white py-2 rounded-md font-medium hover:bg-green-700 transition"
//         >
//           CREATE
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Create;




// import React, { useState } from "react";
// import { NavLink } from "react-router-dom";
// import { CircleUserRound, History, MessageSquare, Plus } from "lucide-react";
// import logo from "/logos/logo.png";
// import { HiOutlineUserGroup } from "react-icons/hi2";

// const Sidebar = () => {
//   const [active, setActive] = useState("admin || user");
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);

//   const menuItems = [
//     { id: "admin", label: "Admin", icon: <CircleUserRound size={18} />, path: "/admin" },
//     { id: "user", label: "My Profile", icon: <HiOutlineUserGroup size={18} />, path: "/user" },
//     { id: "bids", label: "All Bids", icon: <History size={18} />, path: "/all_Bids" },
//     { id: "messages", label: "Messages", icon: <MessageSquare size={18} />, path: "/message" },
//   ];

//   return (
//     <aside
//       className="flex flex-col md:w-64 bg-customGreen1 text-customGreen7 font-[font4] justify-between md:fixed md:left-0 md:top-0 fixed bottom-0 w-full h-16 md:h-screen z-50"
//     >
//       {/* Desktop Sidebar */}
//       <div className="hidden md:flex flex-col justify-between h-full">
//         <div>
//           <div className="p-6 flex items-center justify-start">
//             <img className="w-16 h-16" src={logo} alt="Logo" />
//             <h1 className="text-2xl font-[font3]">Grim</h1>
//           </div>

//           <nav className="flex flex-col gap-2 px-4">
//             {menuItems.map((item) => (
//               <NavLink
//                 key={item.id}
//                 to={item.path}
//                 onClick={() => setActive(item.id)}
//                 className={({ isActive }) =>
//                   `flex items-center gap-3 px-4 py-2 rounded-lg transition ${
//                     isActive ? "bg-customGreen2" : "hover:text-customGreen6"
//                   }`
//                 }
//               >
//                 {item.icon} {item.label}
//               </NavLink>
//             ))}

//             {/* ✅ Desktop Create button with active state */}
//             <NavLink
//               to="/create"
//               className={({ isActive }) =>
//                 `flex w-44 m-4 py-2 px-4 rounded-lg justify-between mt-6 ${
//                   isActive ? "bg-customGreen2" : "hover:text-customGreen6 bg-customGreen3"
//                 }`
//               }
//             >
//               <button type="button">Create</button>
//               <Plus />
//             </NavLink>
//           </nav>
//         </div>

//         {/* User Avatar */}
//         <div className="relative p-4 border-t-2 border-customGreen6 flex items-center gap-3">
//           <img
//             src="https://i.pravatar.cc/40"
//             alt="User"
//             className="w-10 h-10 rounded-full cursor-pointer"
//             onClick={() => setIsDropdownOpen(!isDropdownOpen)}
//           />
//           <div className="text-sm">
//             <p className="font-semibold">John Doe</p>
//             <p className="text-xs text-customGreen6">john.doe@example.com</p>
//           </div>

//           {isDropdownOpen && (
//             <div className="absolute bottom-16 right-4 bg-white rounded-lg shadow-lg p-3 w-40">
//               <p className="text-gray-700 font-medium">suman_patra</p>
//               <button className="text-red-500 mt-2 hover:underline">Sign out</button>
//             </div>
//           )}
//         </div>
        
//       </div>

//       {/* Mobile Bottom Nav */}
//       <div className="md:hidden flex justify-around items-center bg-customGreen1 h-16 relative">
//         {menuItems.map((item) => (
//           <NavLink
//             key={item.id}
//             to={item.path}
//             onClick={() => setActive(item.id)}
//             className={({ isActive }) =>
//               `flex cursor-pointer flex-col items-center justify-center text-xs ${
//                 isActive
//                   ? "text-customGreen6"
//                   : "text-customGreen7 hover:text-customGreen6"
//               }`
//             }
//           >
//             {item.icon}
//             {item.label}
//           </NavLink>
//         ))}

//         {/* ✅ Mobile Create button with active highlight */}
//         <NavLink
//           to="/create"
//           className={({ isActive }) =>
//             `flex flex-col items-center justify-center text-xs ${
//               isActive
//                 ? "text-customGreen6"
//                 : "text-customGreen7 hover:text-customGreen6"
//             }`
//           }
//         >
//           <Plus size={18} />
//           Create
//         </NavLink>

//         {/* Mobile Avatar */}
//         <div className="relative flex flex-col items-center justify-center text-xs">
//           <img
//             src="https://i.pravatar.cc/40"
//             alt="User"
//             className="w-8 h-8 rounded-full cursor-pointer"
//             onClick={() => setIsDropdownOpen(!isDropdownOpen)}
//           />
//           Profile

//           {isDropdownOpen && (
//             <div className="absolute bottom-16 right-0 bg-white rounded-lg shadow-lg p-3 w-40">
//               <p className="text-gray-700 font-medium">suman_patra</p>
//               <button className="text-red-500 mt-2 hover:underline">Sign out</button>
//             </div>
//           )}
//         </div>
//       </div>
//     </aside>
//   );
// };

// export default Sidebar;
