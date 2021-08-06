import { Router } from 'express';
import { DynamicRequest } from '../../types';
import ModService from '../services/ModService';

const modsController = Router()
    .post('/', (req: DynamicRequest, res, next) => {
        ModService
            .add(req.body, req.userId)
            .then(mod => res.send(mod))
            .catch(next);
    });
	
export default modsController;
