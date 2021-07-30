import pool from '../lib/utils/pool';
import setup from '../data/setup';

describe.skip('app tests', () => {
    beforeEach(async () => {
        await setup(pool);
    });

    it('is a placeholder test that will pass', () => {
        expect(2 + 2).toEqual(4);
    });
});
