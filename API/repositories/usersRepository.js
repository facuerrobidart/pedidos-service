import db from '../database/index.js';
import bcrypt from 'bcryptjs';

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

export const createUser = async (userData) => {
    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(userData.password, saltRounds);
        const newUser = await Usuario.create({
            ...userData,
            password: hashedPassword
        });
        return newUser;
    } catch (error) {
        console.error("Error creating user:", error);
        throw new Error("Error creating user: " + error.message);
    }
}

export const loginUser = async (email, password) => {
    try {
        const user = await Usuario.findOne({ where: { email } });
        if (!user) {
            return null; 
        }

        //const isPasswordValid = await bcrypt.compare(password, user.password);
        if (user.password == password) {
            return user; 
        } else { 
            return null;
        }
    } catch (error) {
        console.error("Error finding user:", error);
        throw new Error("Error finding user: " + error.message);
    }
}


export default {
    validarIdRepartidor,
    createUser,
    loginUser,
};