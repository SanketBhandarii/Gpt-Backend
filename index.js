import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import router from "./routes/userRoutes.js";
import mongoose from "mongoose";
import { User } from "./models/userModel.js";
import cookieParser from "cookie-parser";

dotenv.config({
  path: "./config/.env",
});

const app = express();
const PORT = process.env.PORT || 8000;
const MONGO_URL = process.env.MONGO_URL;

app.use(
  cors({
    origin: "https://chatt-gpt.netlify.app",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello Buddy");
});

app.use("/api", router);

app.listen(PORT, async () => {
  console.log("Server listening");
  try {
    await mongoose.connect(MONGO_URL);
    console.log("DB connected");
  } catch (e) {
    console.log(e);
  }
});
