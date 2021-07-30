import {
    getAllGames,
    getGameByDomain,
    getModById,
    getModFileList,
    getModFileDetails
} from '../lib/utils/nexus';

import { nexusMorrowind } from '../data/sample-data/morrowind';
import { nexusSMAPI } from '../data/sample-data/smapi';

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

    it('gets a mod from Nexus by its game domain and id', () => {
        return getModById('stardewvalley', '2400', apiKey)
            .then(response => {
                expect(response).toEqual({
                    ...nexusSMAPI,
                    description: expect.any(String),
                    version: expect.any(String),
                    endorsement_count: expect.any(Number),
                    updated_timestamp: expect.any(Number),
                    updated_time: expect.any(String),
                    endorsement: expect.any(Object)
                });
            });
    });

    it('gets a list of mod files from Nexus by its game domain and id', () => {
        return getModFileList('stardewvalley', '2400', apiKey)
            .then(response => {
                expect(response).toEqual({
                    files: expect.any(Array),
                    file_updates: expect.any(Array)
                });
            });
    });

});
