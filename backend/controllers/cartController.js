import userModel from "../models/userModel.js";

// Add items to user cart
const addToCart = async (req, res) => {
  try {
    const userData = await userModel.findOne({ _id: req.body.userId });
    let cartData = userData.cartData || {};

    if (cartData[req.body.itemId]) {
      cartData[req.body.itemId] += 1;
    } else {
      cartData[req.body.itemId] = 1;
    }

    await userModel.findByIdAndUpdate(req.body.userId, { cartData });
    res.json({ success: true, message: "Added to cart" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error adding to cart" });
  }
};

// Remove items from user cart
const removeFromCart = async (req, res) => {
  try {
    const userData = await userModel.findOne({ _id: req.body.userId });
    let cartData = userData.cartData || {};

    if (cartData[req.body.itemId]) {
      if (cartData[req.body.itemId] > 1) {
        cartData[req.body.itemId] -= 1;
      } else {
        delete cartData[req.body.itemId];
      }

      await userModel.findByIdAndUpdate(req.body.userId, { cartData });
      res.json({ success: true, message: "Removed from cart" });
    } else {
      res.json({ success: false, message: "Item not in cart" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error removing from cart" });
  }
};

// Fetch user cart
const getCart = async (req, res) => {
  try {
    const userData = await userModel.findOne({ _id: req.body.userId });
    if (userData) {
      res.json({ success: true, cartData: userData.cartData });
    } else {
      res.json({ success: false, message: "User not found" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error fetching cart" });
  }
};

export { addToCart, removeFromCart, getCart };
