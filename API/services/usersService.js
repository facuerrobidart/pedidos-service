import pedidosRepository from '../repositories/pedidosRepository.js';

export const validarIdRepartidor = (idRepartidor) => {
    
    const isRepartidor = pedidosRepository.validarIdRepartidor(idRepartidor);
    if (!isRepartidor) {
        throw new Error('El ID del repartidor no es válido, no existe o pertenece a otro rol.');
    }
}