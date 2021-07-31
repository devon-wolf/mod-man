import { Router } from 'express';

const modsController = Router()
    .post('/', (req, res, next) => {
        res.send('nothing');
    });
	
export default modsController;
