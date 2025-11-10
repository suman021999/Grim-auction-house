import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Auth from "../auth/Auth";
import Dashboard from "./Dashboard";
import Display from "./Display";


const MainPage = () => {
  return (
    <>
      <Routes>
        {/* Landing / Banner page */}
        <Route path="/" element={<Display />} />

        {/* Login page */}
        <Route path="/login" element={<Auth />} />

        {/* Protected dashboard pages */}
        <Route path="*" element={<Dashboard />} />

        {/* Redirect unknown routes to home */}
        <Route path="*" element={<Navigate to="/*" replace />} />
      </Routes>
    </>
  );
};

export default MainPage;
