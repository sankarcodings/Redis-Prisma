
import express from "express";
import { signup, login } from "./user.Controller.js";
import { rateLimiter } from "../../Middleware/rateLimiter.js";
// import { authMiddleware } from "../../Middleware/authMiddleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login",rateLimiter(2, 80), login);

// router.post("/refresh", refresh);

export default router;
