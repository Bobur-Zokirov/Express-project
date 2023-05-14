import express from "express";
import { create } from "express-handlebars";
import mongoose from "mongoose";
import * as dotenv from "dotenv";

dotenv.config();

// Routes
import AuthRouter from "./routes/auth.js";
import ProductsRouter from "./routes/products.js";

const app = express();

const hbs = create({ defaultLayout: "main", extname: "hbs" });

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "./views");

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json());

app.use(AuthRouter);
app.use(ProductsRouter);

const startApp = () => {
  try {
    mongoose.connect(
      process.env.MONGO_URI,
      {
        useNewUrlParser: true,
      },
      console.log("mongodb ulandi...")
    );

    const PORT = process.env.PORT || 4100;
    app.listen(PORT, () =>
      console.log(`Server ${PORT} chi portda ishga tushdi`)
    );
  } catch (error) {
    console.log("Xatolik yuz berdi...", error);
  }
};

startApp();
