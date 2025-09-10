
import prisma from "../../config/connect.db.js";
import redisClient from "../../config/redis.js";
import { hashPassword, comparePassword } from "../../utils/bycryptPwd.js";
import { generateToken , generateRefreshToken } from "../../utils/jwtToken.js";

export const createUser = async (data) => {
  const existing = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (existing) {
    const err = new Error("User already exists with this email");
    err.statusCode = 400;
    throw err;
  }
  const hashedPassword = await hashPassword(data.password);
  return prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      pwd: hashedPassword,
    },
  });
};

export const loginUser = async (email, password) => {
  let user;

  const cachedUser = await redisClient.get(`user:${email}`);
  if (cachedUser) {
    user = JSON.parse(cachedUser);
  //  console.log("User fetched from Redis cache" , user);
  } else {

    user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new Error("Invalid credentials");

    await redisClient.setex(`user:${email}`, 24 * 60 * 60, JSON.stringify(user));
    console.log("User stored in Redis cache");
  }

  const isMatch = await comparePassword(password, user.pwd);
  if (!isMatch) throw new Error("Invalid credentials");

  const accessToken = generateToken({ id: user.id, role: user.role });
  const refreshToken = generateRefreshToken({ id: user.id, role: user.role });

  return { user, accessToken, refreshToken };
};
