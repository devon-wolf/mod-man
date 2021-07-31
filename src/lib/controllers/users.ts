import { Router } from 'express';
import UserService from '../services/UserService';

const usersController = Router()
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
