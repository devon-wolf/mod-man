import { Router } from 'express';
import { DynamicRequest } from '../../types';
import GameService from '../services/GameService';

const gamesController = Router()
    .post('/', (req: DynamicRequest, res, next) => {
        GameService
            .add(req.body.domain)
            .then(game => res.send(game))
            .catch(next);
    });

export default gamesController;
