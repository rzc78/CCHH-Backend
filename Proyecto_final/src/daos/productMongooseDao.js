import productSchema from "../models/productSchema.js";

class ProductMongooseDao {
  async find() {
    const productDocument = await productSchema.find();

    return productDocument.map((doc) => ({
      id: doc._id,
      title: doc.title,
      description: doc.description,
      code: doc.code,
      price: doc.price,
      status: doc.status,
      stock: doc.stock,
      category: doc.category,
      thumbnail: doc.thumbnail,
    }));
  }

  async getOne(id) {
    const productDocument = await productSchema.findOne({ _id: id });

    if (!productDocument) {
      return null;
    }

    return {
      id: productDocument._id,
      title: productDocument.title,
      description: productDocument.description,
      code: productDocument.code,
      price: productDocument.price,
      status: productDocument.status,
      stock: productDocument.stock,
      category: productDocument.category,
      thumbnail: productDocument.thumbnail,
    };
  }

  async getCode(code) {
    const productDocument = await productSchema.findOne({ code: code });
    // Devuelve null si no se encuentra ningún documento que coincida con los criterios de búsqueda
    if (!productDocument) {
      return null;
    }
    return {
      code: productDocument.code,
    };
  }

  async create(product) {
    const productDocument = await productSchema.create(product);

    return {
      id: productDocument._id,
      title: productDocument.title,
      description: productDocument.description,
      code: productDocument.code,
      price: productDocument.price,
      status: productDocument.status,
      stock: productDocument.stock,
      category: productDocument.category,
      thumbnail: productDocument.thumbnail,
    };
  }

  async updateOne(id, product) {
    return await productSchema.findOneAndUpdate({ _id: id }, product, {
      new: true,
    });
  }

  async deleteOne(id) {
    return await productSchema.deleteOne({ _id: id });
  }
}

export default ProductMongooseDao;
