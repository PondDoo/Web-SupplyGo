// src/index.ts

import express, { Request, Response } from "express";
import { Pool } from "pg";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Connect to PostgreSQL
const pool = new Pool({
  host: "localhost",
  port: 5432,
  user: "postgres",
  password: "4480", // แนะนำให้เปลี่ยนเป็น process.env.DB_PASSWORD ในการใช้งานจริง
  database: "supplygo",
});

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";

// Route: /register
app.post("/register", async (req: Request, res: Response): Promise<void> => {
  const { username, password,email }: { username: string; password: string; email:string } = req.body;

  if (!username || !password || !email) {
    res.status(400).json({ message: "Username and password are required" });
    return;
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = "INSERT INTO users (username, password,email) VALUES ($1, $2, $3) RETURNING userId";
    const result = await pool.query(query, [username, hashedPassword,email]);

    res.status(201).json({ message: "User registered", userId: result.rows[0].userId });
  } catch (err: unknown) {
    console.error("Error during registration:", err);
    res.status(500).json({ message: "Registration failed" });
  }
});


app.post("/login", async (req: Request, res: Response): Promise<void> => {
  const { username, password }: { username: string; password: string } = req.body;

  if (!username || !password) {
    res.status(400).json({ message: "Username and password are required" });
    return;
  }

  try {
    const query = "SELECT userId, password FROM users WHERE username = $1";
    const result = await pool.query(query, [username]);

    if (result.rows.length === 0) {
      res.status(401).json({ message: "Invalid username or password" });
      return;
    }

    const user = result.rows[0];

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      res.status(401).json({ message: "Invalid username or password" });
      return;
    }

    // สร้าง JWT token โดยเก็บ payload เป็น userId และ username
    const token = jwt.sign(
      { userId: user.userid, username },
      JWT_SECRET,
      { expiresIn: "1h" } // กำหนดอายุ token 1 ชั่วโมง
    );

    res.status(200).json({ message: "Login successful", token });
  } catch (err: unknown) {
    console.error("Error during login:", err);
    res.status(500).json({ message: "Login failed" });
  }
});
// Start server
app.listen(5000, async () => {
  console.log("Server is running on port 5000");
});