import React, { useContext } from "react";
import "./FoodItem.css";
import { assets } from "../../assets/assets"; // Correctly import assets
import { StoreContext } from "../../context/StoreContext";

const FoodItem = ({ id, name, price, description, image }) => {
  const { cartItems, addToCart, removeFromCart, url } =
    useContext(StoreContext);

  // Construct the image URL
  const imageUrl = `${url}/images/${image}`;

  // Log the image URL for debugging purposes
  console.log("Constructed Image URL:", imageUrl);

  return (
    <div className="food-item">
      <div className="food-item-img-container">
        <img
          className="food-item-image"
          src={imageUrl}
          alt={name}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = assets.default_image; //  Provide a default image in case of error
          }}
        />
        {!cartItems[id] ? (
          <img
            className="add"
            onClick={() => addToCart(id)}
            src={assets.add_icon_white}
            alt="Add icon"
          />
        ) : (
          <div className="food-item-counter">
            <img
              onClick={() => removeFromCart(id)}
              src={assets.remove_icon_red}
              alt="Remove icon"
            />
            <p>{cartItems[id]}</p>
            <img
              onClick={() => addToCart(id)}
              src={assets.add_icon_green}
              alt="Add icon"
            />
          </div>
        )}
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>

          <img src={assets.rating_starts} alt="Rating" />
        </div>
        <p className="food-item-desc">{description}</p>
        <p className="food-item-price">TND {price}</p>
      </div>
    </div>
  );
};

export default FoodItem;
