import { Router } from 'express';

const modsController = Router()
    .post('/', (req, res, next) => {
        res.send({ hello: 'world' });
    });
	
export default modsController;
