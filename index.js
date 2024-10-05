const express = require('express');
const morgan = require('morgan');
const cors = require("cors");
require('dotenv').config();
const bodyParser = require('body-parser');

// Archivos de las rutas
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');

// File Middlewares
const { notFound, errorHandler } = require('./middlewares/errorHanddler');

// File DB_Config Conection
const dbConection = require('./configs/dbConfig');

// Configuración del servidor para express
const app = express();
const port = process.env.PORT || 3000;

// Inicialización de morgan
app.use(morgan('dev'));

// Conexión a la base de datos
dbConection();

// Middleware para procesar JSON en las peticiones
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);

// Middleware server
app.use(notFound);
app.use(errorHandler);


// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});