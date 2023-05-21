import { Router } from "express";
import Product from "../models/Product.js";

const router = Router();

router.get("/", (rep, res) => {
  res.render("index", {
    title: "Boom | Shop",
  });
});

router.get("/products", (req, res) => {
  res.render("products", {
    title: "Products | Shop",
    isProducts: true,
  });
});

router.get("/cart", (req, res) => {
  if (!req.cookies.token) {
    res.redirect("/login");
    return;
  }
  res.render("add", {
    title: "Cart | Shop",
    isCart: true,
  });
});

router.post("/add-products", async (req, res) => {
  const { title, description, image, price } = req.body;
  const products = await Product.create(req.body);
  res.redirect("/");
});

export default router;
