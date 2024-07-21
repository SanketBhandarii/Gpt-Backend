import express from 'express';
import { login, logout, signup } from '../controllers/userController.js';
import { isAuth } from '../utils/isAuth.js';

const router = express.Router();

router.post("/signup",signup);
router.post('/login',login)
router.get('/logout',logout);
router.get("/home",isAuth);

export default router;