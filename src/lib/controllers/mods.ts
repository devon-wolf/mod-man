import { Router } from 'express';

export default Router()
    .post('/', (req, res, next) => {
        res.send('nothing');
    });
	
