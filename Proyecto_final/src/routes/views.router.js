import { Router } from "express";
import ProductManager from "../managers/productManager.js";

const productManager = new ProductManager();
const ViewsRouter = Router();

ViewsRouter.get("/", async (req, res) => {
  const productsList = await productManager.getProducts();
  productsList;
  res.render("home", { products: productsList, title: "Listado de productos" });
});

ViewsRouter.get("/realTimeProducts", async (req, res) => {
  res.render("realTimeProducts", { title: "Listado de productos" });
});

export default ViewsRouter;
