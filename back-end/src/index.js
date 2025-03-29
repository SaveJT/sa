import express from "express";
import { router as tableRouter } from "./modules/table/tableController.js";
const app = express()

app.use(express.json());
app.use(tableRouter);

const PORT = 8000

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})