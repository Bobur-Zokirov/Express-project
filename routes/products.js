import { Router } from "express";
import Product from "../models/Product.js";
import { noToken } from "../middleware/auth.js";

const router = Router();

router.get("/", async (req, res) => {
  const products = await Product.find().lean();
  res.render("index", {
    title: "Boom | Shop",
    products: products.reverse(),
    userId: req.userId ? req.userId.toLocaleString() : null,
  });
});

router.get("/products", (req, res) => {
  res.render("products", {
    title: "Products | Shop",
    isProducts: true,
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
