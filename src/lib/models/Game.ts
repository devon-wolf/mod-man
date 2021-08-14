import { GameRow } from '../../types';
import pool from '../utils/pool';

export default class Game {
    id: string;
    name: string;
    domainName: string;
    dbGameId: number;

    constructor(row: GameRow) {
        this.id = row.id;
        this.name = row.name;
        this.domainName = row.domain_name;
        this.dbGameId = row.db_game_id;
    }

    static async insert(name: string, domainName: string, dbGameId: number): Promise<Game> {
        const { rows } = await pool.query(`
        INSERT INTO games
        (name, domain_name, db_game_id)
        VALUES
        ($1, $2, $3)
        RETURNING *
        `,
        [
            name,
            domainName,
            dbGameId
        ]);

        return new Game(rows[0]);
    }
}
