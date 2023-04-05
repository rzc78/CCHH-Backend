//Importación de express y de ProductManager
import express from "express";
import ProductRouter from './routes/ProductRouter.js';
import CartsRouter from './routes/CartRouter.js';


//Inicialización de variables: app para guardar el método de express y port para el puerto 8080
const app = express();
const port = 8080;

//middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use('/api/products', ProductRouter);

app.use('/api/cart', CartsRouter);

//Listener de puerto en ejecución.
app.listen(port, () => {
  console.log(`Listening port ${port}. On line!`);
});

