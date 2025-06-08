import db from '../database/index.js';

const {Usuario} = db;

export const validarIdRepartidor = async (idRepartidor) => {
    try {
        const repartidor = await Usuario.findOne({
            where: {id: idRepartidor, rol: 'repartidor'}
        });

        if (!repartidor) {
            return false; 
        }

        return true; 
    } catch (error) {
        console.error('Error al validar el ID del repartidor:', error);
        throw new Error('Error al validar el ID del repartidor');
    }
}

export default {
    validarIdRepartidor
};