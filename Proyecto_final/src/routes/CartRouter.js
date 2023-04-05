//Importaciones de Router y funcionalidades de CartsManager
import { Router } from "express";
import CartsManager  from '../cartManager.js';
import ProductManager from "../productManager.js";

const CartsRouter = Router();

//Instanciado de CartsManager y Producto Manager guardado en variable
const productManager = new ProductManager();
const cartsManager = new CartsManager();

// La ruta raíz POST / deberá crear un nuevo carrito
CartsRouter.post('/', async (req, res) => {

    try {
        const cartsList = await cartsManager.createNewCart();
        res.status(200).send({status: "success", message: "El carrito ha sido creado con éxito"})

    } catch (error) {
        res.status(500).send({status: "error", error: error.message});
    }

});

//La ruta GET /:cid deberá listar los productos que pertenezcan al carrito con el parámetro cid proporcionados.
CartsRouter.get('/:cid', async (req, res) => {
    try {
        const idCart = +req.params.cid;
        const cartsList = await cartsManager.getCartById(idCart);
    
        res.status(200).send({status: "success", message: cartsList.products})

    } catch (error) {
        res.status(400).send({status: "error", error: error.message});
        return;
    };
    
});

// La ruta POST  /:cid/product/:pid deberá agregar el producto al arreglo “products” del carrito seleccionado, agregándose como un objeto.
CartsRouter.post('/:cid/product/:pid', async (req, res) => {
    try {
        // Captura por params de de los id producto e id cart
        const idCart = +req.params.cid;
        const idProd = +req.params.pid;

        // Desestructurado, que guarda el valor devuelto por la función (que a su vez recibe id por parámetro)
        const {id} = await productManager.getProductById(idProd);

        //Llamado de la función addProductToCart, cuya lógica agrega productos al cart (indicado en el id), como objeto, y sumándolos si se repiten.
        const addProductToCart = await cartsManager.addProductToCart(idCart, id);

        res.status(201).send({status: "success", message: "Producto Modificado"});

    } catch (error) {
        res.status(400).send({status: "error", error: error.message});
    };

});

export default CartsRouter;