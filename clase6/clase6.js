const http = require("http");
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
})









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
