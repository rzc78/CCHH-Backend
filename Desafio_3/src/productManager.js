//Desafío Entregable 2 - RODRIGO ZALAZAR CAVALLERIS
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

//Logica

//Class Constructor de Product Manager, con instancia inicial de un arreglo vacío y una variable idAuto iniciada en 1, la cual al recibir nuevos productos, irá incrementándose en 1 cada vez.
import fs from "fs/promises";

class ProductManager{

    constructor(){

        this.products = [];
        this.idAuto = 1;
        this.path = './products.json';

    }
    //Metodo para obtener el listado JSON de los productos. 
    async getProducts(){
        //Se utiliza la estructura try - catch para que intente leer el archivo primero y si no puede, atrape el error (catch) y lo resuelva creando uno con fs.writeFile.
        try {
            //Lectura del archivo json de FS, Si lo encuentra, se guarda en la variable productsFile, previo parseo.
            const productsFile = await fs.readFile(this.path, 'utf-8');
            return JSON.parse(productsFile);
            
        } catch (error) {
            //Si no existe el archivo, crea uno con el nombre products.json con un array vacío dentro y lo guarda en la ruta especificada
            console.log(`El listado de productos ${this.path} no existe. Lo creamos...`);
            await fs.writeFile(this.path, '[]');
            return [];
        }
    
    }

    // GetProductsById busca productos por Id. Cada uno que se agrega a ProductManager debe tener un id diferente. El ID se genera cada vez que se agrega un producto, incrementando en 1 el id generado inmediatamente antes de la acción
    async getProductById(id){
        try {
            const productsFile = await fs.readFile(this.path, "utf-8");
            let productsList = JSON.parse(productsFile);

            //Búsqueda de producto por id (se recibe por parámetro) Si no lo encuentra, devuelve un error. Si lo encuentra, lo retorna por consola.
            const findProduct = productsList.find(p => p.id === id );

            if(!findProduct){
                throw new Error(`Producto con número de id ${id} no se encuentra en la lista`);
            }
            return findProduct

        } catch (error) {
            console.log(error);
        }
    }

    //Método para agregar productos al Json "Products". Al ser llamada y pasarle por parámetro un producto, será la encargada de agregarlo a ProductManager
    async addProducts(product){

        try {
            //Llamado del archivo y guardado en variable parseada producList
            const productsFile = await fs.readFile(this.path, "utf-8");
            let productsList = JSON.parse(productsFile);

            //Validación de repetición de productos agregados con mismo CODE o ID. Establece una igualdad entre los keys del array y los ingresados en Product. Si se cumplen las mismas, se guardan en la variable productRepeat, para luego evaluarlas.
            const productRepeat = productsList.find(p => p.code === product.code || p.id === product.idAuto);
        
            //Si el array de productos es > a 0, es decir, tiene al menos un objeto, entonces buscamos la última posición del mismo, extraemos el objeto y a su Id le sumamos 1, para que no se reinicie cada vez y se pisen los IDAUTO
            if (productsList.length > 0) {
                const lastPositionArray = productsList[productsList.length -1];
                this.idAuto = lastPositionArray.id +1;
            }

            if (!product) {
                console.log("error, no se indicó la carga de ningún producto")
                return product
            }
            // Si no se halla valor repetido de ID o Code en la variable productRepeat, entonces crea el nuevo producto y lo guarda en el array, haciendo spread y agregando un ID auto que incrementa en 1 el valor inicial. Debería ejecutarse solo cuando el array está vacío.
            if (!productRepeat) {

                let newProd = {...product, id: this.idAuto++};
                productsList.push(newProd);
                await fs.writeFile(this.path, JSON.stringify(productsList));
                return "Objeto cargado"
                
            }{
                throw new Error(`Producto con el código o id ${product.code} ya existe`);
            }

        } catch (error) {
            console.log(error)
        }
    }

    //Metodo que cambia el valor de un producto por otro, reemplazándolo. La búsqueda del producto a reemplazar se realiza por id. Recibe dos parámetros: id de producto buscado y producto que se reemplazará.
    async updateProducts(id, product ){

        try {
            //Se lee el archivo con fs y se parsea, guardándose en la variable productsList
            const productsFile = await fs.readFile(this.path, "utf-8");
            let productsList = JSON.parse(productsFile);

            //La variable productSearched guarda la posición del arreglo en la que se encuentra el objeto con el id pasado por parámetro.
            const productSearched = productsList.findIndex(p => p.id === id);

            //Condicional para verificar que el producto buscado exista. Si NO RETORNA -1, es decir, encuentra el objeto, entonces se ejecutarán las instrucciones dentro del if, de lo contrario mostrará el error por consola.
        if (productSearched !== -1) {
            //Se guarda en producto list, en la posición que encuentre findindex el nuevo producto con el mismo id que tenía
            productsList[productSearched] = {...product, id};
            await fs.writeFile(this.path, JSON.stringify(productsList));
            
        }else{
            throw new Error("El producto buscado con el id especificado no existe");
        }
    
        } catch (error) {
            console.log(error)
        }
    }

    //Método que permite encontrar un producto y eliminarlo mediante ID
    async deleteProduct(id){

        try {
             //Se lee el archivo con fs y se parsea, guardándose en la variable productsList
            const productsFile = await fs.readFile(this.path, "utf-8");
            let productsList = JSON.parse(productsFile);

            //La variable productSearched guarda el objeto buscando que sea igual al ID pasado por parámetro.
            const productSearched = productsList.find((p) => p.id === id);

        if (productSearched) {
            //Se filtran todos los objetos que no contengan el Id y se crea un nuevo array, que luegoes guardado en el archivo
            const newArrayProducts = productsList.filter((p) => p.id !== id);
            await fs.writeFile(this.path, JSON.stringify(newArrayProducts));
            return "Producto Eliminado"

        }else{
            throw new Error(`El producto buscado con el id ${id} no se puede eliminar porque no existe`)
        }
            
        } catch (error) {
            console.log(error)
        }
    }
};

//Productos de prueba

const productoPrueba1 = {
    title: "producto prueba",
    description: "Este es un producto prueba",
    price: 200,
    thumbnail: "Sin imagen",
    code: "abc123",
    stock: 25
  };

//Instanciado de ProductManager guardado en variable
// const productManager = new ProductManager();

// //Para comprobar el funcionamiento, llamar a productManager por cada uno de los métodos siguiendo los pasos del ejercicio dentro de la función TESTING

// const testing = async ()=>{
    
// //EJECUTAR PRUEBAS AQUÍ!!

// }

// testing()

export default ProductManager;




