import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiEye, FiEyeOff } from "react-icons/fi";

const Setting = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
const token = localStorage.getItem("token");


// console.log("LOCAL STORAGE RAW:", localStorage.getItem("user"));
// console.log("PARSED:", storedUser);
// console.log("TOKEN:", token);


  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const [profileVisibility, setProfileVisibility] = useState("public");
  const [dataSharing, setDataSharing] = useState(false);

  // const token = storedUser.token;
  // FETCH SETTINGS
 useEffect(() => {
  if (!token) return;

  const fetchSettings = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_SETTING_URL}/get`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = res.data;

      setUsername(data.username || "");
      setEmail(data.email || "");
      setProfileVisibility(data.profileVisibility || "public");
      setDataSharing(data.dataSharing || false);

    } catch (error) {
      console.error("Error fetching settings:", error);
    }
  };

  fetchSettings();
}, [token]);

  // UPDATE PASSWORD
  const handlePasswordUpdate = async () => {
     console.log("TOKEN:", token);
    try {
      await axios.put(
        `${import.meta.env.VITE_SETTING_URL}/password`,
        {
          currentPassword,
          newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Password updated successfully");
      setCurrentPassword("");
      setNewPassword("");
    } catch (error) {
      console.error(error);
      alert("Password update failed");
    }
  };

  // SAVE PRIVACY SETTINGS
  const handleSaveSettings = async () => {
    try {
      await axios.put(
        `${import.meta.env.VITE_SETTING_URL}/privacy`,
        {
          profileVisibility,
          dataSharing,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Settings saved");
    } catch (error) {
      console.error(error);
      alert("Failed to save settings");
    }
  };

  return (
    <div className="text-black px-4 sm:px-8 py-6 overflow-x-hidden">
      <h1 className="text-2xl font-bold mb-6">My Settings</h1>

      {/* Account Settings */}
      <div className="bg-white rounded-xl shadow p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">Account Settings</h2>

        <div className="space-y-4">
          {/* Username */}
          <div>
            <label className="block text-sm font-medium">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-black"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-black"
            />
          </div>

          {/* Password Section */}
          <div className="flex justify-between flex-col sm:flex-row gap-3">
            <div className="flex flex-col gap-3 w-full">

              {/* Current Password */}
              <div className="relative w-full md:w-1/2">
                <input
                  type={showCurrentPassword ? "text" : "password"}
                  placeholder="Current Password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="bg-gray-100 hover:bg-gray-200 text-black px-4 py-2 rounded-lg border border-gray-300 outline-0 w-full pr-10"
                />

                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute right-3 top-2.5 text-gray-500"
                >
                  {showCurrentPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>

              {/* New Password */}
              <div className="flex flex-col md:flex-row gap-3 justify-between w-full">
                <div className="relative w-full md:w-1/2">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="bg-gray-100 hover:bg-gray-200 text-black px-4 py-2 rounded-lg border border-gray-300 outline-0 w-full pr-10"
                  />

                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-2.5 text-gray-500"
                  >
                    {showNewPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>

                <button
                  onClick={handlePasswordUpdate}
                  className="bg-gray-100 hover:bg-gray-200 text-blue-600 font-medium px-4 py-2 rounded-lg border border-gray-300"
                >
                  Update Password
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Privacy */}
      <div className="bg-white rounded-xl shadow p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">Privacy</h2>

        <div className="mb-4 flex justify-between items-center">
          <label className="block text-sm font-medium">
            Profile Visibility
          </label>

          <select
            value={profileVisibility.toLowerCase()}
            onChange={(e) => setProfileVisibility(e.target.value)}
            className="mt-1 w-44 block border border-gray-300 rounded-md p-2 text-black"
          >
            <option value="public">Public</option>
            <option value="private">Private</option>
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
      <div className="flex justify-end gap-4">
        <button className="px-4 py-2 rounded-lg bg-amber-100 hover:bg-gray-200">
          Cancel
        </button>

        <button
          onClick={handleSaveSettings}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default Setting;