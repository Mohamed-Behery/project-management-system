import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";
import taskRoutes from "./routes/tasks.js";
import authRoutes from "./routes/auth.js";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/tasks", taskRoutes);
app.use("/auth", authRoutes);

const connect = () => {
  mongoose.connect(process.env.MONGO);
  console.log("Connected To DB");
};
connect();

app.listen(8800, () => {
  console.log("Connected To Server");
});
