import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login/Login";
import Managers from "./pages/Managers/Managers";
import Layout from "./components/Layout/Layout";
import "./App.css";
import ManagerList from "./pages/ManagerList/ManagerList";
import Statistics from "./pages/Statistics/Statistics"; // Import Statistics component

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/managers"
            element={
              <Layout>
                <Managers />
              </Layout>
            }
          />
          <Route
            path="/edit-managers"
            element={
              <Layout>
                <ManagerList />
              </Layout>
            }
          />
          <Route
            path="/statistics"
            element={
              <Layout>
                <Statistics />
              </Layout>
            }
          />
          {/* Add more routes here if needed */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
