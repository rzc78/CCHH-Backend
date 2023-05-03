import cartSchema from "../models/cartsSchema.js";

class CartMongooseDao {

  async createCart(cart) {
    const cartDocument = await cartSchema.create(cart);

    return {
      id: cartDocument._id,
      products: cartDocument.products,
    };
  };
  
  async getCart(id) {
    const cartDocument = await cartSchema.findOne({ _id: id });

    if (!cartDocument) {
      return null;
    }

    return {
      id: cartDocument._id,
      products: cartDocument.products,
    };
  }


}

export default CartMongooseDao;

