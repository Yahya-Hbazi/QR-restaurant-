import React, { useState } from "react";
import axios from "axios";
import "./Managers.css"; // Ensure the correct import path

const Managers = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newUrl = "http://localhost:4000/api/manager/register"; // Your backend endpoint

    try {
      const response = await axios.post(newUrl, { name, email, password });
      if (response.data.success) {
        alert("Registration successful!");
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Registration error:", error);
      alert("Failed to register. Please try again later.");
    }

    setName("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className="managers-container">
      <h1>Add New Manager</h1>
      <form onSubmit={handleSubmit} className="manager-form">
        <div className="form-control">
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-control">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-control">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Manager</button>
      </form>
    </div>
  );
};

export default Managers;
