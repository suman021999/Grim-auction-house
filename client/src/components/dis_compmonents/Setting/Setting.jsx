import React, { useState } from "react";

const Setting = () => {
  const [profileVisibility, setProfileVisibility] = useState("Public");
  const [dataSharing, setDataSharing] = useState(false);

  return (
    <div className="  text-black px-4 sm:px-8 py-6 overflow-x-hidden">
      
      
      <h1 className="text-2xl  font-bold mb-6">My Settings</h1>

      {/* Account Settings */}
      <div className="bg-white rounded-xl shadow p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">Account Settings</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Username</label>
            <input
              type="text"
              defaultValue="john.doe"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-black"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Email Address</label>
            <input
              type="email"
              defaultValue="john.doe@example.com"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-black"
            />
          </div>

          <div className="flex justify-between flex-col sm:flex-row gap-3">
            <input
              className="bg-gray-100 hover:bg-gray-200 text-blue-600 font-medium px-4 py-2 rounded-lg border border-gray-300 outline-0 md:w-1/2"
              type="password"
            />
            <button className="bg-gray-100 hover:bg-gray-200 text-blue-600 font-medium px-4 py-2 rounded-lg border border-gray-300">
              Update Password
            </button>
          </div>
        </div>
      </div>

   

      {/* Privacy */}
      <div className="bg-white rounded-xl shadow p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">Privacy</h2>

        <div className="mb-4 flex justify-between items-center">
          <label className="block text-sm font-medium">Profile Visibility</label>
          <select
            value={profileVisibility}
            onChange={(e) => setProfileVisibility(e.target.value)}
            className="mt-1 w-44 block border border-gray-300 rounded-md p-2 text-black"
          >
            <option>Public</option>
            <option>Private</option>
          </select>
        </div>

        <div className="flex items-center justify-between py-2">
          <span>Data Sharing</span>
          <button
            onClick={() => setDataSharing(!dataSharing)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
              dataSharing ? "bg-blue-600" : "bg-gray-400"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                dataSharing ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-4 ">
        <button className="px-4 py-2 rounded-lg bg-amber-100 hover:bg-gray-200">
          Cancel
        </button>
        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default Setting;





