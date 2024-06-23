import React, { useContext, useEffect, useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const PlaceOrder = ({ table = null }) => {
  const { getTotalCartAmount, token, foodList, cartItems, url } =
    useContext(StoreContext);

  const [data, setData] = useState({
    tableNumber: table ? table : "",
    peopleNumber: "",
    preferedTime: "",
    foodDetails: "",
    clientName: "",
    clientPhone: "",
    clientEmail: "",
    preferedWaiter: "",
    specialOrder: "",
    payMethod: "cash",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const navigate = useNavigate();
  const subtotal = getTotalCartAmount();
  const serviceCharge = (subtotal * 0.05).toFixed(2); // Calculate 5% service charge
  const total = (subtotal + parseFloat(serviceCharge)).toFixed(2);

  // Calculate the minimum time allowed for the time input
  const getMinTime = () => {
    const date = new Date();
    date.setMinutes(date.getMinutes() + 20);
    return date.toTimeString().slice(0, 5);
  };

  const placeOrder = async (event) => {
    event.preventDefault();
    let orderItems = [];
    foodList.forEach((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = { ...item };
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    });
    let orderData = {
      table: data,
      items: orderItems,
      amount: parseFloat(total),
    };

    try {
      const response = await axios.post(url + "/api/order/place", orderData, {
        headers: { token },
      });
      if (response.data.success) {
        const { session_url } = response.data;
        window.location.replace(session_url);
      } else {
        console.error("Error placing order");
      }
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/cart");
    } else if (getTotalCartAmount() === 0) {
      navigate("/cart");
    }
  }, [token]);

  return (
    <form onSubmit={placeOrder} className="place-order">
      <div className="place-order-left">
        <p className="title">Table Information</p>
        <div className="input-field-container">
          <div className="input-field">
            <label htmlFor="tableNumber">Table Number*</label>
            <input
              required
              name="tableNumber"
              onChange={onChangeHandler}
              value={data.tableNumber}
              type="number"
              id="tableNumber"
              placeholder="Enter Table Number"
              disabled={table}
            />
          </div>
          <div className="input-field">
            <label htmlFor="peopleNumber">Number of People</label>
            <input
              required
              name="peopleNumber"
              onChange={onChangeHandler}
              value={data.peopleNumber}
              type="number"
              id="peopleNumber"
              placeholder="Enter Number of People"
            />
          </div>
        </div>
        <div className="input-field">
          <label htmlFor="preferedTime">Preferred Time for Food</label>
          <input
            required
            name="preferedTime"
            onChange={onChangeHandler}
            value={data.preferedTime}
            type="time"
            id="preferedTime"
            min={getMinTime()}
          />
        </div>
        <div className="input-field-container">
          <div className="input-field">
            <label htmlFor="foodDetails">More details?</label>
            <input
              required
              name="foodDetails"
              onChange={onChangeHandler}
              value={data.foodDetails}
              type="text"
              id="foodDetails"
              placeholder="Enter More Details"
            />
          </div>
          <div className="input-field">
            <label htmlFor="clientName">Name</label>
            <input
              required
              name="clientName"
              onChange={onChangeHandler}
              value={data.clientName}
              type="text"
              id="clientName"
              placeholder="Enter Your Name"
            />
          </div>
        </div>
        <div className="input-field-container">
          <div className="input-field">
            <label htmlFor="clientPhone">Phone Number</label>
            <input
              required
              name="clientPhone"
              onChange={onChangeHandler}
              value={data.clientPhone}
              type="tel"
              id="clientPhone"
              placeholder="Enter Phone Number"
            />
          </div>
          <div className="input-field">
            <label htmlFor="clientEmail">Email</label>
            <input
              required
              name="clientEmail"
              onChange={onChangeHandler}
              value={data.clientEmail}
              type="email"
              id="clientEmail"
              placeholder="Enter Email Address"
            />
          </div>
        </div>
        <div className="input-field-container">
          <div className="input-field">
            <label htmlFor="preferedWaiter">Preferred Waiter</label>
            <input
              required
              name="preferedWaiter"
              onChange={onChangeHandler}
              value={data.preferedWaiter}
              type="text"
              id="preferedWaiter"
              placeholder="Enter Preferred Waiter"
            />
          </div>
          <div className="input-field">
            <label htmlFor="specialOrder">Special Order</label>
            <input
              required
              name="specialOrder"
              onChange={onChangeHandler}
              value={data.specialOrder}
              type="text"
              id="specialOrder"
              placeholder="Enter Special Order Details"
            />
          </div>
        </div>
        <div className="input-field">
          <label htmlFor="payMethod">Payment Method</label>
          <select
            name="payMethod"
            onChange={onChangeHandler}
            value={data.payMethod}
            id="payMethod"
          >
            <option value="cash">Cash</option>
            <option value="online">Online</option>
          </select>
        </div>
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>My Total</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>TND {subtotal}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Service Charge 5%</p>
              <p>TND {serviceCharge}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>TND {total}</b>
            </div>
          </div>
          <button type="submit">PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
