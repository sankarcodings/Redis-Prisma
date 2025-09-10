import Redis from "ioredis";
import { REDIS_URL } from "./env.js";

const redisClient = new Redis(REDIS_URL);

redisClient.on("connect", () => console.log("Redis connected"));
redisClient.on("error", (err) => console.error("Redis error", err));

export default redisClient;
