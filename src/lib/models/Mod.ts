import { ModRow, UserModRow, NexusMod, UserModSummary } from '../../types';
import pool from '../utils/pool';

export default class Mod {
    id: string;
    name: string;
    summary: string;
    dbUid: string;
    dbModId: number;
    dbGameId: number;
    domainName: string;
    version: string;
    author: string;
    dependencies: string[] | null;
    updatedAt: number;
    gameId: string;

    constructor(mod: ModRow) {
        this.id = mod.id;
        this.name = mod.name;
        this.summary = mod.summary;
        this.dbUid = mod.db_uid;
        this.dbModId = mod.db_mod_id;
        this.dbGameId = mod.db_game_id;
        this.domainName = mod.domain_name;
        this.version = mod.version;
        this.author = mod.author;
        this.dependencies = mod.dependencies;
        this.updatedAt = mod.updated_timestamp;
        this.gameId = mod.game_id;
    }

    static async insert(mod: NexusMod, userId: string): Promise<Mod> {
        const { rows } = await pool.query(`
        INSERT INTO mods
        (name, summary, db_uid, db_mod_id, db_game_id, domain_name, version, author, updated_timestamp)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        RETURNING *
        `, [
            mod.name,
            mod.summary,
            mod.uid,
            mod.mod_id,
            mod.game_id,
            mod.domain_name,
            mod.version,
            mod.author,
            mod.updated_timestamp,
        ]);

        await this.insertUserMod(userId, rows[0]);

        return new Mod(rows[0]);
    }

    static async insertUserMod(userId: string, row: ModRow): Promise<UserModRow> {
        const { rows } = await pool.query(`
        INSERT INTO user_mods
        (user_id, mod_id, current_version)
        VALUES ($1, $2, $3)
        RETURNING *
        `, [userId, row.id, row.version]);

        return rows[0];
    }

    static async getUserMods(userId: string): Promise<Mod[]> {
        const { rows } = await pool.query(`
        SELECT
        *
        FROM user_mods
        JOIN mods
        ON mods.id = user_mods.mod_id
        WHERE user_id = $1
        `, [userId]);
        
        return rows.map(row => new Mod(row));
    }

    static async getUserModById(userId: string, modId: string): Promise<Mod> {
        const { rows } = await pool.query(`
        SELECT
        *
        FROM user_mods
        JOIN mods
        ON mods.id = user_mods.mod_id
        WHERE user_id = $1
        AND mod_id = $2
        `, [userId, modId]);

        return new Mod(rows[0]);
    }

    static async updateUserMod(userId: string, modId: string, updatedVersion: string): Promise<UserModSummary> {
        const { rows } = await pool.query(`
        UPDATE user_mods
        SET current_version = $1
        WHERE user_id = $2
        AND mod_id = $3
        RETURNING *
        `, [updatedVersion, userId, modId]);
        
        const { user_id, mod_id, current_version } = rows[0];
        
        return {
            userId: user_id,
            modId: mod_id,
            currentVersion: current_version
        };
    }

    static async deleteUserMod(userId: string, modId: string): Promise<UserModSummary> {
        const { rows } = await pool.query(`
        DELETE FROM user_mods
        WHERE user_id = $1
        AND mod_id = $2
        RETURNING *
        `, [userId, modId]);

        const { user_id, mod_id, current_version } = rows[0];
        
        return {
            userId: user_id,
            modId: mod_id,
            currentVersion: current_version
        };
    }
}
