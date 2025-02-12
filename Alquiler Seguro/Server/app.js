import 'dotenv/config';
import cors from 'cors';

import express from 'express';
import getPool from './src/db/getPool.js';
import jsonMiddleware from './src/middlewares/jsonMiddleware.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(jsonMiddleware);

app.use(cors());

// 📌 Ruta de prueba para verificar que el middleware funciona
app.post('/api/test', (req, res) => {
    console.log(req.body);

    res.json({ message: 'Datos recibidos correctamente', data: req.body });
});

// Ruta de ejemplo para comprobar la conexión a la base de datos.
app.get('/', async (req, res) => {
    try {
        const pool = await getPool();
        // Realizamos una consulta simple para obtener la hora actual desde MySQL.
        const [rows] = await pool.query('SELECT NOW() AS currentTime');
        res.json({
            message:
                'Servidor Express funcionando y conectado a la base de datos',
            currentTime: rows[0].currentTime,
        });
    } catch (error) {
        console.error('Error en la consulta:', error);
        res.status(500).json({
            error: 'Error en la consulta a la base de datos',
        });
    }
});

//Middleware de gestión de errores
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.httpStatus || 500).send({
        status: 'error',
        message: err.message,
    });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto http://localhost:${PORT}`);
});
