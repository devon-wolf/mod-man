/* eslint-disable no-mixed-spaces-and-tabs */
import { UserRow } from '../../types';
import pool from '../utils/pool';

export default class User {
	id: string;
	email: string;

	constructor(row: UserRow) {
	    this.id = row.id;
	    this.email = row.email;
	}

	static async create(email: string, hash: string): Promise<User> {
	    const { rows } = await pool.query(`
			INSERT INTO users (email, hash)
			VALUES $1, $2
			RETURNING id, email
		`, [email, hash]);

	    return new User(rows[0]);
	}

	static async getByCredentials(email: string, hash: string): Promise<User> {
	    const { rows } = await pool.query(`
		SELECT * FROM users
		WHERE email=$1,
		hash=$2`,
	    [email, hash]);

	    return new User(rows[0]);
	}

}
