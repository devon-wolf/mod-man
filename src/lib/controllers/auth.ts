import { Router } from 'express';
import checkAuth from '../middleware/auth-handling';

const authController = Router()
    .get('/verify', (req, res, next) => {
        checkAuth(req, res, next);
    });

export default authController;
