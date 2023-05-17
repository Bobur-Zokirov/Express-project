import { Router } from "express";

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
  res.render("add", {
    title: "Cart | Shop",
    isCart: true,
  });
});

export default router;
