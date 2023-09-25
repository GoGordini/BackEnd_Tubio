import express from 'express';
import ProductManager from './ProductManager.js';

const app = express();
app.use(express.urlencoded({extended: true}));

const productManager = new ProductManager ("productos.json");

app.get('/products', async (req, res) => {
    const products = await productManager.getProducts();
    const limite = Number(req.query.limit);
    if(!limite || limite>products.length||limite<=0)
    return res.send(products);
    return res.send(products.slice(0,limite));
});

app.get('/products/:pid', async (req, res) => {
    const productId = Number(req.params.pid);
    const producto = await productManager.getProductById(productId);
    res.send(producto);
});

 app.listen(8080, () => console.log('Listening on port 8080'));