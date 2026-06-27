import jwt from "jsonwebtoken";
import User from "../models/User.js";

const auth = async (req, res, next) => {
    const bearer = req.headers.authorization;
    if ( !bearer || !bearer.startsWith('Bearer') ) {
        return res.status(401).json({
            error: "Token inválido"
        });
    }
    const token = bearer.split(' ')[1];
    try {
        const { id } = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(id).select("-password -token -confirmed");
    } catch (error) {
        return res.status(401).json({
            error: "Token inválido o expirado"
        });
    }
    next();
}

export default auth;