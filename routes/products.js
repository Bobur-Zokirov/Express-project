import { Router } from "express";
import Product from "../models/Product.js";
import { noToken } from "../middleware/auth.js";

const router = Router();

router.get("/", async (req, res) => {
  const products = await Product.find().populate("user").lean();
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

router.get("/product/:id", async (req, res) => {
  const product = await Product.findById(req.params.id).lean();
  res.render("product", {
    title: "Product Detail | Shop",
    product: product,
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

router.get("/edit-product/:id", async (req, res) => {
  const product = await Product.findById(req.params.id).lean();
  res.render("edit-product", {
    title: "Edit Product",
    product: product,
    editProductError: req.flash("editProductError"),
  });
});

router.post("/edit-product/:id", async (req, res) => {
  const id = req.params.id;
  const { title, description, image, price } = req.body;
  if (!title || !description || !image || !price) {
    req.flash("editProductError", "All fields is required");
    res.redirect(`/edit-product/${id}`);
    return;
  }

  await Product.findByIdAndUpdate(id, req.body, { new: true });

  res.redirect(`/product/${id}`);
});

export default router;
