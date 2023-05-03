import { Router } from "express";
import { deleteOne, getList, getOne, save, update } from "../controllers/productController.js";

const ProductRouter = Router();



// Listado de productos de la base. Incluye limitación ?limit
ProductRouter.get("/", getList);

//Ruta que trae el producto con el ID proporcionado
ProductRouter.get("/:pid", getOne);

//Ruta para guardar un nuevo producto
ProductRouter.post("/", save);

//Ruta para actualizar un producto existente
ProductRouter.put("/:pid", update);

//Ruta para borrar un producto del listado
ProductRouter.delete("/:pid", deleteOne);

export default ProductRouter;
