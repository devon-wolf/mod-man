import request from 'supertest';
import setup from '../data/setup';
import app from '../lib/app';
import pool from '../lib/utils/pool';
import { nexusSMAPI } from '../data/sample-data/smapi';

describe('Mods', () => {
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
            author
        });
    });

    it.skip('gets all mods by user', async () => {
        console.log('placeholder');
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
