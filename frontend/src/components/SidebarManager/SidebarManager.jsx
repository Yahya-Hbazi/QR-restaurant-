import React from "react";
import "./SidebarManager.css";
import { assets } from "../../assets/assets";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-options">
        <NavLink
          to="/add"
          className={({ isActive }) =>
            isActive ? "sidebar-option active" : "sidebar-option"
          }
        >
          <img src={assets.add_icon} alt="Add Items" />
          <p>Add Items</p>
        </NavLink>
        <NavLink
          to="/list"
          className={({ isActive }) =>
            isActive ? "sidebar-option active" : "sidebar-option"
          }
        >
          <img src={assets.order_icon} alt="List Items" />
          <p>List Items</p>
        </NavLink>
        <NavLink
          to="/orders"
          className={({ isActive }) =>
            isActive ? "sidebar-option active" : "sidebar-option"
          }
        >
          <img src={assets.order_icon} alt="Orders" />
          <p>Orders</p>
        </NavLink>
        <NavLink
          to="/qrcodetables"
          className={({ isActive }) =>
            isActive ? "sidebar-option active" : "sidebar-option"
          }
        >
          <i className="fa-solid fa-qrcode icon"></i>
          <p>QR Code Tables</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
