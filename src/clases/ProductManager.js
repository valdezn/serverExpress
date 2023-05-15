import fs from 'fs'


export default class ProductManager{
    constructor(){
        this.path = 'src/clases/files/products.json'
        this.products = []
    }
    
    getProducts = async () => {
        if(fs.existsSync(this.path)){
            const view = await fs.promises.readFile(this.path, "utf-8");
            const products = JSON.parse(view, null, '\t')
            return products;
        }else{
            return [];
        }
    }
    
    getProductsById = async (id) => {
        const read = await this.getProducts();
        const ip = read.find((product) => {
            return product.id == id
        })
        return ip ? ip : `El producto con id: ${id} no existe`
    }
    
    addProducts = async (title, description, price, thumbnail, code, stock) => {
        const newProduct = {title, description, price, thumbnail, code, stock}
        const file = await this.getProducts();
        if (file.length == 0){
            newProduct.id = 1
        }else{
            newProduct.id = file[file.length-1].id + 1
        }
        
        this.products.push(newProduct)
        
        if (file.length == 0){
            await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, '\t'))
        }else{
            const update = [...file, newProduct]
            await fs.promises.writeFile(this.path, JSON.stringify(update, null, '\t'));
        } 
    }
    
    updateProduct = async ({id, ...productos}) => {
        const dell = await this.deleteProduct(id);
        if (dell != `El id: ${id} no existe.`){
            const read = await this.getProducts();
            const update = [{...productos, id}, ...read]
            await fs.promises.writeFile(this.path, JSON.stringify(update, null, '\t'));
            console.log(`El producto con id: ${id} fue actualizado`)
        }
    }
    
    deleteProduct = async (id) => {
        const read = await this.getProducts();
        const idp = read.find(products => products.id === id)
        if (idp != undefined){
            const ip = read.filter(products => products.id != id)
            await fs.promises.writeFile(this.path, JSON.stringify(ip, null, '\t'));
            console.log(`El producto con id: ${id} ha sido eliminado`)
        } else {
            console.log(`El id: ${id} no existe.`)
            return `El id: ${id} no existe.`
        }
    }
}