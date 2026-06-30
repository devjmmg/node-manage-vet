import User from "../models/User.js";
import { randomBytes } from "crypto";
import { createJWT } from "../utils/index.js";

const login = async (req, res) => {
    
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(401).json({
            error: 'El correo electrónico o la contraseña es incorrecta'
        });
    }
    const isValidPassword = await user.checkPassword(password);
    if (!isValidPassword) {
        return res.status(401).json({
            error: 'El correo electrónico o la contraseña es incorrecta'
        });
    }
    if (!user.confirmed) {
        return res.status(403).json({
            error: 'Debes confirmar tu correo electrónico antes de iniciar sesión'
        });
    }
    return res.status(200).json({
        token: createJWT(user.id)
    });
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

const profile = (req, res) => {
    const { user } = req;
    res.json({user});
}

const forgotPassword = async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({email});
    try {
        if ( user ) {
            user.token = randomBytes(32).toString('base64url');
            await user.save();
        }
        return res.status(200).json({
            message: "Recibirás un enlace a tu correo electrónico para restablecer tu contraseña."
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: "Error interno del servidor"
        }); 
    }
}

const validateToken = async (req, res) => {
    const { token } = req.params;
    const user = await User.findOne({ token });
    if (user) {
        return res.status(200).json({
            message: "Token válido"
        });
    }
    return res.status(404).json({
        message: "Token no válido"
    });
}

const resetPassword = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;

    const user = await User.findOne({ token });
    if ( !user) {
        return res.status(401).json({
            error: "Token no valido"
        });
    }

    try {
        user.token = null;
        user.password = password;
        await user.save();
        return res.status(200).json({
            message: "Contraseña actualizada correctamente"
        })
    } catch (error) {
        console.log(error);
    }

}

export {
    login,
    register,
    confirm,
    profile,
    forgotPassword,
    validateToken,
    resetPassword
}