import CartsManager  from '../managers/cartManager.js';
import ProductManager from "../managers/productManager.js";

//Instanciado de CartsManager y Producto Manager guardado en variable
const productManager = new ProductManager();
const cartsManager = new CartsManager();

// La ruta raíz POST / deberá crear un nuevo carrito
export const newCart = async (req, res) => {

    try {
        const cartsList = await cartsManager.createNewCart();
        res.status(200).send({status: "success", message: "El carrito ha sido creado con éxito"})

    } catch (error) {
        res.status(500).send({status: "error", error: error.message});
    }

};

//La ruta GET /:cid deberá listar los productos que pertenezcan al carrito con el parámetro cid proporcionados.
export const cartList = async (req, res) => {
    try {
        const idCart = req.params.cid;
        const cartsList = await cartsManager.getCartById(idCart);
    
        res.status(200).send({status: "success", message: cartsList})

    } catch (error) {
        res.status(400).send({status: "error", error: error.message});
        return;
    };
    
};

// La ruta POST  /:cid/product/:pid deberá agregar el producto al arreglo “products” del carrito seleccionado, agregándose como un objeto.
export const addProductToCart = async (req, res) => {
    try {
      const cartId = req.params.cid;
      const productId = req.params.pid;
  
      // Buscar el producto por su id
      const product = await productManager.getProductById(productId);
      if (!product) {
        throw new Error(`El producto con id ${productId} no existe`);
      }
  
      // Agregar el producto al carrito
      const cart = await cartsManager.addProductToCart(cartId, product);
  
      res.status(201).send({ status: "success", message: "Producto Modificado" });
    } catch (error) {
      res.status(400).send({ status: "error", error: error.message });
    }
  };
