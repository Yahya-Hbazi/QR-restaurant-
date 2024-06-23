import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// login admin
const loginAdmin = async (req, res) => {
  const { email, password } = req.body; // Corrected typo here
  try {
    const admin = await userModel.findOne({ email });
    if (!admin) {
      return res.json({ success: false, message: "admin does not exist" });
    }

    if (admin.role != "ADMIN") {
      return res.json({ success: false, message: "admin does not exist" });
    }
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid credentials" });
    }
    const token = createToken(admin._id);
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

export { loginAdmin };
