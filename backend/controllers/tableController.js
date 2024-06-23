import tableModel from "../models/tableModel.js"

// add table
const addTable = async (req, res) => {
    try {
        const { number } = req.body;
        if (isNaN(Number(number))) {
            return res.json({ success: false, message: "Table number must be a number" });
        }

        const table = new tableModel({
            number: Number(number)
        });

        await table.save();

        res.json({ success: true, message: "table Added" });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: "Error" });
    }
}

// List all table items
const listTables = async (req, res) => {
    try {
        const tables = await tableModel.find({});
        res.json({ success: true, data: tables });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

const removeTable = async (req, res) => {
    try {
        const { id } = req.body; // Extract table ID from request parameters
        const table = await tableModel.findById(id);

        if (!table) {
            return res.json({ success: false, message: "Table not found" });
        }

        await tableModel.findByIdAndDelete(id);
        res.json({ success: true, message: "Table removed" });
    } catch (error) {
        console.error("Error removing table:", error);
        res.status(500).json({ success: false, message: "Error removing table" });
    }
};

export { addTable, listTables, removeTable };
