import { Router } from 'express';
import { DynamicRequest } from '../../types';
import ModService from '../services/ModService';

const modsController = Router()
    .post('/', (req: DynamicRequest, res, next) => {
        ModService
            .add(req.body, req.userId)
            .then(mod => res.send(mod))
            .catch(next);
    })
    
    .get('/', (req: DynamicRequest, res, next) => {
        ModService
            .getAll(req.userId)
            .then(mods => res.send(mods))
            .catch(next);
    })
    
    
    .get('/:id', (req: DynamicRequest, res, next) => {
        ModService
            .getById(req.userId, req.params.id)
            .then(mod => res.send(mod))
            .catch(next);
    });
	
export default modsController;
