import express from "express";
import { create } from "express-handlebars";
import AuthRouter from "./routes/auth.js";
import ProductsRouter from "./routes/products.js";

const app = express();

const hbs = create({ defaultLayout: "main", extname: "hbs" });

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "./views");

app.use(AuthRouter);
app.use(ProductsRouter);

const PORT = process.env.PORT || 4100;
app.listen(PORT, () => console.log(`Server ${PORT} chi portda ishga tushdi`));
