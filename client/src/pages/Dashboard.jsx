import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Sidebar from '../common/Sidebar'
import Auction from '../components/dis_compmonents/Auction/Auction'
import AllBids from '../components/dis_compmonents/Bid/AllBids'
import MyBid from '../components/dis_compmonents/Bid/MyBid'
import Message from '../components/dis_compmonents/Message/Message'
import Setting from '../components/dis_compmonents/Setting/Setting'
import Admin from '../components/dis_compmonents/Admin/Admin'



const Dashboard = () => {
  return (
    <div className="flex">
      <Sidebar />

      {/* Main content */}
      <main className="flex-1 md:ml-64 ">
        <Routes>
          <Route path="/admin" element={<Admin />} />
          <Route path="/auction" element={<Auction />} />
          <Route path="/my_bid" element={<MyBid/>} />
          <Route path="/all_Bids" element={<AllBids/>} />
          <Route path="/message" element={<Message />} />
          <Route path="/settings" element={<Setting />} />
        </Routes>
      </main>
    </div>
  )
}

export default Dashboard

