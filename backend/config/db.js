import mongoose from "mongoose";
export const connectDB = async () => {
  await mongoose
    .connect(
      "mongodb+srv://yahiahbazi:yahyahbazi1998@cluster0.ghy5ip1.mongodb.net/food-order"
    )
    .then(() => console.log("DB Connected"));
};
