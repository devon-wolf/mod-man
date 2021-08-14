import request from 'supertest';
import setup from '../data/setup';
import app from '../lib/app';
import pool from '../lib/utils/pool';

describe('Games', () => {
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

    it('creates a new game by its domain', async () => {
        const response = await request(app)
            .post('/api/v1/account/games')
            .set({ Authorization: token })
            .send({ domain: 'morrowind' });
            
        expect(response.body).toEqual({
            id: '1',
            name: 'Morrowind',
            domainName: 'morrowind',
            dbGameId: 100
        });
    });
});
