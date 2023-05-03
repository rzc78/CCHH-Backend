//Importaciones de Router y funcionalidades de CartsManager
import { Router } from "express";
import { addProductToCart, cartList, newCart } from "../controllers/cartController.js";

const CartsRouter = Router();

CartsRouter.post('/', newCart);

CartsRouter.get('/:cid', cartList);

CartsRouter.post('/:cid/product/:pid', addProductToCart);

export default CartsRouter;
