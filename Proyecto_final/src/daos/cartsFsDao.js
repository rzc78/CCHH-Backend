//PERSISTENCIA EN FS de CART

import fs from "fs/promises";

class CartsFsDao {
  constructor() {
    this.path = "./src/db/carts.json";
  };
  async readFile() {
    const productsFile = await fs.readFile(this.path, "utf-8");
    return JSON.parse(productsFile);
  };

  async writeNewFile() {
    await fs.writeFile(this.path, "[]");
    return [];
  };

  async writeCartsList(productsList) {
    await fs.writeFile(this.path, JSON.stringify(productsList));
    return
  };
};

export default CartsFsDao;
