import React, { useEffect, useState } from "react";
import axios from "axios";
import { Modal } from "./Modal";
import { socket } from "../../../common/socket";

export default function Admin() {

  const [activeTab, setActiveTab] = useState("history");
  const [data, setData] = useState({
    history: [],
    review: [],
    summary: {}
  });

  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const API = import.meta.env.VITE_AUCTION_URL;


useEffect(() => {

  loadDashboard(); // ✅ ALWAYS LOAD DATA ON PAGE OPEN

  if (!socket.connected) {
    socket.connect();
  }

  socket.on("connect", () => {
    console.log("Admin socket connected:", socket.id);
  });

  socket.on("auctionCreated", (auction) => {
    console.log("New auction created:", auction);
    loadDashboard();
  });

  socket.on("bidUpdated", (data) => {
    console.log("Bid updated:", data);
    loadDashboard();
  });

  socket.on("auctionEnded", (auctionId) => {
    console.log("Auction ended:", auctionId);
    loadDashboard();
  });

  return () => {
    socket.off("connect");
    socket.off("auctionCreated");
    socket.off("bidUpdated");
    socket.off("auctionEnded");
  };

}, []);


  async function loadDashboard() {

    try {

      setLoading(true);

      const token = localStorage.getItem("token");

      const res = await axios.get(`${API}/admin/dashboard`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        withCredentials: true
      });

      const historyData = res.data.history || {};
      const reviewData = res.data.review || {};

      const historyArr = [
        ...(historyData.active || []).map(i => ({ ...i, status: "Active" })),
        ...(historyData.ended || []).map(i => ({ ...i, status: "Ended" }))
      ];

      const reviewArr = [
        ...(reviewData.pending || []).map(i => ({ ...i, status: "Pending" })),
        ...(reviewData.approved || []).map(i => ({ ...i, status: "Approved" })),
        ...(reviewData.rejected || []).map(i => ({ ...i, status: "Rejected" }))
      ];

      setData({
        history: historyArr,
        review: reviewArr,
        summary: res.data.summary || {}
      });

    } catch (error) {

      console.log("Dashboard error:", error.response?.data || error.message);

      setData({
        history: [],
        review: [],
        summary: {}
      });

    } finally {

      setLoading(false);

    }

  }


  const items = activeTab === "history"
    ? data.history || []
    : data.review || [];


  const handleStatusClick = (row) => {

    if (activeTab === "review" && row.status?.toLowerCase() === "pending") {
      setSelectedItem(row);
      setShowModal(true);
    }

  };


  const handleApprove = async () => {

    try {

      const token = localStorage.getItem("token");

      await axios.put(
        `${API}/admin/approve/${selectedItem.id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          },
          withCredentials: true
        }
      );

      setShowModal(false);
      loadDashboard();

    } catch (err) {

      console.log("Approve error", err.response?.data || err.message);

    }

  };


  const handleReject = async () => {

    try {

      const token = localStorage.getItem("token");

      await axios.put(
        `${API}/admin/reject/${selectedItem.id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          },
          withCredentials: true
        }
      );

      setShowModal(false);
      loadDashboard();

    } catch (err) {

      console.log("Reject error", err.response?.data || err.message);

    }

  };


  if (loading) {

    return (
      <div className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );

  }


  return (

    <div className="bg-gray-50 min-h-screen">

      <main className="flex-1 p-4 md:p-8">

        <div className="mb-6 flex flex-col md:flex-row gap-4 md:items-center md:justify-between">

          <div className="flex justify-between items-center w-full gap-3">

            <div className="bg-white rounded-full p-1 shadow">

              <div className="flex">

                <button
                  onClick={() => setActiveTab("history")}
                  className={`px-4 py-2 text-black rounded-full font-medium ${activeTab === "history" ? "bg-slate-100" : ""}`}
                >
                  History
                </button>

                <button
                  onClick={() => setActiveTab("review")}
                  className={`px-4 py-2 text-black rounded-full font-medium ${activeTab === "review" ? "bg-slate-100" : ""}`}
                >
                  Review
                </button>

              </div>

            </div>

          </div>


          <div className="flex gap-3 md:hidden">

            <SummaryCard
              title="Active"
              value={data.summary?.activeAuctions}
            />

            <SummaryCard
              title="Users"
              value={data.summary?.activeUsers}
            />

            <SummaryCard
              title="Revenue"
              value={`$${data.summary?.revenue || 0}`}
            />

          </div>

        </div>


        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          <section className="lg:col-span-2 bg-white rounded-xl p-4 shadow">

            <h4 className="text-sm text-gray-500 mb-3">
              {activeTab === "history"
                ? "Bids History"
                : "Review Queue"}
            </h4>


            <div className="overflow-scroll no-scrollbar">

              <table className="w-full min-w-[700px]">

                <thead>

                  <tr className="text-left text-xs text-black">

                    <th className="py-2">Username</th>
                    <th className="py-2">Image</th>
                    <th className="py-2">Name</th>
                    <th className="py-2">Status</th>
                    <th className="py-2">Bid</th>

                    {activeTab === "history" &&
                      <th className="py-2">Current Bid</th>
                    }

                  </tr>

                </thead>


                <tbody>

                  {items.length > 0 ? (

                    items.map((row) => (

                      <tr
                        key={row.id}
                        className="align-top border-t border-gray-100"
                      >

                        <td className="py-4">{row.username}</td>

                        <td className="py-4">

                          <div className="w-12 h-8 bg-gray-100 rounded">

                            {row.image &&
                              <img
                                src={row.image}
                                className="w-full h-full object-cover rounded"
                              />
                            }

                          </div>

                        </td>

                        <td className="py-4">
                          {row.name}
                        </td>

                        <td
                          className="py-4"
                          onClick={() => handleStatusClick(row)}
                        >
                          <StatusBadge status={row.status} />
                        </td>

                        <td className="py-4">
                          ${row.bid}
                        </td>

                        {activeTab === "history" &&
                          <td className="py-4">
                            ${row.currentBid}
                          </td>
                        }

                      </tr>

                    ))

                  ) : (

                    <tr>
                      <td
                        colSpan={6}
                        className="py-8 text-center text-gray-500"
                      >
                        No items found
                      </td>
                    </tr>

                  )}

                </tbody>

              </table>

            </div>

          </section>


          <aside>

            <div className="space-y-4 sticky top-8 hidden md:block">

              <div className="bg-white p-4 rounded-xl shadow">

                <h5 className="text-sm text-gray-500">
                  Summary
                </h5>

                <div className="mt-4 flex flex-col gap-3">

                  <SummaryCard
                    title="Active auctions"
                    value={data.summary?.activeAuctions}
                  />

                  <SummaryCard
                    title="Active users"
                    value={data.summary?.activeUsers}
                  />

                  <SummaryCard
                    title="Revenue"
                    value={`$${data.summary?.revenue || 0}`}
                  />

                </div>

              </div>

            </div>

          </aside>

        </div>

      </main>


      <Modal
        open={showModal}
        item={selectedItem}
        onApprove={handleApprove}
        onReject={handleReject}
      />

    </div>

  );

}


const SummaryCard = ({ title, value }) => (

  <div className="bg-white rounded-xl shadow p-4 min-w-[120px]">

    <p className="text-xs text-black">
      {title}
    </p>

    <p className="mt-2 text-xl text-black font-semibold">
      {value || 0}
    </p>

  </div>

);


const StatusBadge = ({ status }) => {

  const s = (status || "").toLowerCase();

  const base =
    "px-3 py-1 rounded-full text-xs font-medium inline-block cursor-pointer";

  if (s === "pending")
    return <span className={`${base} bg-yellow-500 text-black`}>{status}</span>;

  if (s === "approved")
    return <span className={`${base} bg-green-500 text-white`}>{status}</span>;

  if (s === "rejected")
    return <span className={`${base} bg-red-500 text-white`}>{status}</span>;

  if (s === "ended")
    return <span className={`${base} bg-gray-500 text-white`}>{status}</span>;

  return <span className={`${base} bg-gray-100 text-gray-700`}>{status}</span>;

};