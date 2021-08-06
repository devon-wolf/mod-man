import { Request } from 'express';

/////////////////////////////
/* Request/Response Types */
////////////////////////////
export class DynamicError extends Error {
	status?: number;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	[key: string]: any;
}
export interface DynamicRequest extends Request {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	[key: string]: any
}
export interface ErrorMessage {
	message: string
}

/////////////////
/* User Types */
///////////////
export interface UserRow {
	id: string,
	email: string,
	hash: string
}
export interface UserRequest {
	email: string,
	password: string
}
export interface UserWithToken {
	id: string,
	email: string,
	token: string
}

///////////////
/* Mod Types */
//////////////
export interface ModRow {
	id: string;
	name: string;
	summary: string;
	db_uid: string;
	db_mod_id: number;
	db_game_id: number;
	domain_name: string;
	version: string;
	author: string;
	dependencies: string[];
	updated_timestamp: number;
	game_id: string;
}

export interface UserModRow {
	user_id: string,
	mod_id: string,
	current_version: string;
}

export interface ModRequest {
	gameDomain: string;
	modId: string;
}

export interface ModSummary {
	id: string;
	name: string;
	summary: string;
	version: string;
	author: string
}

//////////////////////
/* Nexus API Types */
////////////////////
export interface NexusCategory {
	category_id: number,
	name: string,
	parent_category: number
}
export interface NexusGame {
	id: number,
	name: string,
	forum_url: string,
	nexusmods_url: string,
	genre: string,
	downloads: number,
	domain_name: string,
	approved_date: number,
	file_views: number,
	authors: number,
	file_endorsements: number,
	mods: number,
	categories: NexusCategory[]
}

export interface NexusMod {
	name: string;
	summary: string;
	description: string;
	uid: number;
	mod_id: number;
	game_id: number;
	allow_rating: boolean;
	domain_name: string;
	category_id: number;
	version: string;
	endorsement_count: number;
	created_timestamp: number;
	created_time: string;
	updated_timestamp: number;
	updated_time: string;
	author: string;
	uploaded_by: string;
	uploaded_users_profile_url: string;
	contains_adult_content: boolean;
	status: string;
	available: boolean;
	user: {
		member_id: number;
		member_group_id: number;
		name: string
	};
	endorsement: {
		endorse_status: string;
		timestamp: number | null;
		version: string | null
	};
}
