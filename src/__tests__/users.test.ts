import request from 'supertest';
import setup from '../data/setup';
import app from '../lib/app';
import pool from '../lib/utils/pool';

describe('Users', () => {
    beforeEach(() => {
        return setup(pool);
    });

    it('creates a new user', () => {
        const newUser = {
            email: 'testuser@test.com',
            password: 'testpassword'
        };

        return request(app)
            .post('/api/v1/auth/signup')
            .send(newUser)
            .then(response => {
                expect(response.body).toEqual({
                    id: '1',
                    email: newUser.email
                });
            });
    });
});
