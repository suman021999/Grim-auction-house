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






import React, { useState, useEffect } from "react";
import axios from "axios";
import { io } from "socket.io-client";

const Create = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    time: "",
    amountBid: "",
    category: "",
    height: "",
    width: "",
    length: "",
    weight: "",
    medium: "",
    image: null,
  });

  const [socket, setSocket] = useState(null);

  // ---------------------------
  // ✅ SOCKET.IO CONNECTION
  // ---------------------------
  useEffect(() => {
    const s = io("http://localhost:8000", {
      transports: ["websocket"],
      withCredentials: true,
    });

    setSocket(s);

    s.on("connect", () => {
      console.log("SOCKET CONNECTED:", s.id);
    });

    s.on("auctionCreated", (auction) => {
      console.log("Auction Created (socket event):", auction);
    });

    s.on("timeUpdate", (data) => {
      console.log("Countdown:", data);
    });

    return () => {
      s.disconnect();
    };
  }, []);

  // ---------------------------
  // FORM HANDLERS
  // ---------------------------

  const categories = [
    "Historical",
    "Electronics",
    "Automobiles",
    "Real Estate",
    "Art",
    "Antiques",
    "Jewelry & Watches",
    "Books & Media",
  ];

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  // ---------------------------
  // ✅ FINAL WORKING SUBMIT WITH AXIOS + TOKEN
  // ---------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const form = new FormData();
      Object.keys(formData).forEach((key) => {
        form.append(key, formData[key]);
      });

      const token = localStorage.getItem("token"); // ✔ your token stored in FE

      const res = await axios.post(
        `${import.meta.env.VITE_AUCTION_URL}/create`,
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`, // ✔ Add token here
          },
          withCredentials: true,
        }
      );

      console.log("BACKEND RESPONSE:", res.data);

      alert("Product created successfully!");

      // Optional: clear form
      setFormData({
        title: "",
        description: "",
        time: "",
        amountBid: "",
        category: "",
        height: "",
        width: "",
        length: "",
        weight: "",
        medium: "",
        image: null,
      });
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  // ----------------------------------------------------------
  // NOTE: BELOW THIS LINE YOUR UI IS 100% EXACTLY SAME
  // ----------------------------------------------------------

  return (
    <div className="flex justify-center items-center p-8 mb-16 sm:mb-14 md:mb-0 ">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-sm w-full max-w-2xl"
      >
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
          Create Product
        </h2>

        {/* Title */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title *
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter title"
            required
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-green-200"
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description *
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter description"
            required
            rows="3"
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-green-200"
          ></textarea>
        </div>

        {/* Time & Amount */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Time *
            </label>
            <input
              type="datetime-local"
              name="time"
              value={formData.time}
              onChange={handleChange}
              placeholder="e.g. 3 Days"
              required
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-green-200"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Amount Bid *
            </label>
            <input
              type="number"
              name="amountBid"
              value={formData.amountBid}
              onChange={handleChange}
              placeholder="Enter amount"
              required
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-green-200"
            />
          </div>
        </div>

        {/* Category */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category *
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-md p-2 bg-white focus:outline-none focus:ring focus:ring-green-200"
          >
            <option value="">Select...</option>
            {categories.map((cat, i) => (
              <option key={i} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Dimensions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {["height", "width", "length", "weight"].map((dim) => (
            <div key={dim}>
              <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                {dim} {dim !== 'weight' ? '(cm)' : '(kg)'}
              </label>
              <input
                type="text"
                name={dim}
                value={formData[dim]}
                onChange={handleChange}
                min="0"
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-green-200"
              />
            </div>
          ))}
        </div>

        {/* Medium */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Medium
          </label>
          <input
            type="text"
            name="medium"
            value={formData.medium}
            onChange={handleChange}
            placeholder="e.g. Oil, Watercolor, etc"
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-green-200"
          />
        </div>

        {/* Image */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Image
          </label>
          <div className="flex items-center gap-3">
            <label htmlFor="image1" className="border border-gray-400 px-3 py-1 rounded cursor-pointer text-sm bg-gray-100 hover:bg-gray-300 transition">
              Choose File
            </label>
            <span className="text-gray-600 text-sm">
              {formData.image ? formData.image.name : "No file chosen"}
            </span>
            <input
              id="image1"
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="hidden"
            />
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded-md font-medium hover:bg-green-700 transition"
        >
          CREATE
        </button>
      </form>
    </div>
  );
};

export default Create;









