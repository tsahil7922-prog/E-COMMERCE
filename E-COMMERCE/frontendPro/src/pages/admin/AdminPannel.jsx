import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import AdminSideBar from "../../component/Admin/AdminSideBar";
import { Outlet } from "react-router-dom";
const AdminPannel = () => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const toggleSideBar = () => {
    setIsSideBarOpen(!isSideBarOpen);
  };
  return (
    <div className="flex flex-col min-h-screen md:flex-row relative">
      {/* Mobile toggle button */}
      <div className="flex md:hidden p-4 bg-gray-900 text-white z-20">
        <button onClick={toggleSideBar}>
          <FaBars size={24} />
        </button>
        <h1 className="ml-4 text-xl font-medium">Admin Dashboard</h1>
      </div>
      {/* overlay for mobile sidebar */}
      {isSideBarOpen && (
        <div
          className="fixed inset-0 z-10 bg-black bg-opacity-50 md:hidden"
          onClick={toggleSideBar}
        ></div>
      )}
      {/* sidebar */}
      <div
        className={`bg-gray-900 w-64 min-h-screen text-white absolute md:relative transform ${isSideBarOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 md:translate-x-0 md:static md:block z-20`}
      >
        {/* sidebar */}
        <AdminSideBar />
      </div>
      {/* Maincontent */}
      <div className="p-6 overflow-auto flex-grow">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminPannel;
