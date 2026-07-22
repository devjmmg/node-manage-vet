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

export {
    profile,
    update
}