import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Sidebar from '../common/Sidebar'


const Dashboard = () => {
  return (
    <>
      <section>
        <Sidebar/>

        <Routes>
          <Route path='' element/>
          <Route path='' element/>
          <Route path='' element/>
          <Route path='' element/>
        </Routes>
      </section>
    </>
  )
}

export default Dashboard
