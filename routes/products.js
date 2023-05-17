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
  if (!req.cookies.token) {
    res.redirect("/login");
    return;
  }
  res.render("add", {
    title: "Cart | Shop",
    isCart: true,
  });
});

router.post("/add-products", (req, res) => {
  res.redirect("/");
  console.log(req.body);
});

export default router;
