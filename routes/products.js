import { Router } from "express";
import Product from "../models/Product.js";
import { noToken } from "../middleware/auth.js";

const router = Router();

router.get("/", async (req, res) => {
  const products = await Product.find().populate("user").lean();
  // console.log(products);
  res.render("index", {
    title: "Boom | Shop",
    products: products.reverse(),
    // userId: req.userId ? req.userId.toLocaleString() : null,
  });
});

router.get("/products", async (req, res) => {
  if (!req.cookies.token) {
    res.render("login", {
      title: "Login | Shop",
      isLogin: true,
      loginError: req.flash("loginError"),
    });
    return;
  }
  const myProducts = await Product.find({ user: req.userId }).lean();
  res.render("products", {
    title: "Products | Shop",
    isProducts: true,
    myProducts: myProducts.reverse(),
  });
});

router.get("/products/:id", async (req, res) => {
  // const myProducts = await Product.find().lean();
  res.render("index", {
    title: "Products | Shop",
    // isProducts: true,
    // myProducts: myProducts.reverse(),
  });
});

router.get("/cart", noToken, (req, res) => {
  res.render("add", {
    title: "Cart | Shop",
    isCart: true,
    productError: req.flash("productError"),
  });
});

router.post("/add-products", async (req, res) => {
  const { title, description, image, price } = req.body;
  if (!title || !description || !image || !price) {
    req.flash("productError", "All fields is required");
    res.redirect("/cart");
    return;
  }

  await Product.create({ ...req.body, user: req.userId });
  res.redirect("/");
});

export default router;
