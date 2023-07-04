import jwt from "jsonwebtoken";
import User from "../models/User.js";

export default async function (req, res, next) {
  const token = req.cookies.token;
  const decode = jwt.verify(token, process.env.PRIVATE_KEY);
  const user = await User.findById(decode.userId);
  req.userId = user._id;

  next();
}
