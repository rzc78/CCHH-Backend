//Desafío Entregable 1 - RODRIGO ZALAZAR CAVALLERIS
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

//LogicA

//Class Constructor de Product Manager, con instancia inicial de un arreglo vacío y una variable idAuto iniciada en 1, la cual al recibir nuevos productos, irá incrementándose en 1 cada vez.
class ProductManager{
    constructor(){
        this.products = [];
        this.idAuto = 1;

    }
    //Función para obtener productos del array. Al llamarla por primera vez, retorna el array vacío en su estado inicial. Si tiene productos, los muestra en consola.
    getProducts(){
        return this.products;
    
    }

    //Función para obtener productos por Id. Cada producto que se agrega al ProductManager debe tener un id diferente. El ID se genera cada vez que se agrega un producto, incrementando en 1 el id generado inmediatamente antes de la acción
    getProductById(id){

        //Búsqueda de producto por id. Si no lo encuentra, devuelve un error. Si lo encuentra, lo retorna por consola.
        const findProduct = this.products.find(p => p.id === id )
        if(!findProduct){
            throw Error(`Producto con número de ${id} no se encuentra en la lista`)
        }
        return findProduct
    }

    //Función para agregar productos al array Products. Al ser llamada y pasarle por parámetro un producto, será la encargada de agregarlo a ProductManager
    addProducts(product){        
        //Guardamos en la variable productRepeat el valor del code encontrado en el array de products mediante el método find
        const productRepeat = this.products.find(p => p.code === product.code)

        //Condicional para hacer el filtro en caso de que el code esté repetido. Si no está repetido lo agrega con un ID autogenerado que incrementa en 1, caso contrario, devuelve un error.
        if(!productRepeat){
            //Genera un nuevo objeto con el producto que se cargará al array "products", a través de spread operator y sumandole un nuevo par clave valor, en este caso, un nuevo ID.
            const newProd = {...product, id: this.idAuto++};
            //Carga del objeto al array products a través del método PUSH
            this.products.push(newProd);
            return newProd;
        }{
            throw new Error(`Producto con código ${product.code} ya existe`);
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

const productoPrueba2 = {
    title: "Pera",
    description: "Pera Juanita",
    price: 650,
    thumbnail: "Sin imagen",
    code: "abc321",
    stock: 23
  };


const productoPrueba3 = {
    title: "Manzana",
    description: "Manzana roja",
    price: 680,
    thumbnail: "Sin imagen",
    code: "aeef",
    stock: 23
  };


//Instanciado de ProductManager guardado en variable
const productManager = new ProductManager();


//Para comprobar el funcionamiento, llamar a productManager por cada uno de los métodos siguiendo los pasos del ejercicio




