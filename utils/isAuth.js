import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";
export const isAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      res.json({ msg: "Please do login!" });
      return;
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findById(decoded._id);
    res.json({ username: user.username, email: user.email });
    next();
  } catch (e) {}
};
