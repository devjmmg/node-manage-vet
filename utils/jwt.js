import jwt from "jsonwebtoken";

const createJWT = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '2h'
    });
}

export {
    createJWT
}