const fs = require("fs");

class Productos {
    constructor(title, price, thumbnail) {
        this.title = title;
        this.price = price;
        this.thumbnail = thumbnail;
    }
}

let rdr2 = new Productos("Red Dead Redemption 2", 2700, "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.epicgames.com%2Fstore%2Fes-ES%2Fp%2Fred-dead-redemption-2&psig=AOvVaw22TD80368rymynfePwUlE0&ust=1638548839740000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCPCq3Z_ExfQCFQAAAAAdAAAAABAD");
let tboi = new Productos("The Binding of Isaac: Repentance", 1200, "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.epicgames.com%2Fstore%2Fes-ES%2Fp%2Fthe-binding-of-isaac-repentance&psig=AOvVaw1C9TIkxFbJhSC_6Oc9gPVB&ust=1638565124534000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCLCKkfuAxvQCFQAAAAAdAAAAABAD")

class Contenedor {
    constructor(nameFile){
        this.nameFile = nameFile;

        try {
            this.products = JSON.parse(fs.readFileSync(`./${this.nameFile}`, 'utf-8'))
        } catch (error) {
            console.error(`El archivo no existe`);
            this.products = [];
        }
    }

    /* Method Save */
    async save(product){
        const index = this.products.length;
        product.id = index + 1;

        this.products.push(product);

        try {
            await fs.promises.writeFile(`./${this.nameFile}`, JSON.stringify(this.products), 'utf-8')
        } catch (error) {
            console.error(`Ocurrio un error: \n ${error}`)
        }
    }

    /* Method GetById */
    getById(id) {
        let wantedProduct = this.products.find(x => x.id === id);

        console.log(`El elemento buscado es el siguiente: \n 
        ${wantedProduct.title} \n
        ${wantedProduct.price} \n
        ${wantedProduct.id}`);
        
    }

    getAll() {
        for(let i = 0; i < this.products.length; i++){
            console.log(this.products[i])
        }
    }

    async deleteById(id){
        let producto = this.products.filter(p => p.id !== id)
        
        try {
            await fs.promises.writeFile(`./${this.nameFile}`, JSON.stringify(producto), 'utf-8')
            console.log('Producto eliminado')
        } catch (error) {
            console.log(error)
        }
    }

    async deleteAll() {
        try {
            await fs.promises.writeFile(`./${this.nameFile}`, [], 'utf-8');
        } catch(error) {
            console.log(`Hubo un error ${error}`);
        }
    }
}

const fileHandler = new Contenedor("PrimerArchivo.json");


