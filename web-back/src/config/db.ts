import { Pool } from "pg";

export const pool = new Pool({
  host: "localhost",
  port: 5432,
  user: "postgres",
  password: "4480", // แนะนำให้เปลี่ยนเป็น process.env.DB_PASSWORD ในการใช้งานจริง
  database: "supplygo",
});
