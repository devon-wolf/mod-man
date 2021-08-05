import { ModRow } from '../../types';
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
}
