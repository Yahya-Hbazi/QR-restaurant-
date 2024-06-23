import React, { useContext } from "react";
import "./FoodDisplay.css";
import { StoreContext } from "../../context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";

const FoodDisplay = ({ category }) => {
  const { foodList } = useContext(StoreContext);

  const filteredFoodList =
    category === "All"
      ? foodList
      : foodList?.filter((item) => item.category === category);

  return (
    <div className="food-display" id="food-display">
      <h2>Our Best Dishes</h2>
      <div className="food-display-list">
        {filteredFoodList ? (
          filteredFoodList.map((item, index) => (
            <FoodItem
              key={index}
              id={item._id}
              name={item.name}
              description={item.description}
              price={item.price}
              image={item.image}
            />
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default FoodDisplay;
