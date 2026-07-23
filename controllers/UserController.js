import User from "../models/User.js";

const profile = ({user}, res) => {
    res.json(user);
}

const update = async (req, res) => {
    const { user } = req;
    const { email } = req.body;

    if (!user) {
        return res.status(401).json({
            error: "Hubo algún error, inténtelo más tarde."
        });
    }

    // Solo verificar si cambió el correo
    if (email !== user.email) {
        const exist = await User.findOne({ email });

        if (exist) {
            return res.status(409).json({
                email: 'El correo electrónico ya se encuentra registrado.'
            });
        }
    }

    try {
        user.set(req.body);
        await user.save();

        res.json({
            success: 'La información se actualizó correctamente.',
            user
        });
    } catch (error) {
        res.status(500).json({
            error: 'Error interno del servidor.'
        });
    }
};

const password = async (req, res) => {

    const user = await User.findById(req.user._id);
    const { currentPassword, password } = req.body;

    if (!user) {
        return res.status(404).json({
            error: 'Usuario no encontrado.'
        });
    }

    if (!(await user.checkPassword(currentPassword))) {
        return res.status(400).json({
            currentPassword: 'La contraseña actual es incorrecta.'
        });
    }

    user.password = password;
    await user.save();

    res.json({
        success: 'La contraseña se actualizó correctamente.'
    });
}


export {
    profile,
    update,
    password
}