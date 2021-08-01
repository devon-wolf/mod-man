import { Router } from 'express';
import authController from './auth';
import UserService from '../services/UserService';

const usersController = Router()

    .get('/verify', authController, (req, res) => {
        res.send({ verified: true });
    })

    .post('/signup', (req, res, next) => {
        UserService
            .createUser(req.body)
            .then(user => res.send(user))
            .catch(next);
    })
    
    .post('/login', (req, res, next) => {
        UserService
            .login(req.body)
            .then(user => res.send(user))
            .catch(next);
    });
	
export default usersController;
