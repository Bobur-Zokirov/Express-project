import { Router } from "express";
import bcrypt from "bcrypt";
import User from "../models/User.js";

const router = Router();

router.get("/login", (req, res) => {
  res.render("login", {
    title: "Login | Shop",
    isLogin: true,
  });
});

router.get("/register", (req, res) => {
  res.render("register", {
    title: "Register | Shop",
    isRegister: true,
  });
});

router.post("/register", async (req, res) => {
  // console.log(req.body);
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const userData = {
    firstName: req.body.firstname,
    lastName: req.body.lastname,
    email: req.body.email,
    password: hashedPassword,
  };
  const user = await User.create(userData);
  res.redirect("/");
});

router.post("/login", async (req, res) => {
  // console.log(req.body);

  const existUser = await User.findOne({ email: req.body.email });
  if (!existUser) {
    console.log("User not Found");
    return;
  }

  const isPassworMatch = await bcrypt.compare(
    req.body.password,
    existUser.password
  );
  if (!isPassworMatch) {
    console.log("Password is wrong");
    return;
  }

  console.log(existUser);

  res.redirect("/");
});

export default router;
