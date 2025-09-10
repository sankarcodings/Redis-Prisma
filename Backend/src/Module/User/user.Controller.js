
import jwt from 'jsonwebtoken'
import * as userService from "./user.Service.js";
import redisClient from '../../config/redis.js'
import { successResponse, errorResponse } from "../../utils/response.js";

import {JWT_SECRET , REFRESH_SECRET} from '../../config/env.js'
import { createClient } from 'redis';

export const signup = async (req, res) => {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).json(successResponse("User created successfully", user));
  } catch (err) {
    console.log(err.message)
    res.status(400).json(errorResponse(err.message));
  }
};

export const login = async (req, res) => {
  try {
    const { user, accessToken , refreshToken } = await userService.loginUser(
      req.body.email,
      req.body.password
    );

    //await redisClient.
    await redisClient.setex(`refreshToken:${refreshToken}`, 7 * 24 * 60 * 60, user.id);

    res.json(successResponse("Login successful", { user, accessToken ,refreshToken }));
  } catch (err) {
    res.status(401).json(errorResponse(err.message));
  }
};


// --> /refresh
// export const refresh = async (req, res) => {
//   try {
//     const { refreshToken } = req.body;
//     if (!refreshToken) return res.status(401).json({ message: "No refresh token provided" });

//    // const decoded = jwt.verify(refreshToken, REFRESH_SECRET);

//     const userId = await redisClient.get(`refreshToken:${refreshToken}`);
//     if (!userId) return res.status(403).json({ message: "Invalid or expired refresh token" });

//     const newAccessToken = jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: "15m" });

//     res.json({ accessToken: newAccessToken });
//   } catch (err) {
//     console.error("Refresh error:", err);
//     res.status(403).json({ message: "Invalid or expired refresh token" });
//   }
// };

// --> logout
// export const logout = async (req, res) => {
//   try {
//     const { refreshToken } = req.body;
//     if (!refreshToken) return res.status(400).json({ message: "No refresh token provided" });

//     await redisClient.del(`refreshToken:${refreshToken}`);

//     res.json({ message: "Logged out successfully" });
//   } catch (err) {
//     console.error("Logout error:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// };