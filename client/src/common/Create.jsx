import React, { useState, useEffect } from "react";
import axios from "axios";
import { socket } from "../../common/socket";
import toast from "react-hot-toast";

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



  // ---------------------------
  // ✅ SOCKET.IO CONNECTION
  // ---------------------------
  useEffect(() => {
  
    socket.on("connect", () => {
      console.log("SOCKET CONNECTED:", s.id);
    });

    socket.on("auctionCreated", (auction) => {
      console.log("Auction Created (socket event):", auction);
    });

    socket.on("timeUpdate", (data) => {
      console.log("Countdown:", data);
    });

    return () => {
      socket.off("auctionCreated");
      socket.off("timeUpdate");
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

    // ✅ Convert selected local time to UTC
    const utcTime = new Date(formData.time).toISOString();

    // ✅ Append all fields
    Object.keys(formData).forEach((key) => {
      if (key === "time") {
        form.append("time", utcTime); // use converted time
      } else {
        form.append(key, formData[key]);
      }
    });

    const token = localStorage.getItem("token");

    const res = await axios.post(
      `${import.meta.env.VITE_AUCTION_URL}/create`,
      form,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );

    console.log("Server response:", res.data);

    toast.success("Product created successfully!");

  } catch (err) {
    console.error(err);
    toast.error("Something went wrong");
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
            className="w-full border resize-none border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-green-200"
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
                {dim} {dim !== "weight" ? "(cm)" : "(kg)"}
              </label>
              <input
                type="number"
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
            <label
              htmlFor="image1"
              className="border border-gray-400 px-3 py-1 rounded cursor-pointer text-sm bg-gray-100 hover:bg-gray-300 transition"
            >
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
