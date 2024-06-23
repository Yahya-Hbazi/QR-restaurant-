import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import Footer from "./components/Footer/Footer";
import LoginPopup from "./components/LoginPopup/LoginPopup";
import Verify from "./pages/verify/Verify";
import MyOrders from "./pages/MyOrders/MyOrders";
import ManagerPage from "./pages/ManagerPage/ManagerPage";
import Add from "./pages/Add/Add";
import List from "./pages/List/List";
import Orders from "./pages/Orders/Orders";
import Qrcodetables from "./pages/qrcodetables/Qrcodetables";

const App = () => {
  const url = "http://localhost:4000";
  const [showLogin, setShowLogin] = useState(false);
  const location = useLocation();
  const [table, setTable] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.has("table")) {
      setTable(params.get("table"));
    }
  }, [location.search]);

  useEffect(() => {
    if (table) {
      const params = new URLSearchParams(location.search);
      if (!params.has("table")) {
        params.set("table", table);
        navigate(`${location.pathname}?${params.toString()}`, {
          replace: true,
        });
      }
    }
  }, [table, location, navigate]);

  return (
    <>
      {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : <></>}
      <div className="app">
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<PlaceOrder table={table} />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/myorders" element={<MyOrders />} />
          <Route path="/manager" element={<ManagerPage />} />
          <Route path="/add" element={<Add url={url} />} />
          <Route path="/list" element={<List url={url} />} />
          <Route path="/orders" element={<Orders url={url} />} />
          <Route path="/qrcodetables" element={<Qrcodetables url={url} />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
