import { Router } from 'express';

const modsController = Router()
    .post('/', (req, res, next) => {
        ModService
            .add(req.body)
            .then(mod => res.send(mod))
            .catch(next);
    });
	
export default modsController;
