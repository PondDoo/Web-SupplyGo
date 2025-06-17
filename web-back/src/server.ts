import express from "express";
import dotenv from "dotenv";
import loginRoute from "./routes/registerRoute";
import registerRoute from "./routes/registerRoute";

dotenv.config(); // โหลดค่า .env

const app = express();
app.use(express.json());

// ใช้งาน route
app.use("/api", registerRoute);
app.use("/api", loginRoute);

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});