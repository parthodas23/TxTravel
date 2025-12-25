import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../model/User.js";
import { ENV } from "../lib/ENV.js";

const generateAccessToken = (user) => {
  return jwt.sign({ id: user._id }, ENV.ACCRSS_SECRET, { expiresIn: "15m" });
};

const generateRefreshToken = (user) => {
  return jwt.sign({ id: user._id }, ENV.REFRESH_SECRET, { expiresIn: "10d" });
};

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword =await bcrypt.hash(password, 10);
    await User.create({ name, email, password: hashedPassword });
    res.status(200).json("Registration successfull");
  } catch (error) {
    res.status(500).json(error);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(501).json("user doesn't exist.");

    const isMatch = bcrypt.compare(user.password, password);

    if (!isMatch) return res.status(501).json("Password isn't valid");

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    user.refreshToken = refreshToken;
    await User.save();

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "strict",
    });

    res.status(200).json({ accessToken });
  } catch (error) {
    res.status(501).json(error);
  }
};

export const refresh = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    const user = await User.findOne({ refreshToken });

    if (!user) return res.sendStatus(401);

    const newAccessToken = generateAccessToken(user);

    res.status(200).json({ accessToken: newAccessToken });
  } catch (error) {
    res.status(501).json(error);
  }
};
