import { NextFunction, Response } from 'express';
import { DynamicRequest } from '../../types';
import { verify } from '../utils/jwt';

// based the Alchemy foundations BE bootstrap

const checkAuth = (req: DynamicRequest, res: Response, next: NextFunction): void  => {
    const token = req.get('Authorization');
    if (token) {
        try {
            const payload = verify(token);
            if (typeof payload === 'object') req.userId = payload.id;
        }
        catch (error) {
            res.status(401).send({ message: 'Invalid token' });
            return;
        }
        next();
    }
    else {
        res.status(401).send({ message: 'Request requires a token' });
    }
};

export default checkAuth;
