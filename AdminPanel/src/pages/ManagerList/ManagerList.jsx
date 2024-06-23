import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ManagerList.css"; // Import ManagerList.css for styling

const ManagerList = () => {
  const [managers, setManagers] = useState([]);

  // Fetch managers data from backend when component mounts
  useEffect(() => {
    const fetchManagers = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/manager"); // Adjust endpoint as per your backend route
        setManagers(response.data); // Assuming response.data is an array of manager objects
      } catch (error) {
        console.error("Error fetching managers:", error);
      }
    };

    fetchManagers();
  }, []); // Empty dependency array ensures useEffect runs only once

  // Function to fetch managers data
  const fetchManagers = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/manager");
      setManagers(response.data);
    } catch (error) {
      console.error("Error fetching managers:", error);
    }
  };

  // Sample managers data (mocked)
  const sampleManagers = [
    {
      _id: "1",
      name: "John Doe",
      email: "john@example.com",
      role: "MANAGER",
    },
    {
      _id: "2",
      name: "Jane Smith",
      email: "jane@example.com",
      role: "MANAGER",
    },
    {
      _id: "3",
      name: "Mike Johnson",
      email: "mike@example.com",
      role: "MANAGER",
    },
  ];

  // Use sample managers if actual data is not fetched yet
  const displayManagers = managers.length > 0 ? managers : sampleManagers;

  // Function to handle deletion of a manager
  const handleDeleteManager = async (managerId) => {
    try {
      // Send delete request to backend API
      await axios.delete(`http://localhost:4000/api/manager/${managerId}`);
      // After deletion, fetch updated list of managers
      fetchManagers();
    } catch (error) {
      console.error("Error deleting manager:", error);
    }
  };

  return (
    <div className="manager-list">
      <h1>Manager List</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {displayManagers.map((manager) => (
            <tr key={manager._id}>
              <td>{manager.name}</td>
              <td>{manager.email}</td>
              <td>{manager.role}</td>
              <td>
                <button onClick={() => handleDeleteManager(manager._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManagerList;
