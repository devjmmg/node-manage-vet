import User from "../models/User.js";
import { randomBytes } from "crypto";
import { createJWT } from "../utils/jwt.js";
import { sendConfirmationEmail, sendResetPasswordEmail } from "../utils/email.js";

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
    
    const { email, password, token } = req.body;
    const user = await User.findOne({ email });
    
    if (user) {

        if (user.confirmed) {
            return res.status(409).json({
                email: 'El correo electrónico ya se encuentra registrado.'
            });
        }

        user.name = req.body.name;
        user.password = req.body.password;
        user.token = randomBytes(32).toString('hex');
        await user.save();

        await sendConfirmationEmail({
            name: user.name,
            email: user.email,
            token: user.token
        });

        return res.status(200).json({
            success: 'La cuenta aún no ha sido confirmada. Te hemos enviado un nuevo correo de confirmación.'
        });
    }
    
    try {
        const user = new User(req.body);
        await user.save();

        await sendConfirmationEmail({
            name: user.name,
            email: user.email,
            token: user.token
        });
        
        return res.status(201).json({
            success: 'Usuario registrado correctamente. Revisa tu correo electrónico para confirmar tu cuenta.'
        });
        
    } catch (error) {
        return res.status(500).json({
            error: "Error interno del servidor"
        });
    }
    
}

const confirm = async (req, res) => {
    const { token } = req.params;
    const user = await User.findOne({ token });
    if (!user) {
        return res.status(404).json({
            error: 'Token no valido.'
        });
    }
    try {
        user.confirmed = true;
        user.token = null;
        await user.save();
        
        return res.json({
            message: 'Cuenta confirmada correctamente.'
        });
    } catch (error) {
        return res.status(500).json({
            error: "Error interno del servidor"
        });
    }
}

const forgotPassword = async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({email});
    try {
        if ( user ) {
            user.token = randomBytes(32).toString('base64url');
            await user.save();
            await sendResetPasswordEmail({
                name: user.name,
                email: user.email,
                token: user.token
            });
        }
        return res.status(200).json({
            success: "Recibirás un enlace a tu correo electrónico para restablecer tu contraseña."
        });
    } catch (error) {
        return res.status(500).json({
            error: "Error interno del servidor"
        }); 
    }
}

const validateToken = async (req, res) => {
    const { token } = req.params;
    const user = await User.findOne({ token });
    if (user) {
        return res.status(200).end();
    }
    return res.status(404).json({
        error: "Hubo algún error con el enlace"
    });
}

const resetPassword = async (req, res) => {
    const { token } = req.params;
    const { password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
        return res.status(400).json({
            confirmPassword: "Las contraseñas no coinciden"
        });
    }

    const user = await User.findOne({ token });
    if ( !user) {
        return res.status(401).json({
            error: "Hubo algún error con el enlace"
        });
    }

    try {
        user.token = null;
        user.password = password;
        await user.save();
        return res.status(200).json({
            message: 'La contraseña se actualizo correctamente'
        });
    } catch (error) {
        return res.status(500).json({
            error: "Error interno del servidor"
        });
    }

}

export {
    login,
    register,
    confirm,
    forgotPassword,
    validateToken,
    resetPassword
}