import User from "../models/User.js";

const login = (req, res) => {
    
    const { email, password } = req.body;

    res.json('Login...');
}

const register = async (req, res) => {

    /* const { name, password, email, phone, web, token, confirmed } = req.body;*/

    try {
        const user = new User(req.body);
        const response = await user.save();

        res.json(response);
        // res.json('Register...');

    } catch (error) {
        console.log(error);
    }

}

export {
    login,
    register
}