import express from "express";
import { addTable, listTables, removeTable } from "../controllers/tableController.js"

const tableRouter = express.Router();

tableRouter.post("/add", addTable);
tableRouter.get("/", listTables);
tableRouter.post("/remove", removeTable);

export default tableRouter;