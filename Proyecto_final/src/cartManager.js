import fs from "fs/promises";

class CartsManager{

    constructor(){
        this.carts = [];
        this.cartId = 100;
        this.path = './src/db/carts.json';

    }

async createNewCart(){
try {
    // Busca el archivo que contiene los carts.
    const cartsFile = await fs.readFile(this.path, 'utf-8');
    let cartsList = JSON.parse(cartsFile);

    // Condicional para evitar la repetición de id de cada cart dentro de CartsList
    if (cartsList.length > 0) {
        const lastPositionArray = cartsList[cartsList.length -1];
        this.cartId = lastPositionArray.id +1;
    };

    // Creación de un array que contiene un nuevo cart: posee dos keys: un id de cart y uno que contendrá un array de objetos de productos más adelante.
    const newCart = {
        id: this.cartId,
        products: []
      };
    // Push del nuevo cart y guardado en FS
    cartsList.push(newCart);
    await fs.writeFile(this.path, JSON.stringify(cartsList));
    return newCart;

} catch (error) {
    //Ternario para el manejo de error. Validación de ENOENT (cuando el archivo no existe) para crear uno nuevo, sino hace rejected de la promise
    return error.code === 'ENOENT'? (console.log(`El listado de productos ${this.path} no existe. Lo creamos...`), await fs.writeFile(this.path, '[]'), []) : Promise.reject(error);
};
}

async getCartById(id){
    try {
        // Busca el archivo que contiene los carts.
        const cartsFile = await fs.readFile(this.path, 'utf-8');
        let cartsList = JSON.parse(cartsFile);

        //Busca en el cart por id a través de find.
        const findCart = cartsList.find(cart => cart.id === id);
        // Validación: si no encuentra el cart devuelve error
        if (!findCart) {
            throw new Error(`Cart con número de id ${id} no se encuentra en la lista`);
        };
        return findCart;

    } catch (error) {
        throw new Error(`Lo siento. ${error.message}`)
    };
    

}

async addProductToCart(idCart, idProd){
    try {
        // Lectura de JSON del cart
        const cartsFile = await fs.readFile(this.path, 'utf-8');
        let cartsList = JSON.parse(cartsFile);

        // Busqueda por id de carrito que se encuentra dentro de carts. Id recibida desde params
        const cart = cartsList.find(cart => cart.id === idCart);

        // Si no se encuentra el carrito, devolver un error
        if (!cart) {
            throw new Error(`El carrito con la ID ${idCart} no existe`);
        };

        // Buscar el objeto products (solo id) dentro del array 'products' correspondiente a la ID pasada por parámetro
        const productIndex = cart.products.findIndex(product => product.idProd === idProd);

        // Si ya existe el producto, lo incrementa en 1 sin crear uno nuevo. Si no existe lo crea y lo agrega al array 'products'
        if (productIndex !== -1) {
            cart.products[productIndex].quantity++;
        }else {
            cart.products.push({ idProd, quantity: 1 });
        };

        // Guardado en persistencia del archivo modificado con FS.
        await fs.writeFile(this.path, JSON.stringify(cartsList));
        return cart;

    } catch (error) {
        throw new Error(`No se pudo agregar el producto al carrito: ${error.message}`);
        
    };

};

};

export default CartsManager;
