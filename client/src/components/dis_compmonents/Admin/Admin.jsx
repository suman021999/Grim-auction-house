// Admin.jsx
import { Bell } from "lucide-react";
import React, { useEffect, useState } from "react";
const mockData = {
  history: [
    {
      id: 1,
      username: "liam",
      image: "", // url
      name: "Vintage Grandfather Clock",
      status: "Winning",
      bid: 200,
      currentBid: 200,
    },
    {
      id: 2,
      username: "ava",
      image: "",
      name: "Antique Vase",
      status: "Outbid",
      bid: 150,
      currentBid: 175,
    },
    {
      id: 3,
      username: "noah",
      image: "",
      name: "Painting",
      status: "Ended",
      bid: 500,
      currentBid: 500,
    },
  ],
  review: [
    {
      id: 101,
      username: "liam",
      image: "",
      name: "Old Camera",
      status: "Pending",
      bid: 200,
    },
  ],
  summary: {
    activeAuctions: 12,
    activeUsers: 332,
    revenue: 12300,
  },
};

const StatusBadge = ({ status }) => {
  // normalize
  const s = (status || "").toLowerCase();
  const base = "px-3 py-1 rounded-full text-xs font-medium inline-block";
if (s === "winning") return <span className={`${base} bg-green-500 text-amber-50`}> {status} </span>;
if (s === "outbid") return <span className={`${base} bg-red-500 text-amber-50`}> {status} </span>;
if (s === "pending") return <span className={`${base} bg-yellow-500 text-amber-50`}> {status} </span>;
if (s === "ended") return <span className={`${base} bg-gray-500 text-amber-50`}> {status} </span>;
  return <span className={`${base} bg-gray-50 text-gray-700`}>{status}</span>;
};

const SummaryCard = ({ title, value }) => (
  <div className="bg-white  rounded-2xl shadow-sm p-4 min-w-[120px]">
    <p className="text-xs text-black">{title}</p>
    <p className="mt-2 text-xl text-black font-semibold">{value}</p>
  </div>
);

export default function Admin() {
  const [activeTab, setActiveTab] = useState("history"); // 'history' | 'review'
  const [data, setData] = useState({ history: [], review: [], summary: {} });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    async function load() {
      setLoading(true);
      try {
        // Attempt to fetch real data from backend
        const res = await fetch("/api/admin/dashboard");
        if (!res.ok) throw new Error("Network response not ok");
        const json = await res.json();
        if (mounted) setData(json);
      } catch (err) {
        // Fallback to mock (useful during frontend dev)
        if (mounted) {
          console.warn("Using mock data (fetch failed):", err);
          setData(mockData);
          setError(err.message);
        }
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();

    return () => {
      mounted = false;
    };
  }, []);

  const items = activeTab === "history" ? data.history || [] : data.review || [];

  return (
    <div className=" bg-gray-50  dark:text-slate-100">
      <div className="flex">
        

       

    

        {/* Main content */}
        <main className="flex-1 p-4 md:p-8">
          {/* Header (tabs + optional notices) */}
          <div className="mb-6 flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
            <div className="flex justify-between items-center w-full gap-3">
              <div className="bg-white  rounded-full p-1 shadow">
                <div className="flex">
                  <button
                    onClick={() => setActiveTab("history")}
                    className={`px-4 py-2 text-black rounded-full font-medium ${activeTab === "history" ? "bg-slate-100 " : "bg-transparent"}`}
                  >
                    History
                  </button>
                  <button
                    onClick={() => setActiveTab("review")}
                    className={`px-4 py-2 text-black rounded-full font-medium ${activeTab === "review" ? "bg-slate-100 " : "bg-transparent"}`}
                  >
                    Review
                  </button>
                </div>
              </div>
              <div className="hover:bg-gray-300 flex justify-center items-center w-10 h-10 rounded-full">
                <Bell size={18} className="text-black " />
              </div>
            </div>

            {/* Summary on top for small screens (desktop shows it on the right) */}
            <div className="flex gap-3 md:hidden">
              <SummaryCard title="Active" value={data.summary?.activeAuctions ?? "—"} />
              <SummaryCard title="Users" value={data.summary?.activeUsers ?? "—"} />
              <SummaryCard title="Revenue" value={data.summary?.revenue ? `$${data.summary.revenue}` : "—"} />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left / center: table list (span 2 on lg) */}
            <section className="lg:col-span-2 bg-white  rounded-2xl p-4 shadow-sm">
              <h4 className="text-sm text-gray-500 mb-3">{activeTab === "history" ? "Bids History" : "Review Queue"}</h4>

              <div className="overflow-scroll no-scrollbar">
                <table className="w-full min-w-[700px]">
                  <thead>
                    <tr className="text-left text-xs text-black">
                      <th className="py-2">Username</th>
                      <th className="py-2">Image</th>
                      <th className="py-2">Name</th>
                      <th className="py-2">Status</th>
                      <th className="py-2">Bid</th>
                      {activeTab === "history" && <th className="py-2">Current Bid</th>}
                    </tr>
                  </thead>
                  <tbody>
                    {items.length === 0 && (
                      <tr>
                        <td colSpan={activeTab === "history" ? 6 : 5} className="py-8 text-center text-sm text-gray-500">
                          No records
                        </td>
                      </tr>
                    )}

                    {items.map((row) => (
                      <tr key={row.id} className="align-top border-t last:border-b">
                        <td className="py-4">
                          <div className="text-sm text-black font-medium">{row.username}</div>
                        </td>
                        <td className="py-4">
                          <div className="w-12 h-8 bg-gray-100  rounded flex items-center justify-center text-xs text-gray-500">
                            {row.image ? <img src={row.image} alt={row.name} className="w-full h-full object-cover rounded" /> : "img"}
                          </div>
                        </td>
                        <td className="py-4">
                          <div className="text-sm text-black truncate max-w-[140px]">{row.name}</div>
                        </td>
                        <td className="py-4 text-black">
                          <StatusBadge status={row.status} />
                        </td>
                        <td className="py-4">
                          <div className="text-sm text-black font-medium">${row.bid}</div>
                        </td>
                        {activeTab === "history" && (
                          <td className="py-4">
                            <div className="text-sm text-black">${row.currentBid ?? "-"}</div>
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Right summary panel (hidden on small, visible on lg) */}
            <aside >
              <div className="space-y-4 sticky top-8">
                <div className="bg-white  p-4 rounded-2xl shadow-sm hidden md:block">
                  <h5 className="text-sm text-gray-500">Summary</h5>
                  <div className="mt-4 flex flex-col gap-3">
                    <SummaryCard title="Active auctions" value={data.summary?.activeAuctions ?? "—"} />
                    <SummaryCard title="Active users" value={data.summary?.activeUsers ?? "—"} />
                    <SummaryCard title="Revenue" value={data.summary?.revenue ? `$${data.summary.revenue}` : "—"} />
                  </div>
                </div>

                {activeTab === "review" && (
  <div className="bg-white p-4 rounded-2xl shadow-sm">
    <h5 className="text-sm text-black mb-2">Quick actions</h5>
    <div className="flex flex-col gap-2">
      <button className="w-full py-2 text-black rounded-lg border">Approve selected</button>
      <button className="w-full py-2 text-black rounded-lg border">Remove selected</button>
    </div>
  </div>
)}


              </div>
            </aside>

          </div>
        </main>
      </div>
    </div>
  );
}

