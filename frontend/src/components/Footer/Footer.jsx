import React from "react";
import "./Footer.css";
import { assets } from "../../assets/assets";
const Footer = () => {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <h3 style={{ color: "#00BFFF" }}>MyQrMenu.</h3>

          <p>
            MyQrMenu ordering solutions increase Restaurants revenue by
            digitizing the dining and room service orders
          </p>
          <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="" />
            <img src={assets.twitter_icon} alt="" />
            <img src={assets.linkedin_icon} alt="" />
          </div>
        </div>
        <div className="footer-content-right">
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>+216 99 818 938</li>
            <li>MyQrMenu@gmail.com</li>
          </ul>
        </div>
        <div className="footer-content-center">
          <h2>COMPANY</h2>
          <ul>
            <li>Home</li>
            <li>About us</li>
            <li>Privacy policy</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className="gooter-copyright">
        Copyright 2024 @MyQrMenu - All Right Reserved
      </p>
    </div>
  );
};

export default Footer;
