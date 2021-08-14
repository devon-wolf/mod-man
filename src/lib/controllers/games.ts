import { Router } from 'express';
import { DynamicRequest } from '../../types';
import GameService from '../services/GameService';

const gamesController = Router()
    .post('/', (req: DynamicRequest, res, next) => {
        GameService
            .add(req.body.domain)
            .then(game => res.send(game))
            .catch(next);
    })
    
    .get('/', (req: DynamicRequest, res, next) => {
        GameService
            .getUserGames(req.userId)
            .then(games => res.send(games))
            .catch(next);
    });

export default gamesController;
