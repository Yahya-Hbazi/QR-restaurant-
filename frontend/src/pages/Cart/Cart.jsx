import React, { useContext } from "react";
import "./Cart.css";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItems, foodList, removeFromCart, getTotalCartAmount, url } =
    useContext(StoreContext);

  const calculateTotalPrice = (itemId, quantity) => {
    const item = foodList.find((item) => item._id === itemId);
    return item ? item.price * quantity : 0;
  };

  const subtotal = getTotalCartAmount();
  const serviceCharge = (subtotal * 0.05).toFixed(2); // Calculate 5% service charge
  const total = (subtotal + parseFloat(serviceCharge)).toFixed(2);
  const navigate = useNavigate();
  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {foodList &&
          foodList.map((item) => {
            const quantity = cartItems[item._id] || 0;
            if (quantity > 0) {
              const total = calculateTotalPrice(item._id, quantity);
              return (
                <div className="cart-items-item" key={item._id}>
                  <img src={url + "/images/" + item.image} alt="" />
                  <p>{item.name}</p>
                  <p>TND {item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>TND {item.price * cartItems[item._id]}</p>
                  <p onClick={() => removeFromCart(item._id)} className="cross">
                    x
                  </p>
                </div>
              );
            } else {
              return null;
            }
          })}
      </div>
      <div className="cart-bottom">
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
          <button onClick={() => navigate("/order")}>PROCEED TO ORDER</button>
        </div>
        <div className="cart-voucher">
          <p>If you have an access voucher, enter it here</p>
          <div className="cart-voucher-input">
            <input type="text" placeholder="access voucher" />
            <button>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
