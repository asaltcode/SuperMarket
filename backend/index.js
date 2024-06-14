import express from "express";
import cors from "cors";
import dotenv from "dotenv"
import AppRoutes from "./src/router/index.js";
import connectDatabase from "./src/config/dbConnection.js";

dotenv.config()
connectDatabase()

const PORT =  process.env.PORT;
const app = express();
app.use(cors());
app.use(express.json());
app.use(AppRoutes)

app.listen(PORT, () =>
  console.log(`Server listeing at http://localhost:${PORT}`)
);