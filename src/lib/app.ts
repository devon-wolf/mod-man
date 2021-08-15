import express from 'express';
import { handleError, handleNotFound } from './middleware/error-handling';
import usersController from './controllers/users';
import modsController from './controllers/mods';
import gamesController from './controllers/games';
import checkAuth from './middleware/auth-handling';

const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/v1/auth', usersController);
app.use('/api/v1/account', checkAuth);
app.use('/api/v1/account/games', gamesController);
app.use('/api/v1/account/mods', modsController);

app.use(handleNotFound);
app.use(handleError);

export default app;
