import { User } from "../models/userModel.js";
import bcyrpt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    let user = await User.findOne({
      $or: [{ username }, { email }],
    });
    if (user) {
      res.json({ msg: "User with this credentials already exist" });
      return;
    }
    let hashed = await bcyrpt.hash(password, 10);
    user = await User.create({
      username,
      email,
      password: hashed,
    });
    res.json({ msg: "SignUp successful" });
  } catch (e) {
    console.log(e);
  }
};
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.json({
        msg: "Incorrect password or email",
      });
      return;
    }
    const comparedPassword = await bcyrpt.compare(password, user.password);
    if (!comparedPassword) {
      res.json({
        msg: "Incorrect password or email",
      });
      return;
    }
    const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "7d",
    });
    res
      .status(200)
      .cookie("token", token, { httpOnly: true })
      .json({ msg: "Login Successful" });
  } catch (e) {
    console.log(e);
  }
};
export const logout = (req, res) => {
  const { token } = req.cookies;
  res
    .cookie("token", "", { expires: new Date(Date.now()) })
    .json("Logout Successfully");
};
