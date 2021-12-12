
const random = (min, max) => {
    return Math.floor((Math.random() * (max - min + 1)) + min)
}

const fs = require("fs");

class Productos {
    constructor(title, price, thumbnail) {
        this.title = title;
        this.price = price;
        this.thumbnail = thumbnail;
    }
}
class Contenedor {
    constructor(nameFile) {
        this.nameFile = nameFile;

        try {
            this.products = JSON.parse(fs.readFileSync(`./${this.nameFile}`, 'utf-8'))
        } catch (error) {
            console.error(`El archivo no existe`);
            this.products = [];
        }
    }

    /* Method GetById */
    async getById(id) {
        try {
            let wantedProduct = this.products.find(x => x.id === id);
            return wantedProduct;
        } catch (err) {
            console.log(err)
        }
        
    }

    async getAll() {
        try {
            let data = JSON.parse(fs.readFileSync(this.nameFile, 'utf-8'));
            return data;
        } catch (err) {
            console.log(err);
        }
    }
}

const fileHandler = new Contenedor("Productos.json");

/* ---------------------------------------------------------------------------------- */

const http = require('http');
const express = require('express');
const { consumers } = require("stream");

const app = express();
const PORT = 8080;

const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})

server.on("error", error => console.log(`Error en el servidor ${error}`));

app.get('/productos', (req, res) => {

    fileHandler.getAll().then((data) => {
        res.send(`Productos disponibles: ${JSON.stringify(data)}`)
    })
})

app.get('/productoRandom', (req, res) => {

    fileHandler.getById(random(1, 3)).then((data) => {
        res.send(`Producto random: ${JSON.stringify(data)}`)
    })

})



































/* const http = require("http");
const express = require("express");

const app = express();

const PORT = 8080;

let visitas = 0;

const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
})

server.on("error", error => console.log(`Error en servidor ${error}`))

app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "index.html"));
}) */


/* const server = http.createServer((peticion, respuesta) => {
    let saludo = saludar();
    respuesta.end(saludo);
});

const connectedServer = server.listen(8080, () => {
    console.log(`Servidor http escuchando en el puerto ${connectedServer.address().port}`)
})

function saludar() {
    let saludo;
    let fecha = new Date().toLocaleDateString();

    if (fecha > "06:00:00" && fecha < "13:00:00"){
        saludo = "Buenos dias!"
    }else {
        if (fecha < "19:00:00"){
            saludo = "Buenas tardes"
        }else {
            saludo = "Buenas noches"
        }
    }

    return saludo;
} */
