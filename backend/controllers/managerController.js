import bcrypt from "bcrypt";
import validator from "validator";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};
// Delete manager
const deleteManager = async (req, res) => {
  const managerId = req.params.id;

  try {
    const deletedManager = await userModel.findByIdAndDelete(managerId);
    if (!deletedManager) {
      return res.status(404).json({ message: "Manager not found" });
    }
    res.json({ message: "Manager deleted successfully" });
  } catch (error) {
    console.error("Error deleting manager:", error);
    res.status(500).json({ message: "Server error" });
  }
};
// Fetch all managers
const getAllManagers = async (req, res) => {
  try {
    const managers = await userModel.find({ role: "MANAGER" }); // Query to find all users with role "MANAGER"
    res.json(managers);
  } catch (error) {
    console.error("Error fetching managers:", error);
    res.status(500).json({ message: "Server error" });
  }
};
// register manager
const registerManager = async (req, res) => {
  const { name, password, email } = req.body;

  try {
    // Checking if manager already exists
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "Manager already exists" });
    }

    // Validating email format and strong password
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email",
      });
    }

    if (password.length <= 8) {
      return res.json({
        success: false,
        message: "Please enter a strong password",
      });
    }

    // Hashing manager password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newManager = new userModel({
      name: name,
      email: email,
      password: hashedPassword,
      role: "MANAGER",
    });

    const manager = await newManager.save();
    const token = createToken(manager._id);
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

export { registerManager, getAllManagers, deleteManager };
