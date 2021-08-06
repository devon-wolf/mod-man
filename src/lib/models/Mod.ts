/* eslint-disable no-mixed-spaces-and-tabs */
import { ModRow, NexusMod } from '../../types';
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

	constructor(row: ModRow) {
	    this.id = row.id;
	    this.name = row.name;
	    this.summary = row.summary;
	    this.dbUid = row.db_uid;
	    this.dbModId = row.db_mod_id;
	    this.dbGameId = row.db_game_id;
	    this.domainName = row.domain_name;
	    this.version = row.version;
	    this.author = row.author;
	    this.dependencies = row.dependencies;
	    this.updatedAt = row.updated_timestamp;
	    this.gameId = row.game_id;
	}

	static async insert(mod: NexusMod): Promise<Mod> {
	    console.log('Before the query log!');
		
	    const { rows } = await pool.query(`
		INSERT INTO mods
		(name, summary, db_uid, db_mod_id, db_game_id, domain_name, version, author, updated_timestamp)
		VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
		RETURNING *
		`, [
	        mod.name,
	        mod.summary,
	        mod.uid,
	        mod.game_id,
	        mod.domain_name,
	        mod.version,
	        mod.author,
	        mod.updated_timestamp,
	    ]);

	    console.log('After the query log!');
		
	    return new Mod(rows[0]);
	}
}
