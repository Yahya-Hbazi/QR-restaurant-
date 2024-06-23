import React from "react";
import Navbar from "./components/Navbar/Navbar"; // Adjusted import path
import Sidebar from "./components/sidebar/Sidebar";
import Add from "./pages/Add/Add";
import List from "./pages/List/List";
import Orders from "./pages/Orders/Orders";
import { Route, Routes } from "react-router-dom";
import "./App.css"; // Import global styles
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Qrcodetables from "./pages/qrcodetables/Qrcodetables";

const App = () => {
  const url = "http://localhost:4000";
  return (
    <div>
      <ToastContainer />
      <Navbar />
      <hr />
      <div className="app-content">
        <Sidebar />
        <div className="main-content">
          <Routes>
            <Route path="/add" element={<Add url={url} />} />
            <Route path="/list" element={<List url={url} />} />
            <Route path="/orders" element={<Orders url={url} />} />
            <Route path="/qrcodetables" element={<Qrcodetables url={url} />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
