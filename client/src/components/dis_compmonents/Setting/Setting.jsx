import React, { useState } from "react";

const Setting = () => {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);
  const [smsAlerts, setSmsAlerts] = useState(true);
  const [profileVisibility, setProfileVisibility] = useState("Public");
  const [dataSharing, setDataSharing] = useState(false);

  return (
<>
    <div className="space-y-6 m-4">
      <h1 className="text-2xl font-bold">Settings</h1>

      {/* Account Settings */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Account Settings</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Username</label>
            <input
              type="text"
              defaultValue="john.doe"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Email Address</label>
            <input
              type="email"
              defaultValue="john.doe@example.com"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>

          <div className="flex justify-between">
            <button className="text-blue-600 font-medium px-4 py-2">
            Change Password
          </button>
          <button className="bg-gray-100 hover:bg-gray-200 text-blue-600 font-medium px-4 py-2 rounded-lg border border-gray-300">
            Update Password
          </button>
          </div>

          
        </div>
      </div>

      {/* Notification Preferences */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Notification Preferences</h2>

        <div className="flex items-center justify-between py-2">
          <span>Email Notifications</span>
          <button
            onClick={() => setEmailNotifications(!emailNotifications)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
              emailNotifications ? "bg-blue-600" : "bg-gray-300"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                emailNotifications ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>

        <div className="flex items-center justify-between py-2">
          <span>Push Notifications</span>
          <button
            onClick={() => setPushNotifications(!pushNotifications)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
              pushNotifications ? "bg-blue-600" : "bg-gray-300"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                pushNotifications ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>

        <div className="flex items-center justify-between py-2">
          <span>SMS Alerts</span>
          <button
            onClick={() => setSmsAlerts(!smsAlerts)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
              smsAlerts ? "bg-blue-600" : "bg-gray-300"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                smsAlerts ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>
      </div>

      {/* Privacy */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Privacy</h2>

        <div className="mb-4 flex justify-between">
          <label className="block text-sm font-medium">Profile Visibility</label>
          <select
            value={profileVisibility}
            onChange={(e) => setProfileVisibility(e.target.value)}
            className="mt-1 block w-68 border border-gray-300 rounded-md p-2"
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
              dataSharing ? "bg-blue-600" : "bg-gray-300"
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

      {/* Buttons */}
      <div className="flex justify-end gap-4">
        <button className="px-4 py-2 border rounded-lg">Cancel</button>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">
          Save Changes
        </button>
      </div>
    </div>
</>
  );
};

export default Setting;


