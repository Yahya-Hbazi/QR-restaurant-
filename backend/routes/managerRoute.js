import express from "express";
import {
  registerManager,
  getAllManagers,
  deleteManager,
} from "../controllers/managerController.js"; // Updated import
import { loginUser } from "../controllers/userController.js";
const managerRouter = express.Router(); // Changed router name
managerRouter.post("/register", registerManager); // Changed route for register
managerRouter.post("/login", loginUser); // Changed route for login
managerRouter.get("/", getAllManagers);
managerRouter.delete("/:id", deleteManager); // Route for deleting manager

export default managerRouter; // Exporting updated router
