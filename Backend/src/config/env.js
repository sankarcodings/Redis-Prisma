
import dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT || 5000;
// export const DATABASE_URL = process.env.DATABASE_URL;
export const JWT_SECRET = process.env.JWT_SECRET || "supersecret";
export const REDIS_URL = process.env.REDIS_URL || "redis://localhost:6379";
export const REFRESH_SECRET = process.env.REFRESH_SECRET || "supersecretrefresh"
