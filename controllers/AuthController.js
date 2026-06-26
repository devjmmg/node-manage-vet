import User from "../models/User.js";
import crypto from "crypto";

const login = (req, res) => {
    
    const { email, password } = req.body;
    
    res.json('Login...');
}

const register = async (req, res) => {
    
    const { email } = req.body;
    const exist = await User.findOne({ email });
    
    if (exist) {
        return res.status(409).json({
            error: 'El correo electrónico ya se encuentra registrado'
        });
    }
    
    try {
        const user = new User(req.body);
        await user.save();
        
        return res.status(201).json({
            message: 'Usuario registrado correctamente. Revisa tu correo para confirmar tu cuenta.'
        });
        
    } catch (error) {
        console.log(error);
    }
    
}

const confirm = async (req, res) => {
    const token = req.params.token;
    const user = await User.findOne({ token });
    if (!user) {
        return res.status(404).json({
            error: 'Token no valido'
        });
    }
    try {
        user.confirmed = true;
        user.token = null;
        await user.save();
        
        return res.json({
            message: 'Cuenta confirmada correctamente'
        });
    } catch (error) {
        console.log(error);
    }
}

export {
    login,
    register,
    confirm
}