import { getAllGames } from '../lib/utils/nexus';


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

});
