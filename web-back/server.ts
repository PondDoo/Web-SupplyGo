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

// Start server
app.listen(5000, async () => {
  console.log("Server is running on port 5000");
});