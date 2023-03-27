//Importación de express y de ProductManager
import express from 'express';
import ProductManager from './productManager.js';

//Inicialización de variables: app para guardar el método de express y port para el puerto 8080
const app = express();
const port = 8080;

//middleware
app.use(express.urlencoded({ extended:true }));

//Instanciado de ProductManager guardado en variable
const productManager = new ProductManager();

// ruta ‘/products’: debe leer el archivo de productos y devolverlos dentro de un objeto. Tiene soporte para recibir por query param el valor ?limit= el cual recibirá un límite de resultados.
app.get('/products', async (req, res)=>{

    try {
        //Limit guarda el calor recibido por la query
        const limit = req.query.limit;
        const productsList = await productManager.getProducts();
        //Validación. El valor guardado en limit determina la longitud del arreglo de objetos a devolver, utilizando la propiedad length sobre el productlist. De esta manera, la longitud del array estará determinado por el valor igualado con limit
        if (limit) {
            productsList.length = limit;
            res.send(productsList);
        }else{
            res.send(productsList);
        }
        
    } catch (error) {
        res.send(error);
    }
});

app.get('/products/:pid', async (req, res) => {
    //pId guarda el valor recibido por params vía url. Debajo se ingresa el valor por parámetro en la función getProductsById y se establece la regla para su devolución. Si no lo encuntra, devuelve error, si lo encuentra, devuelve el resultado guardado en la variable productList
    const pId = +req.params.pid;

    try {
        let productsList = await productManager.getProductById(pId);
        if (!productsList) {
            res.send({ error: `Product with id ${pId} not found.`});
        };
        res.send(productsList);
        return productsList;
    } catch (error) {
        res.send(error);
    }

});

//Listener de puerto en ejecución.
app.listen(port, ()=>{
    console.log(`Listening port ${port}. On line!`);
});



