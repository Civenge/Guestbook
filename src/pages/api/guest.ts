// src/pages/api/guest.ts
import { NextApiRequest, NextApiResponse } from "next";
import pool from "../../utils/postgres";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const client = await pool.connect();
    const result = await client.query("SELECT * FROM guest");
    const data = result.rows as { id: string; guest: string }[]; // Add explicit type for data
    client.release();
    res.status(200).json(data);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
