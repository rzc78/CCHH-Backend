//PRODUCT MANAGER

//MongoDAOImport
import ProductMongooseDao from "../daos/productMongooseDao.js";
import ProductFsDao from "../daos/productFsDao.js";

class ProductManager {
  constructor() {
    this.products = [];
    this.idAuto = 1;
    this.productsDao = new ProductMongooseDao();
    this.productFsDao = new ProductFsDao();
  }
  //Metodo para obtener el listado JSON de los productos.
  async getProducts() {
    try {
      //Lectura del array de productos
      const list = await this.productsDao.find(); // await this.productFsDao.readFile();
      return list;
    } catch (error) {
      //Si no existe el archivo, crea uno con el nombre products.json con un array vacío dentro y lo guarda en la ruta especificada
      // await this.productFsDao.writeNewFile();
      return [];
    };
  };

  async getProductById(id) {
    try {
      const product = await this.productsDao.getOne(id); //await this.productFsDao.readFile();

      if (!product) {
        throw new Error(`Producto con número de id ${id} no se encuentra en la lista`);
      };

      return product;
    } catch (error) {
      return error
    };
  };

  async addProducts(product) {
    try {
      const existingProduct = await this.productsDao.getCode(product.code);
      //Validación para un producto cuyo code existe.
      if (existingProduct) {
        throw new Error("Producto con código ingresado ya existe");
      };
      //Validación para que el objeto contenga todas las key-value requeridas.
      const requiredKeys = ['title', 'description', 'code', 'price', 'status', 'stock', 'category', 'thumbnail'];
      const keys = Object.keys(product);
      //El método every da error si falta alguna clave
      const isValid = requiredKeys.every(key => keys.includes(key));
      if (!isValid) {
        throw new Error("Faltan claves requeridas en el objeto de producto");
      };
      await this.productsDao.create(product);
    } catch (error) {
      throw error;
    };
  };

  //Método para actualizar producto: se busca el prod por id y por body se remmplaza por el nuevo.
  async updateProducts(id, product) {
    const updatedProduct = await this.productsDao.updateOne(id, product);
    return updatedProduct || null;
  };

  //   //Método que permite encontrar un producto y eliminarlo mediante ID
  async deleteProduct(id) {
    try {
      const productDeleted = await this.productsDao.deleteOne(id);
      return productDeleted

    } catch (error) {
      return error;
    };
  };
};

export default ProductManager;
