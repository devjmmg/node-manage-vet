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

const confirm = (req, res) => {

}

export {
    login,
    register
}