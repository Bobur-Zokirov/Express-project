import { Router } from "express";
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
  const userData = {
    firstName: req.body.firstname,
    lastName: req.body.lastname,
    email: req.body.email,
    password: req.body.password,
  };
  const user = await User.create(userData);
  res.redirect("/");
});

router.post("/login", (req, res) => {
  console.log(req.body);
  res.redirect("/");
});

export default router;
