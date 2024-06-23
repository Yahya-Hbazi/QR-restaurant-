import mongoose from "mongoose";
const managerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cartData: { type: Object, default: {} },
    role: { type: String, required: true },
  },
  { minimize: false }
);
const managerModel =
  mongoose.models.manager || mongoose.model("manager", managerSchema);
export default managerModel;
