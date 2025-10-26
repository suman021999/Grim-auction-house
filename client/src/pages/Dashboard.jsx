import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Sidebar from '../common/Sidebar'
import Auction from '../components/dis_compmonents/Auction/Auction'
import Bid from '../components/dis_compmonents/Bid/Bid'
import Message from '../components/dis_compmonents/Message/Message'
import Setting from '../components/dis_compmonents/Setting/Setting'

const Dashboard = () => {
  return (
    <div className="flex">
      <Sidebar />

      {/* Main content */}
      <main className="flex-1 md:ml-64 ">
        <Routes>
          <Route path="/auction" element={<Auction />} />
          <Route path="/my_bid" element={<Bid />} />
          <Route path="/message" element={<Message />} />
          <Route path="/settings" element={<Setting />} />
        </Routes>
      </main>
    </div>
  )
}

export default Dashboard

