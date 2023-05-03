
import CartsMongooseDao from "../daos/cartMongooseDao.js";
import CartsFsDao from "../daos/cartsFsDao.js";
import ProductMongooseDao from "../daos/productMongooseDao.js";

class CartsManager {
  constructor() {
    this.carts = [];
    this.cartId = 100;
    this.cartsDao = new CartsFsDao();
    this.cartsMongooseDao = new CartsMongooseDao();
    this.productMongooseDao = new ProductMongooseDao()
  };

  async createNewCart() {
    try {
      // Busca el archivo que contiene los carts.
      const newCart = {
        products: []
      };
      await this.cartsMongooseDao.createCart(newCart);

    } catch (error) {
      
    };
  };

  async getCartById(id) {
    try {
      // Busca el archivo que contiene los carts.
      const cart = await this.cartsMongooseDao.getCart(id);

      return cart
    } catch (error) {
      throw new Error(`Lo siento. ${error.message}`);
    };
  };

  async addProductToCart(idCart, idProd) {
    try {
      
    } catch (error) {
      
      throw new Error(`No se pudo agregar el producto al carrito: ${error.message}`);
    };
  };


};

export default CartsManager;
