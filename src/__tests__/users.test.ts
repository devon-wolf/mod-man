import request from 'supertest';
import setup from '../data/setup';
import app from '../lib/app';
import pool from '../lib/utils/pool';

describe('Users', () => {
    beforeEach(async () => {
        await setup(pool);
        await request(app)
            .post('/api/v1/auth/signup')
            .send({
                email: 'seed@user.com',
                password: 'seedpassword'
            });
    });

    it('creates a new user', async () => {
        const newUser = {
            email: 'testuser@test.com',
            password: 'testpassword'
        };

        const response = await request(app)
            .post('/api/v1/auth/signup')
            .send(newUser);
        
        expect(response.body).toEqual({
            id: '2',
            email: newUser.email
        });
    });

    it('gives an error message when trying to create a user with an existing email', async () => {
        const response = await request(app)
            .post('/api/v1/auth/signup')
            .send({
                email: 'seed@user.com',
                password: 'differentpassword'
            });

        expect(response.body).toEqual({
            message: 'A user already exists with that email'
        });
    });

    it('logs in an existing user', async () => {
        const response = await request(app)
            .post('/api/v1/auth/login')
            .send({
                email: 'seed@user.com',
                password: 'seedpassword'
            });
        
        expect(response.body).toEqual({
            id: '1',
            email: 'seed@user.com'
        });
    });

    it('fails to login if given the wrong password', async () => {
        const response = await request(app)
            .post('/api/v1/auth/login')
            .send({
                email: 'seed@user.com',
                password: 'wrongpassword'
            });

        expect(response.body).toEqual({
            message: 'Incorrect password'
        });
    });

    it('fails to login if given a nonexisting email', async () => {
        const response = await request(app)
            .post('/api/v1/auth/login')
            .send({
                email: 'new@user.com',
                password: 'somenewpassword'
            });

        expect(response.body).toEqual({
            message: 'No user with that email exists in the database'
        });
    });
});
