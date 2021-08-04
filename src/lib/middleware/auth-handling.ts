import { NextFunction, Response } from 'express';
import { DynamicRequest } from '../../types';
import { verify } from '../utils/jwt';

const checkAuth = (req: DynamicRequest, res: Response, next: NextFunction): void  => {
    const token = req.get('Authorization');
    if (token) {
        try {
            const payload = verify(token);
            
            typeof payload === 'string'
                ? req.userId = payload
                : req.userId = payload.id;
            
            next();
        }
        catch (error) {
            res.status(401).send({ message: 'Invalid token' });
        }
    }
    else {
        res.status(401).send({ message: 'Request requires a token' });
    }
};

export default checkAuth;
