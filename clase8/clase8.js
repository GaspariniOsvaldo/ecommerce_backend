import express from 'express';

const { Router } = express;

const app = express();
const router1 = Router();
const router2 = Router();

router1.get('/recurso', (req, res) => {
    res.send('get ok')
})

router1.post('/recurso', (req, res) => {
    res.send('post ok')
})

app.use('/router', router1)
app.use('/router2', router2)



const server = app.listen(8080, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})

server.on("error", error => console.log(`Error en el servidor ${error}`));