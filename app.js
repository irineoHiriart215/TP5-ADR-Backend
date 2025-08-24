require('dotenv').config();

const cors = require('cors');
const express = require('express');
const app = express();
const {sequelize} = require('./models');
const routes = require('./routes');

app.use(cors({
    origin: '*',
    credentials: true
}));
app.use(express.json());
app.use('/api', routes);

app.get('/', (req,res) => {
    res.send(`Servidor funcionando correctamente`);
})


sequelize.authenticate()
    .then (() => {
        console.log('Conexion a la base de datos exitosa')
    })
    .catch(err => {
        console.error('Error al conectar la base de datos:' , err)
    });

const PORT = process.env.PORT || 3000;
app.listen( PORT, () => {
    console.log(`Servidor escuchando en puerto ${PORT}`);
});