import React from "react";
import { Link } from "react-router-dom";
import { FaUserTie, FaUserEdit, FaChartBar } from "react-icons/fa";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>Menu</h2>
      <ul>
        <li>
          <Link to="/managers">
            <FaUserTie /> Managers
          </Link>
        </li>
        <li>
          <Link to="/edit-managers">
            <FaUserEdit /> Edit Manager
          </Link>
        </li>
        <li>
          <Link to="/statistics">
            <FaChartBar /> Statistics
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
