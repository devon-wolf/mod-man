import {
    getAllGames,
    getGameByDomain
} from '../lib/utils/nexus';

import { nexusMorrowind } from '../data/sample-data/morrowind';

describe('Nexus API', () => {
    const apiKey = process.env.NEXUS_API_KEY || 'no key found';

    it('returns an error message if there is no API key', () => {
        return getAllGames('notarealkey')
            .then(response => {
                expect(response).toEqual({ message: expect.any(String) });
            });
    });

    it('gets a list of games from the Nexus API', () => {
        return getAllGames(apiKey)
            .then(response => {
                expect(response).toEqual(expect.any(Array));
            });
    });

    it('gets a single game from Nexus by its domain name', () => {
        return getGameByDomain('morrowind', apiKey)
            .then(response => {
                expect(response).toEqual({
                    ...nexusMorrowind,
                    file_count: expect.any(Number),
                    downloads: expect.any(Number),
                    file_views: expect.any(Number),
                    authors: expect.any(Number),
                    file_endorsements: expect.any(Number),
                    mods: expect.any(Number),
                    categories: expect.any(Array)
                });
            });
    });

});
