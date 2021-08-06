import { Router } from 'express';
import ModService from '../services/ModService';

const modsController = Router()
    .post('/', (req, res, next) => {
        ModService
            .add(req.body)
            .then(mod => res.send(mod))
            .catch(next);
    });
	
export default modsController;
