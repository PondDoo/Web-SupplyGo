import express from "express";
import dotenv from "dotenv";
import loginRoute from "./routes/loginRoute";
import registerRoute from "./routes/registerRoute";
import cors from "cors";

dotenv.config(); // โหลดค่า .env

const app = express();
app.use(express.json());
app.use(cors());

// ใช้งาน route
app.use("/api", registerRoute);
app.use("/api", loginRoute);

app.use(express.json());

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});