import userService from '../services/usersService.js';

export const registerUser = async (req, res) => {
    try {
        const userData = req.body;
        const newUser = await userService.registerUser(userData);
        res.status(201).json(newUser);
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

export const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await userService.loginUser(username, password);
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        res.json(user);
    } catch (error) {
        console.error("Error logging in user:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

export default {
    registerUser,
    loginUser
};