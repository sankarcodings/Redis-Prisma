import redisClient from "../config/redis.js";

export const rateLimiter = (limit = 5, window = 60) => {
  return async (req, res, next) => {
    try {
      const ip = req.ip;
      const key = `ratelimit:${ip}`;

      const requests = await redisClient.incr(key);

      if (requests === 1) {
        await redisClient.expire(key, window);
      }

      if (requests > limit) {
        return res.status(429).json({ message: "Too many requests. Try again later." });
      }

      next();
    } catch (err) {
      console.error("RateLimiter Error:", err);
      next(); 
    }
  };
};
