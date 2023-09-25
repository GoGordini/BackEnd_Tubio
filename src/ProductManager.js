import fs from 'fs';

export default class ProductManager {

    constructor(path){
        this.path=path;
    }

    getProducts = async ()=> {
        try {
                if (fs.existsSync(this.path)) {
                    const data = await fs.promises.readFile(this.path, 'utf-8');
                    const products = JSON.parse(data);
                    return products;
                } else {
                    return [];
                }
            } catch (error) {
                console.log(error);
            }
        }
    
        updateProduct=async (id_a_actualizar,campo,nuevoValor)=>{
            try{
                const products = await this.getProducts();
                const productIndex = products.findIndex(producto => producto.id === id_a_actualizar);
                if (productIndex===-1){
                    console.log("¡Producto no encontrado!");
                    return;
                };
                products[productIndex][campo]=nuevoValor;
                await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));
                return products[productIndex];
            } catch (error) {
                console.log(error);
            }
                };
    deleteProduct=async (id_a_eliminar)=>{
            try{
                const products = await this.getProducts();
                const productIndex = products.findIndex(producto => producto.id === id_a_eliminar);
                if (productIndex===-1){
                    console.log("¡Producto no encontrado!");
                    return;
                };
                const productoEliminado=products.splice(productIndex,1);
                await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));
                return productoEliminado;
            } catch (error) {
                console.log(error);
            }
                };
    getProductById=async (id_buscada)=>{
        try{
            const products = await this.getProducts();
            const product_found=products.find((producto) => producto.id===id_buscada)??"¡Producto no encontrado!"
            console.log(product_found);
            return product_found;
        } catch (error) {
            console.log(error);
            return {"error": error};
        }
            };

    addProduct = async (title,description,price,thumbnail,code,stock) => {
        try{
      if (!title || !description || !price || !thumbnail || !code || !stock){
            console.log("¡Todos los campos son obligatorios!");
            return;
        };
        const products = await this.getProducts();
        const productIndex = products
            .findIndex(producto => producto.code === code);
        if (productIndex!==-1){
            console.log("¡El producto ya existe!");
            return;
        }
        const product ={
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        }
        
        products.length===0? (product.id=1) : (product.id=products[products.length-1].id+1);
        products.push(product);
        await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));
        return product;

    } catch (error) {
        console.log(error);
    }
    }
}