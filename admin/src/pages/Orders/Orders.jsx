import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./Orders.css";
import { assets } from "../../assets/assets"; // Correct import for named export

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);
  const [orderStatus, setOrderStatus] = useState(""); // State to handle select option

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(url + "/api/order/list");
      if (response.data.success) {
        setOrders(response.data.data);
        console.log(response.data.data);
      } else {
        toast.error("Error fetching orders");
      }
    } catch (error) {
      toast.error("Error: " + error.message);
    }
  };
  const statusHandler = async (event, orderId) => {
    const response = await axios.post(url + "/api/order/status", {
      orderId,
      status: event.target.value,
    });
    if (response.data.success) {
      await fetchAllOrders();
    }
  };
  useEffect(() => {
    fetchAllOrders();
    const interval = setInterval(() => {
      fetchAllOrders(); // Fetch orders every 30 seconds (adjust as needed)
    }, 10000); // 30 seconds interval
    return () => clearInterval(interval); // Cleanup function to clear interval on component unmount
  }, []);

  return (
    <div className="order-add">
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.map((order, index) => (
          <div key={index} className="order-item-container">
            <div className="order-item">
              <img src={assets.parcel_icon} alt="Parcel Icon" />
            </div>
            <p className="order-item-food">
              {order.items.map((item, itemIndex) => (
                <span key={itemIndex}>
                  {item.name} x {item.quantity}
                  {itemIndex < order.items.length - 1 && ", "}
                </span>
              ))}
            </p>
            <p className="order-item-table">
              Table Number: {order.table.tableNumber}
            </p>
            <p className="order-item-people">
              <strong>Number of People:</strong> {order.table.peopleNumber}
            </p>
            <p className="order-item-time">
              <strong>Preferred Time:</strong> {order.table.preferedTime}
            </p>
            <p className="order-item-payment">
              <strong>Payment Method:</strong> {order.table.payMethod}
            </p>
            <p className="order-item-status">
              <strong>Status:</strong> {order.status}
            </p>
            <div>
              <p>Items: {order.items.length}</p>
              <p>TND{order.amount}</p>
            </div>
            <div className="order-item-status-select">
              <select
                onChange={(event) => statusHandler(event, order._id)}
                value={order.status}
              >
                <option value="Food Processing">Food Processing</option>
                <option value="Ready To Serve">Ready To Serve</option>
                <option value="Served">Served</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
