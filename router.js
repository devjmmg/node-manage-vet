import express from "express";
import auth from "./middlewares/auth.js";
import * as AuthController from './controllers/AuthController.js';
import * as PetController from './controllers/PetController.js'
import * as UserController from './controllers/UserController.js'

const router = express.Router();

router.post('/login', AuthController.login);
router.post('/register', AuthController.register);
router.get('/confirm-account/:token', AuthController.confirm);

router.post('/forgot-password', AuthController.forgotPassword);
router.get('/reset-password/:token', AuthController.validateToken);
router.post('/reset-password/:token', AuthController.resetPassword);

router.get('/profile', auth, UserController.profile);
router.put('/profile', auth, UserController.update);

router.get('/pets', auth, PetController.index);
router.post('/pets', auth, PetController.store);
router.get('/pets/:id', auth, PetController.show);
router.put('/pets/:id', auth, PetController.update);
router.delete('/pets/:id', auth, PetController.destroy);

export default router;