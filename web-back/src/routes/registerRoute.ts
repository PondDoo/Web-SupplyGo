import { Router, Request, Response } from "express";
import bcrypt from "bcryptjs";
import { pool } from "../config/db";

const registerRoute = Router();
const position_id = 1;

registerRoute.post("/register", async (req: Request, res: Response): Promise<void> => {
  const { username, password, email } = req.body;

  if (!username || !password || !email) {
    res.status(400).json({ message: "Username, password and email are required" });
    return;
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = "INSERT INTO users (username, password, email,position_id) VALUES ($1, $2, $3,$4) RETURNING user_Id";
    const result = await pool.query(query, [username, hashedPassword, email,position_id]);

    // ✅ แก้ตรงนี้
    res.status(201).json({ message: "User registered", userId: result.rows[0].user_Id });
  } catch (err) {
    console.error("Error during registration:", err);
    res.status(500).json({ message: "Registration failed" });
  }
});

export default registerRoute;
