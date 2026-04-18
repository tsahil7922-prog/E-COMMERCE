import React from "react";
import Footer from "../CommonUI/Footer";
import { Outlet } from "react-router-dom";
import Header from "../CommonUI/Header";

const UserLayout = () => {
  return (
    <>
      {/* Header */}
      {/* Main Content */}
      {/* Footer */}
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default UserLayout;
