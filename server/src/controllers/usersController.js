import { getAllUsers } from '../models/userModel.js';

const getUsers = async (req, res) => {
    try {
        const { username, email, role } = req.query; // Tomamos los filtros desde la URL

        const users = await getAllUsers({ username, email, role });

        res.status(200).json({
            message: 'Lista de usuarios obtenida correctamente',
            users,
        });
    } catch (error) {
        res.status(500).json({
            error: 'Error al obtener la lista de usuarios',
            details: error.message,
        });
    }
};

export { getUsers };

