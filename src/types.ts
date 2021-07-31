import { Request } from 'express';

export class ExpressError extends Error {
	status: number | undefined;
}

export interface RequestWithId extends Request {
	userId: string
}
export interface ErrorMessage {
	message: string
}
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
