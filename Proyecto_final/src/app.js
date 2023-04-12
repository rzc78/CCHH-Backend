//Importación de express, routes, engine y path;
import express from "express";
import ProductRouter from './routes/ProductRouter.js';
import CartsRouter from './routes/CartRouter.js';
import ViewsRouter from "./routes/views.router.js";
import ProductManager from "./productManager.js";
import { engine } from 'express-handlebars';
import { Server } from 'socket.io';

//Import de path para manejo de las rutas relativas en node.
import { resolve } from 'path';

//Inicialización de variables: app para guardar el método de express y port para el puerto 8080
const app = express();
const port = 8080;

//Llamado a la función getProducts de ProductManager. Se instancia
const productManager = new ProductManager();
const list = await productManager.getProducts();

//MIDDELWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Handlebars Config de routes
const viewsPath = resolve('src/views'); //Dir donde se alojan vistas
app.engine('handlebars', engine({layoutsDir: `${viewsPath}/layouts`, defaultLayout: `${viewsPath}/layouts/main.handlebars`}));

app.set('view engine', 'handlebars');
app.set('views', viewsPath )

//Router para Handlebars
app.use('/', ViewsRouter);

app.use('/api/products', ProductRouter);

app.use('/api/carts', CartsRouter);

//Listener de puerto en ejecución.
const httpServer = app.listen(port, () => {
  console.log(`Listening port ${port}. On line!`);
});

//Instanciado socket
const socketServer = new Server(httpServer);

// Server en escucha desde el server
socketServer.on('connection', socket=> {
  console.log("Cliente Conectado");

  socket.on('message', (data)=>{
    console.log(data)});

  //Socket Emisor para renderizado en realTimeProducts
  socket.emit('evento_para_socket_individual', 'Actualizado');
  socketServer.emit('new-list', list);

});



