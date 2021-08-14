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

    static async checkExists(domain: string): Promise<boolean> {
        const { rows } = await pool.query(`
            SELECT id FROM games
            WHERE domain_name = $1
        `, [domain]);

        return rows.length ? true : false;
    }

    static async getUserGames(userId: string): Promise<Game[] | void> {
        try {
            const { rows } = await pool.query(`
            SELECT
            DISTINCT games.*
            FROM games
            JOIN mods
            ON games.db_game_id = mods.db_game_id
            JOIN user_mods
            ON mods.id = user_mods.mod_id
            WHERE user_id = $1
            `, [userId]);
    
            return rows.map(row => new Game(row));
        }
        catch (error) {
            console.log(error);
        }
    }
}
