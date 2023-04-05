import { Router } from "express";
import ProductManager from "../productManager.js";

const ProductRouter = Router();

//Instanciado de ProductManager guardado en variable
const productManager = new ProductManager();

// Listado de productos de la base. Incluye limitación ?limit
ProductRouter.get("/", async (req, res) => {
  try {
    //Limit guarda el valor recibido por la query
    const { limit } = req.query;
    const productsList = await productManager.getProducts();

    //VALIDACIÓN REFACTORIZADA, más corta. Si existe un valor límite de consulta, devuelve los primeros elementos en un nuevo array mediante el método splice.
    const products = limit ? productsList.slice(0, limit) : productsList;
    res.status(200).send({status: "success", products: products});

  } catch (error) {
    res.status(500).send({ status: "error", error: error.message });
  }
});

//Ruta que trae el producto con el ID proporcionado
ProductRouter.get("/:pid", async (req, res) => {
  try {
    //pId guarda el valor recibido por params vía url. Debajo se ingresa el valor por parámetro en la función getProductsById
    const pId = +req.params.pid;
    const productsList = await productManager.getProductById(pId);

    // Se establece la regla para su devolución. Si no lo encuntra, devuelve error, si lo encuentra, devuelve el resultado guardado en la variable productList
    if (!productsList) {
      res.status(400).send({ error: `Producto con id ${pId} no encontrado.` });
    }
    res.status(200).send(productsList);

  } catch (error) {
    res.status(500).send({ status: "error", error: error.message });
  }
});


ProductRouter.post("/", async (req, res) => {
  try {
    // Validación para no aceptar un objeto que no cumpla con la estrutura previamente requerida:
    const validKeys = [
      "title",
      "description",
      "code",
      "price",
      "status",
      "stock",
      "category",
      "thumbnail",
    ];

    // dataNewProd guarda el objeto recibido por body
    let dataNewProd = req.body;

    // Obtención de las keys del producto ingresado:
    const keys = Object.keys(dataNewProd);
    const isValid = validKeys.every((key) => keys.includes(key));

    //Validación de las coincidencias. (falta solucionar la validación de code repetido)
    if (isValid) {
      await productManager.addProducts(dataNewProd);
      res
        .status(200).send({status: "success", message: "JSON de productos correcto, agregado a la lista"});
    } else {
      res.status(400).send({status: "error", error: "JSON de producto con keys incorrectas"});
    }

  } catch (error) {
    res.status(500).send({status: "error", error: error.message});
  }
});

ProductRouter.put("/:pid", async (req, res) => {

  try {
    //Recibe id de producto a modificar por params
    const idProd = +req.params.pid;

    //Recibe keys y values por body
    const productModified = req.body;

    //Llama a la función updateProducts y pasa por parámetros los datos a modificar.
    const updateProds = await productManager.updateProducts(idProd, productModified)
    res.status(200).send({ status: "success", message: `Producto modificado exitosamente:`});

  } catch (error) {
    res.status(500).send({ status: "error", error: error.message });
  }

  
});

ProductRouter.delete("/:pid", async (req, res) => {
  try {
    //Captura por req.params del id desde la request
    const idProd = +req.params.pid;
    const deletedProd = await productManager.deleteProduct(idProd);

    //validación:  si deleteProduct() retorna true, se ha encontrado el id del producto a eliminar.
    if (deletedProd === true) {
      res
        .status(200)
        .send({
          status: "success",
          message: `Producto  con id ${idProd} eliminado exitosamente`,
        });
    } else {
      res
        .status(400)
        .send({
          status: "error",
          message: `Producto  con id ${idProd} no encontrado o inexistente`,
        });
    }
  } catch (error) {
    res.status(500).send({ status: "error", error: error.message });
  }
});

export default ProductRouter;
