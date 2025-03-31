import express from "express";
import cors from "cors";
import { router as tableRouter } from "./modules/table/tableController.js";
const app = express()
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());
app.use(tableRouter);

const PORT = 8000

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})

//app.use(cors({ origin: 'http://localhost:5173' }));
//app.use(express.json());
//app.use(tableRouter);
