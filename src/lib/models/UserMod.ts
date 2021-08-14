import { ModRow, UserModRow } from '../../types';
import pool from '../utils/pool';
import Mod from './Mod';

export default class UserMod {
    userId: string;
    modId: string;
    currentVersion: string;

    constructor(row: UserModRow) {
        this.userId = row.user_id;
        this.modId = row.mod_id;
        this.currentVersion = row.current_version;
    }

    static async insertUserMod(userId: string, row: ModRow): Promise<UserMod> {
        const { rows } = await pool.query(`
        INSERT INTO user_mods
        (user_id, mod_id, current_version)
        VALUES ($1, $2, $3)
        RETURNING *
        `, [userId, row.id, row.version]);

        return new UserMod(rows[0]);
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

    static async updateUserMod(userId: string, modId: string, updatedVersion: string): Promise<UserMod> {
        const { rows } = await pool.query(`
        UPDATE user_mods
        SET current_version = $1
        WHERE user_id = $2
        AND mod_id = $3
        RETURNING *
        `, [updatedVersion, userId, modId]);
        
        return new UserMod(rows[0]);
    }

    static async deleteUserMod(userId: string, modId: string): Promise<UserMod> {
        const { rows } = await pool.query(`
        DELETE FROM user_mods
        WHERE user_id = $1
        AND mod_id = $2
        RETURNING *
        `, [userId, modId]);

        return new UserMod(rows[0]);
    }
}
