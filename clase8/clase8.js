const fs = require("fs");

class Contenedor {
    constructor(nameFile) {
        this.nameFile = nameFile;

        try {
            this.products = JSON.parse(fs.readFileSync(`./${this.nameFile}`, 'utf-8'))
        } catch (error) {
            console.error(`El archivo no existe ${this.nameFile}`);
            this.products = [];
        }
    }

    /* Method Save */
    async save(product) {
        const index = this.products.length;
        product.id = index + 1;
        this.products.push(product);
        try {
            await fs.promises.writeFile(`./${this.nameFile}`, JSON.stringify(this.products), 'utf-8');
            return (product)
        } catch (error) {
            console.error(`Ocurrio un error: \n ${error}`)
        }
    }

    /* Method Put */
    async put(id, body) {
        const index = this.products.length;
        if (id < index) {
            this.products[id] = body;
            this.products[id].id = id;

            try {
                await fs.promises.writeFile(`./${this.nameFile}`, JSON.stringify(this.products), 'utf-8');
                return (JSON.stringify(this.products[id]));
            } catch (error) {
                console.error(`Ocurrio un error: \n ${error}`)
            }
        } else {
            const msg = `No existe un producto con un ID: ${id}`
            return (msg)
        }

    }

    /* Method GetById */
    async getById(id) {
        try {
            if (this.products[id]) {
                return (this.products[id])
            } else {
                return (`El producto buscado no existe`);
            }
        } catch (err) {
            console.log(`Error: ${err}`);
        }
    }

    async getAll() {

        try {
            await fs.promises.writeFile(`./${this.nameFile}`, JSON.stringify(this.products), 'utf-8')
            const pedirDatos = fs.readFileSync(this.nameFile, 'utf-8');
            if (pedirDatos === '') {
                console.log("Base de datos vacia");
                return ("Base de datos vacia");
            } else {
                const datos = JSON.parse(pedirDatos);
                console.log("Base de datos cargada...");
                return (`Todos los productos son: ${JSON.stringify(datos)}`)
            }
        } catch (err) {
            console.log(err);
        }
    }

    async deleteById(id) {
        if (this.products[id - 1]) {
            const newDB = this.products.filter(x => x.id != id);
            const index = newDB.length;
            for (let i = 0; i < index; i++) {
                newDB[i].id = i;
            }
            try {
                await fs.promises.writeFile(`./${this.nameFile}`, JSON.stringify(newDB), 'utf-8');
                return true;
            } catch (err) {
                console.error(error);
            }
        } else {
            return false;
        }
    }

    async deleteAll() {
        try {
            await fs.promises.writeFile(`./${this.nameFile}`, [], 'utf-8');
        } catch (error) {
            console.log(`Hubo un error ${error}`);
        }
    }

    /* Method AutoSave */
    async autoSave() {

        console.log("deberia funcionar")

        try {
            await fs.promises.writeFile(`./${this.nameFile}`, JSON.stringify(this.products), 'utf-8')
        } catch (error) {
            console.log(`Ocurrio un error: \n ${error}`)
        }
    }
}


/* Carga de ID's en el servidor */
const definirIndice = () => {
    const index = fileHandler.products.length;
    for (let i = 0; i < index; i++) {
        fileHandler.products[i].id = (i + 1);
    }
}

/* ----------------------------------------- */

const fileHandler = new Contenedor('productos.json');

const express = require('express');

const { Router } = express;

const app = express();
const router = Router();

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(express.json());
app.use(express.static('media'));

definirIndice();

/* GetAll */
router.get('/', (req, res) => {
    fileHandler.getAll().then((db) => {
        res.send(db);
    }).catch((err) => { throw err });
})

/* GetById */
router.get('/:id', (req, res) => {
    const id = req.params.id;


    fileHandler.getById(id).then((product) => {
        res.send(product)
    })
})


router.post('/', (req, res) => {
    fileHandler.save(req.body).then((product) => {
        res.send(`Subidisimo: \n ${product}`);
    })
})

router.put('/:id', (req, res) => {
    fileHandler.put(req.params.id, req.body).then((responsePut) => {
        res.send(responsePut);
    })
})

router.delete('/:id', (req, res) => {
    fileHandler.deleteById(req.params.id).then((boolean) => {
        if (boolean) {
            res.send(`El producto con ID:${req.params.id} fue eliminado`);
        } else {
            res.send(`El producto con ID:${req.params.id} no existe`);
        }
    })
})


app.use('/api/productos', router);

app.listen(8080);
