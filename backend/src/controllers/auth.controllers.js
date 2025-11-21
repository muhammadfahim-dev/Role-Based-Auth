import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";

const generateTokens = async (userId) => {
  const user = await User.findById(userId);

  const refreshToken = user?.generateRefreshToken();
  const accessToken = user?.generateAccessToken();

  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });

  return { refreshToken, accessToken };
};

const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existedUser = await User.findOne({ email });
    if (existedUser) {
      return res.status(400).json({ message: "User Already Exists" });
    }

    const user = await User.create({
      name,
      email,
      password,
      role,
    });

    if (!user) {
      return res.status(500).json({ message: "Server Error" });
    }

    return res.status(201).json({ message: "User Registerd", user });
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }
    const isMatch = await user.isPasswordCorrect(password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const { accessToken, refreshToken } = await generateTokens(user._id);

    return res
      .status(200)
      .cookie("accessToken", accessToken, {
        httpOnly: true,
        maxAge: 60 * 60 * 1000,
      })
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .json({ message: "user loges in ", user });
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};

const logoutUser = async (req, res) => {
  try {
    return res
      .status(200)
      .clearCookie("accessToken")
      .clearCookie("refreshToken")
      .json({ message: "user loged out" });
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};

const getUser = async (req, res) => {
  return res.status(200).json({ user: req.user });
};

const adminData = (req, res) => {
  return res.status(200).json({ message: "Admin data access" });
};

const userData = (req, res) => {
  return res.status(200).json({ message: "User dashboard data" });
};

export { registerUser, loginUser, logoutUser, getUser, adminData, userData };
