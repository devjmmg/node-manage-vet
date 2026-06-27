import express from "express";
import auth from "./middlewares/auth.js";
import * as UserController from './controllers/UserController.js';
import * as AuthController from './controllers/AuthController.js';

const router = express.Router();

router.get('/users', UserController.index);

router.post('/login', AuthController.login);
router.post('/register', AuthController.register);
router.get('/confirm/:token', AuthController.confirm);

router.get('/profile', auth, AuthController.profile);

export default router;