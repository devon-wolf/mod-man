import express from 'express';
import { handleError, handleNotFound } from './middleware/error-handling';
import checkAuth from './middleware/auth-handling';
import usersController from './controllers/users';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/v1/auth', usersController);
// app.use('/api/v1/user', checkAuth);


app.use(handleNotFound);
app.use(handleError);

export default app;
