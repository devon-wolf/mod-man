import request from 'supertest';
import setup from '../data/setup';
import app from '../lib/app';
import pool from '../lib/utils/pool';
import { nexusSMAPI } from '../data/sample-data/smapi';

describe('Mods', () => {
    let token = '';
    let token2 = '';

    beforeEach(async () => {
        await setup(pool);
        const signUp = await request(app)
            .post('/api/v1/auth/signup')
            .send({
                email: 'seed@user.com',
                password: 'seedpassword'
            });
        token = signUp.body.token;

        const signUp2 = await request(app)
            .post('/api/v1/auth/signup')
            .send({
                email: 'seed2@user.com',
                password: 'seedpassword2'
            });
        token2 = signUp2.body.token;
    });

    it('adds a mod by user', async () => {
        const response = await request(app)
            .post('/api/v1/account/mods')
            .set({ Authorization: token })
            .send({
                gameDomain: 'stardewvalley',
                modId: '2400'
            });

        const {
            name,
            summary,
            author
        } = nexusSMAPI;

        expect(response.body).toEqual({
            id: '1',
            name,
            summary,
            version: expect.any(String),
            author,
            message: expect.any(String)
        });
    });

    it('does not add a mod if no token is provided', async () => {
        const response = await request(app)
            .post('/api/v1/account/mods')
            .send({
                gameDomain: 'stardewvalley',
                modId: '2400'
            });

        expect(response.body).toEqual({
            message: 'Request requires a token'
        });
    });

    it('gets all mods by user', async () => {
        await request(app)
            .post('/api/v1/account/mods')
            .set({ Authorization: token })
            .send({
                gameDomain: 'stardewvalley',
                modId: '2400'
            });

        const response = await request(app)
            .get('/')
            .set({ Authorization: token });

        const {
            name,
            summary,
            author
        } = nexusSMAPI;

        expect(response.body).toEqual([{
            id: '1',
            name,
            summary,
            version: expect.any(String),
            author
        }]);
    });

    it.skip('gets a user mod by id', async () => {
        console.log('placeholder');
    });

    it.skip('updates a user mod by id', async () => {
        console.log('placeholder');
    });

    it.skip('deletes a user mod by id', async () => {
        console.log('placeholder');
    });
});
