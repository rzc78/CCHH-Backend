//PERSISTENCIA EN FS

import fs from "fs/promises";

class ProductFsDao {
  constructor() {
    this.path = "./src/db/products.json";
  }
  async readFile() {
    const productsFile = await fs.readFile(this.path, "utf-8");
    return JSON.parse(productsFile);
  };

  async writeNewFile() {
    await fs.writeFile(this.path, "[]");
    return [];
  };

  async writeProductList(productsList) {
    await fs.writeFile(this.path, JSON.stringify(productsList));
    return
  };

  async updateProduct(productsList) {
    await fs.writeFile(this.path, JSON.stringify(productsList));
  };

  async deleteProduct(newList){
    await fs.writeFile(this.path, JSON.stringify(newList));
  };
};

export default ProductFsDao;
