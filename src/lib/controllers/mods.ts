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
    })
    
    .put('/:id', (req: DynamicRequest, res, next) => {
        ModService
            .update(req.userId, req.params.id, req.body.currentVersion)
            .then(mod => res.send(mod))
            .catch(next);
    })
    
    .delete('/:id', (req: DynamicRequest, res, next) => {
        ModService
            .remove(req.userId, req.params.id)
            .then(message => res.send(message))
            .catch(next);
    });
	
export default modsController;
