import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <div className="header">
      <div className="header-contents">
        <h2>Order your favourite food here</h2>
        <p>
          Choose from our diverse menu of delicious dishes made with the finest
          ingredients. Enjoy fresh produce, succulent meats, and vibrant spices,
          all crafted to delight your palate. Join us for an unforgettable
          dining experience.
        </p>
        <button>View Menu</button>
      </div>
    </div>
  );
};

export default Header;
