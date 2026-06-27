import jwt from "jsonwebtoken";

const createJWT = () => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });
}

export {
    createJWT
}