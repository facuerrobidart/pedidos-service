import usersRepository from '../repositories/usersRepository.js';

export const validarIdRepartidor = (idRepartidor) => {
    
    const isRepartidor = pedidosRepository.validarIdRepartidor(idRepartidor);
    if (!isRepartidor) {
        throw new Error('El ID del repartidor no es válido, no existe o pertenece a otro rol.');
    }
}

export const registerUser = async (userData) => {
    try {
        const newUser = await usersRepository.createUser(userData);
        return newUser;
    } catch (error) {
        console.error("Error registering user:", error);
        throw new Error("Error registering user: " + error.message);
    }
}

export const loginUser = async (email, password) => {
    try {
        const user = await usersRepository.loginUser(email, password);
        return user;
    } catch (error) {
        console.error("Error logging in user:", error);
        throw new Error("Error logging in user: " + error.message);
    }
}

export default {
    registerUser,
    loginUser,
    validarIdRepartidor
};