import fs from 'fs'



class ProductManager{

    constructor(path){
        this.path = path //Coloco la ruta como parametro 
        this.json = []//Genero Un array vacio para la primera carga del producto
    }

    async addProduct(product){
        const archivo = await fs.promises.readFile(this.path)
        if (archivo.length === 0){// Condicional para saber si el archivo esta vacio
            product.id = 1
            this.json.push(product)
            this.alArchivo = JSON.stringify(this.json,null,2)
            await fs.promises.writeFile(this.path,this.alArchivo)
        }else{
            const delArchivo = JSON.parse(archivo)
            product.id = delArchivo[delArchivo.length - 1].id + 1//Verifico y genero los id para los productos
            delArchivo.push(product)
            this.alArchivo = JSON.stringify(delArchivo,null,2)
            await fs.promises.writeFile(this.path,this.alArchivo)
        }
    }

    async getProduct(){
        const archivo = await fs.promises.readFile(this.path)
        this.productFile = JSON.parse(archivo)
        console.log(this.productFile)
    }

    async getProductById(id){
        const archivo = await fs.promises.readFile(this.path)
        this.productFile = JSON.parse(archivo)
        const searchProducts = this.productFile.find((value) => {if(value.id == id){return value}})
        if(searchProducts == undefined){//Genero un condicional para comunicar en caso de que se ingreso un ID erroneo
            console.log(`El ID ${id} no es valido`)
        }else{console.log(searchProducts)}
        }

    async deleteProduct(id){
        const archivo = await fs.promises.readFile(this.path)
        const productFile = JSON.parse(archivo)
        const searchProducts = productFile.find((value) => {if(value.id == id){return value}})
        let eliminar = productFile.indexOf(searchProducts)
        if(eliminar > -1){//Genero un condicional para comunicar en caso de que se ingreso un ID erroneo
            productFile.splice(eliminar,1)
        }else{console.log('No se encontro')}
        this.alArchivo = JSON.stringify(productFile,null,2)
        await fs.promises.writeFile(this.path,this.alArchivo)

    }
    
    async updateProduct(id,res){

        const archivo = await fs.promises.readFile(this.path)
        const productFile = JSON.parse(archivo)
        const searchProducts = productFile.find((value) => {if(value.id == id){return value}})
        const newValueProduct = {...res}
        const valueProduct = {...searchProducts,...newValueProduct}
        let eliminar = productFile.indexOf(searchProducts)
        if(eliminar > -1){//Genero un condicional para comunicar en caso de que se ingreso un ID erroneo
            productFile.splice(eliminar,1)
        }else{console.log('No se encontro')}
        //Remuevo el registro anterior para dar paso al actualizado
        productFile.push(valueProduct)
        this.alArchivo = JSON.stringify(productFile,null,2)
        await fs.promises.writeFile(this.path,this.alArchivo)
    }

}
    

class Product{
    constructor(title,description,price,thumbnail,code,stock){
        this.title = title
        this.description = description
        this.price = price
        this.thumbnail = thumbnail
        this.code = code
        this.stock = stock
    }
}


//const administrador = new ProductManager('./manejoDeArchivosEnJs/SegundoProductManagerJS/productsFile.txt')

//await administrador.addProduct(new Product('Toner Ricoh MP301','Insumo para impresoras Ricoh',10,'https://c8.alamy.com/compes/2gxf6rm/icono-de-impresora-laser-moderna-en-estilo-de-contorno-aislado-sobre-fondo-blanco-2gxf6rm.jpg',20,50))
//await administrador.addProduct(new Product('Toner Ricoh 1170D','Insumo para modelos 1515,161,171,201',8,'https://c8.alamy.com/compes/2gxf6rm/icono-de-impresora-laser-moderna-en-estilo-de-contorno-aislado-sobre-fondo-blanco-2gxf6rm.jpg',19,50))
//await administrador.addProduct(new Product('Test','Insumo para impresoras Ricoh',10,'https://c8.alamy.com/compes/2gxf6rm/icono-de-impresora-laser-moderna-en-estilo-de-contorno-aislado-sobre-fondo-blanco-2gxf6rm.jpg',18,50))

//await administrador.getProduct()

//await administrador.getProductById(3)

//await administrador.updateProduct(3,{'title':'prueba','price':'11'})

//await administrador.deleteProduct(1)
