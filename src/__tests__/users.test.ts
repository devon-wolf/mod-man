import request from 'supertest';
import setup from '../data/setup';
import app from '../lib/app';
import pool from '../lib/utils/pool';

describe('Users', () => {
    let token = '';

    beforeEach(async () => {
        await setup(pool);
        const signUp = await request(app)
            .post('/api/v1/auth/signup')
            .send({
                email: 'seed@user.com',
                password: 'seedpassword'
            });
        token = signUp.body.token;
    });

    it('creates a new user', async () => {
        const response = await request(app)
            .post('/api/v1/auth/signup')
            .send({
                email: 'testuser@test.com',
                password: 'testpassword'
            });

        expect(response.body).toEqual({
            id: '2',
            email: 'testuser@test.com',
            token: expect.any(String)
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
            email: 'seed@user.com',
            token: expect.any(String)
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

    it('verifies a logged in user', async () => {
        const verification = await request(app)
            .get('/api/v1/auth/verify')
            .set({ Authorization: token });

        expect(verification.body).toEqual({
            verified: true
        });
    });

    it('does not verify a user with an invalid token', async () => {
        const verification = await request(app)
            .get('/api/v1/auth/verify')
            .set({ Authorization: 'thisisanirrelevanttoken' });

        expect(verification.body).toEqual({
            message: 'Invalid token'
        });
    });

    it('does not verify a request without a token', async () => {
        const verification = await request(app)
            .get('/api/v1/auth/verify');

        expect(verification.body).toEqual({
            message: 'Request requires a token'
        });
    });
});
