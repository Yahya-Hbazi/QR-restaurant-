import React from "react";
import Navbar from "../Navbar/Navbar"; // Adjusted path
import Sidebar from "../Sidebar/Sidebar"; // Adjusted path
import "./Layout.css";

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Navbar />
      <div className="main-content">
        <Sidebar />
        <div className="content">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
