import { Router } from "express";
import bcrypt from "bcrypt";
import User from "../models/User.js";

const router = Router();

// ---------- LOGUN GET ----------- //

router.get("/login", (req, res) => {
  res.render("login", {
    title: "Login | Shop",
    isLogin: true,
    loginError: req.flash("loginError"),
  });
});

// ---------- REGISTER GET ----------- //

router.get("/register", (req, res) => {
  res.render("register", {
    title: "Register | Shop",
    isRegister: true,
    registerError: req.flash("registerError"),
  });
});

// ---------- REGISTER POST ----------- //

router.post("/register", async (req, res) => {
  const { firstname, lastname, email, password } = req.body;
  if (!firstname || !lastname || !email || !password) {
    req.flash("registerError", "All fields is required");
    res.redirect("/register");
    return;
  }

  const isEmailExist = await User.findOne({ email });
  if (isEmailExist) {
    req.flash("registerError", "User already exist!");
    res.redirect("/register");
    return;
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const userData = {
    firstName: firstname,
    lastName: lastname,
    email: email,
    password: hashedPassword,
  };
  const user = await User.create(userData);
  res.redirect("/");
});

// ---------- LOGIN POST ----------- //

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    req.flash("loginError", "All fields is required");
    res.redirect("/login");
    return;
  }

  const existUser = await User.findOne({ email });
  if (!existUser) {
    req.flash("loginError", "User not found");
    res.redirect("/login");
    return;
  }

  const isPassworMatch = await bcrypt.compare(password, existUser.password);
  if (!isPassworMatch) {
    req.flash("loginError", "Password is wrong");
    res.redirect("/login");
    return;
  }

  res.redirect("/");
});

export default router;
