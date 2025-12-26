import jwt from "jsonwebtoken";
import User from "../model/User.js";
import bcrypt from "bcrypt";
import { ENV } from "../lib/ENV.js";
const generateAccessToken = (user) => {
  return jwt.sign({ id: user._id }, ENV.ACCESS_SECRET, { expiresIn: "15s" });
};

const generateRefreshToken = (user) => {
  return jwt.sign({ id: user._id }, ENV.REFRESH_SECRET, { expiresIn: "30s" });
};

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const isExits = await User.findOne({ email });
    if (isExits) return res.status(501).json("User already exist.");
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ name, email, password: hashedPassword });
    res.status(200).json("Register successfull");
  } catch (error) {
    return res.status(504).json(error);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json("User doesn't exist.");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json("Your password isn't correct.");

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    user.refreshToken = refreshToken;
    await user.save();

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "strict",
    });

    res.status(200).json({ accessToken });
  } catch (error) {
    console.log("Login Error", error);
    res.status(500).json(error);
  }
};

export const refresh = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    const user = await User.findOne({ refreshToken });
    if (!user) return res.status(401).json("User doesn't exist.");

    jwt.verify(refreshToken, ENV.REFRESH_SECRET, (err, decoded) => {
      if (err) return res.status(501).json(err);

      const newAccesToken = generateAccessToken(user);

      res.json({ accessToken: newAccesToken });
    });
  } catch (error) {
    res.status(500).json(error);
  }
};
