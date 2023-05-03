//dotenv
import dotenv from 'dotenv';
dotenv.config();

//Importación de express, routes, engine y path;
import express from "express";
import mongoose from 'mongoose';
import ProductRouter from './routes/ProductRouter.js';
import CartsRouter from './routes/CartRouter.js';
import ViewsRouter from "./routes/views.router.js";
import { engine } from 'express-handlebars';
import { Server } from 'socket.io';

//Import de path para manejo de las rutas relativas en node.
import { resolve } from 'path';
import { error } from 'console';

//Inicialización de variables: app para guardar el método de express y port para el puerto 8080
const app = express();
const port = 8080;

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

// Conexion Mongoose
mongoose.connect('mongodb+srv://admin:admin123@ecommerce.v5ats9u.mongodb.net/ecommerce', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error(err);
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



