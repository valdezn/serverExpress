import ProductManager from './src/clases/ProductManager.js'
import express from 'express'

const app = express()

const productsManager = new ProductManager()

app.get('/productos', async (req,res)=>{
    const limit = req.query.limit;
    if (!limit) return res.send(await productsManager.getProducts())
    const productos = await productsManager.getProducts()
    const prodlimit = productos.slice(0, limit)
    res.send(prodlimit)
})

app.get('/productos/:pid', async(req,res)=>{
    const product = await productsManager.getProductsById(req.params.pid)
    res.send(product)
})

app.listen(8080, ()=>{console.log('Servidor en 8080')})