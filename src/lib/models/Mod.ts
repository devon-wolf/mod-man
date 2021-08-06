/* eslint-disable no-mixed-spaces-and-tabs */
import { ModRow, UserModRow, NexusMod } from '../../types';
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
	dependencies: string[];
	updatedAt: number;
	gameId: string;
	userId: string;
	currentVersion: string;

	constructor(mod: ModRow, userMod: UserModRow) {
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
	    this.userId = userMod.user_id;
	    this.currentVersion = userMod.current_version;
	}

	static async insert(mod: NexusMod, userId: string): Promise<Mod> {
	    // TODO check if mod already exists in database
	    // if so, update to latest information
	    // if not, insert

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
		
	    // TODO check if mod already exists in user_mods table
	    // if so, send message regarding this
	    // if not, insert

	    const userModsQuery = await pool.query(`
		INSERT INTO user_mods
		(user_id, mod_id, current_version)
		VALUES ($1, $2, $3)
		RETURNING *
		`, [userId, rows[0].id, mod.version]);

	    return new Mod(rows[0], userModsQuery.rows[0]);
	}
}
