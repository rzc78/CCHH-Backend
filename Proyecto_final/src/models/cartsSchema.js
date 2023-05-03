import mongoose, { Schema } from "mongoose";

const cartsCollection = "carts";

const cartsSchema = new Schema({
  products: [{
    productId: { type: Schema.Types.ObjectId, ref: 'Product' },
    quantity: { type: Number, required: true }
  }],
 
});

export default mongoose.model(cartsCollection, cartsSchema);
