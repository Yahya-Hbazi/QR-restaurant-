import mongoose from "mongoose";
const tableSchema = new mongoose.Schema(
    {
        number: { type: Number, require: true, unique: true }
    }
);

const tableModel = mongoose.models.table || mongoose.model("table", tableSchema);

export default tableModel;