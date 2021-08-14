import { ModRow, NexusMod } from '../../types';
import pool from '../utils/pool';
import UserMod from './UserMod';

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

        await UserMod.insertUserMod(userId, rows[0]);

        return new Mod(rows[0]);
    }
}
