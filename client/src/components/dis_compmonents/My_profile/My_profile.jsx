import React from "react";
import Setting from "../Setting/Setting";
import { ChevronRight, Gavel } from "lucide-react";
import { Link } from "react-router-dom";

const My_profile = () => {
  return (
    <>
      <Setting />

      <div className="px-4 sm:px-8 py-6 overflow-x-hidden mb-20 sm:mb-15">
        <Link
          to="/my_bid"
          className="group w-full sm:w-1/2 p-5 flex items-center justify-between
          bg-white rounded-2xl shadow-md hover:shadow-xl
          border border-gray-100 hover:border-gray-200
          transition-all duration-300"
        >
          {/* Left Content */}
          <div className="flex items-center gap-4">
            <div className="bg-blue-100 text-blue-600 p-3 rounded-xl">
              <Gavel size={20} />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-800">My Bids</h2>
              <p className="text-sm text-gray-500">
                View auctions you participated in
              </p>
            </div>
          </div>

          {/* Arrow */}
          <ChevronRight className="text-gray-400 group-hover:translate-x-1 transition" />
        </Link>
      </div>
    </>
  );
};

export default My_profile;
