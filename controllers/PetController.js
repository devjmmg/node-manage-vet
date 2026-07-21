import Pet from "../models/Pet.js";

const index = async (req, res) => {
    try {
        const { user: { id: user_id } } = req;
        const pets = await Pet.find({ user_id }).sort({ createdAt: 1 });;
        return res.status(200).json({
            pets: pets.map(pet => ({
                _id: pet._id,
                name: pet.name,
                owner: pet.owner,
                email: pet.email,
                registrationDate: pet.registrationDate,
                symptoms: pet.symptoms
            }))
        });
    } catch (error) {
        return res.status(500).json({
            error: "Error interno del servidor"
        });
    }
};

const store = async (req, res) => {
    try {
        const { user: { id } } = req;
        const pet = new Pet(req.body);
        pet.user_id = id;
        await pet.save();
        return res.status(201).json({
            success: "Mascota registrada correctamente.",
            pet: {
                _id: pet._id,
                name: pet.name,
                owner: pet.owner,
                email: pet.email,
                registrationDate: pet.registrationDate,
                symptoms: pet.symptoms
            }
        });
    } catch (error) {
        return res.status(500).json({
            error: "Error interno del servidor."
        });
    }
};

const show = async (req, res) => {
    try {
        const { id: _id } = req.params;
        const { user } = req;
        const pet = await Pet.findOne({ _id });

        if ( (pet.user_id.toString() !== user.id.toString()) || !pet  ) {
            return res.status(500).json({
                pet: {}
            });
        } 

        return res.status(200).json({
            pet
        });
    } catch (error) {
        return res.status(500).json({
            error: "Error interno del servidor."
        });
    }
};

const update = async (req, res) => {
    try {
        const { id: _id } = req.params;
        const { user } = req;

        const pet = await Pet.findById(_id);

        if (!pet) {
            return res.status(404).json({
                error: "Mascota no encontrada."
            });
        }

        if (pet.user_id.toString() !== user.id.toString()) {
            return res.status(403).json({
                error: "No tienes permiso para actualizar esta mascota."
            });
        }

        pet.set(req.body);
        await pet.save();

        return res.status(200).json({
            success: "Mascota actualizada correctamente.",
            pet: {
                _id: pet._id,
                name: pet.name,
                owner: pet.owner,
                email: pet.email,
                registrationDate: pet.registrationDate,
                symptoms: pet.symptoms
            }
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            error: "Error interno del servidor."
        });
    }
};

const destroy = async (req, res) => {
    try {
        const { id: _id } = req.params;
        const { user } = req;

        const pet = await Pet.findById(_id);

        if (!pet) {
            return res.status(404).json({
                error: "Mascota no encontrada."
            });
        }

        if (pet.user_id.toString() !== user.id.toString()) {
            return res.status(403).json({
                error: "No tienes permiso para eliminar esta mascota."
            });
        }

        await pet.deleteOne();
        return res.status(200).json({
            success: "Mascota eliminada correctamente."
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            error: "Error interno del servidor"
        });
    }
};

export {
    index,
    store,
    show,
    update,
    destroy
}