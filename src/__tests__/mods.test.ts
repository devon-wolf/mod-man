import request from 'supertest';
import setup from '../data/setup';
import app from '../lib/app';
import pool from '../lib/utils/pool';

const smapiMod = {
    author: 'Pathoschild',      
    dbGameId: 1303,
    dbModId: 2400,
    dbUid: '5596342389088',
    dependencies: null,
    domainName: 'stardewvalley',     
    gameId: null,
    id: '1',
    name: 'SMAPI - Stardew Modding API',
    summary: 'The mod loader for Stardew Valley.',  
    updatedAt: 1628179270,         
    version:'3.12.2'       
};

describe.skip('Mods', () => {
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

        expect(response.body).toEqual({
            ...smapiMod,
            version: expect.any(String),
            updatedAt: expect.any(Number)
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
            .get('/api/v1/account/mods')
            .set({ Authorization: token });

        expect(response.body).toEqual([{
            ...smapiMod,
            version: expect.any(String),
            updatedAt: expect.any(Number)
        }]);
    });

    it('does not provide other users mods to a different user', async () => {
        await request(app)
            .post('/api/v1/account/mods')
            .set({ Authorization: token })
            .send({
                gameDomain: 'stardewvalley',
                modId: '2400'
            });

        const response = await request(app)
            .get('/api/v1/account/mods')
            .set({ Authorization: token2 });

        expect(response.body).toEqual([]);
    });

    it('gets a user mod by id', async () => {
        await request(app)
            .post('/api/v1/account/mods')
            .set({ Authorization: token })
            .send({
                gameDomain: 'stardewvalley',
                modId: '2400'
            });

        const response = await request(app)
            .get('/api/v1/account/mods/1')
            .set({ Authorization: token });

        expect(response.body).toEqual({
            ...smapiMod,
            version: expect.any(String),
            updatedAt: expect.any(Number)
        });
    });

    it('updates a user mod by id', async () => {
        await request(app)
            .post('/api/v1/account/mods')
            .set({ Authorization: token })
            .send({
                gameDomain: 'stardewvalley',
                modId: '2400'
            });

        const response = await request(app)
            .put('/api/v1/account/mods/1')
            .set({ Authorization: token })
            .send({ currentVersion: '3.0.0' });

        expect(response.body).toEqual({
            userId:'1',
            modId: '1',
            currentVersion: '3.0.0'
        });
    });

    it('deletes a user mod by id', async () => {
        await request(app)
            .post('/api/v1/account/mods')
            .set({ Authorization: token })
            .send({
                gameDomain: 'stardewvalley',
                modId: '2400'
            });

        const response = await request(app)
            .delete('/api/v1/account/mods/1')
            .set({ Authorization: token });

        expect(response.body).toEqual({
            message: 'Mod 1 has been deleted from user 1\'s profile.'
        });
    });
});
