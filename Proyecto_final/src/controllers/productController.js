import ProductManager from "../managers/productManager.js";

//Instanciado de ProductManager guardado en variable
const productManager = new ProductManager();

export const getList = async (req, res) => {
  try {
    //Limit guarda el valor recibido por la query
    const { limit } = req.query;
    const productsList = await productManager.getProducts();

    //VALIDACIÓN REFACTORIZADA, más corta. Si existe un valor límite de consulta, devuelve los primeros elementos en un nuevo array mediante el método splice.
    const products = limit ? productsList.slice(0, limit) : productsList;
    res.status(200).send({ status: "success", products: products });
  } catch (error) {
    res.status(500).send({ status: "error", error: error.message });
  }
};

//Ruta que trae el producto con el ID proporcionado
export const getOne = async (req, res) => {
  try {
    const pId = req.params.pid; // +req.params.pid for FS
    const product = await productManager.getProductById(pId);

    // Se establece la regla para su devolución. Si no lo encuntra, devuelve error
    if (!product) {
      res.status(404).send({ error: `Producto con id ${pId} no encontrado.` });
    }
    // Devuelve el resultado guardado en la variable product
    res.status(200).send(product);
  } catch (error) {
    res.status(500).send({ status: "error", error: error.message });
  }
};

export const save = async (req, res) => {
  try {
    const dataNewProd = req.body;
    await productManager.addProducts(dataNewProd);
    res.status(200).send({
      status: "success",
      message: "JSON de productos correcto, agregado a la lista",
    });
  } catch (error) {
    res.status(400).send({
      status: "error",
      error: error.message,
    });
  }
};

export const update = async (req, res) => {
  try {
    const idProd = req.params.pid;
    const productModified = req.body;
    const updatedProduct = await productManager.updateProducts(idProd, productModified);

    if (updatedProduct === null) {
      return res.status(404).send({
        error: `Producto con id ${idProd} no encontrado.`,
      });
    };
    res.status(200).send({
      status: "success",
      message: `Producto modificado exitosamente:`,
    });
  } catch (error) {
    res.status(500).send({ status: "error", error: error.message });
  }
};

export const deleteOne = async (req, res) => {
  try {
    //Captura por req.params del id desde la request
    const idProd = req.params.pid;
    const deletedProd = await productManager.deleteProduct(idProd);
    
    //Validación con acceso a deletedCount: si es 1 es que lo encontro, si es 0 es no encontrado.
    if (deletedProd.deletedCount === 1) {
      res.status(200).send({
        status: "success",
        message: `Producto  con id ${idProd} eliminado exitosamente`,
      });
    } else {
      res.status(400).send({
        status: "error",
        message: `Producto  con id ${idProd} no encontrado o inexistente`,
      });
    };
  } catch (error) {
    res.status(500).send({ status: "error", error: error.message });
  };
};
