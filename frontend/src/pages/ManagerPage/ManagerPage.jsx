import React from "react";
import NavbarManager from "../../components/NavbarManager/NavbarManager"; // Adjusted import path
import SidebarManager from "../../components/SidebarManager/SidebarManager";

import "./ManagerPage.css"; // Import global styles
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ManagerPage = () => {
  const url = "http://localhost:4000";
  return (
    <div>
      <ToastContainer />
      <NavbarManager />
      <hr />

      <SidebarManager />
    </div>
  );
};

export default ManagerPage;
