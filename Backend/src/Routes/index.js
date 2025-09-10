import express from "express";

import userRoutes from '../../src/Module/User/user.Routes.js'

const router = express.Router();
router.use("/user", userRoutes);

export default router;
